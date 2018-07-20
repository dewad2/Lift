const fs = require('fs');
const { Elevator, ElevatorQueue, ElevatorLog } = require('./Elevator');

let content = fs.readFileSync(process.argv[2], 'utf8', (err, data) => {
  if (err) throw err;
  content = data;
});

let splitContent = content.split('\n');
lift(splitContent[3], splitContent[0], splitContent[2]);

function lift(lineForElevator, numElevators, elevatorCapacity) {
  const elevatorQueue = new ElevatorQueue();
  const elevatorLog = new ElevatorLog();

  for (let j = 0; j < numElevators; j++) {
    let elevator = new Elevator(j, +elevatorCapacity);
    elevatorQueue.enqueue(elevator);
  }

  //sort the group, low to high floor destination
  const sortedGroup = lineForElevator.split(',').sort((a, b) => {
    return a - b;
  });

  //send of the elevators one after the other, so they receive a close-to-even spread of low floor trips and high floor trips, adding the trips to the logs as they go
  sendOffElevators(
    sortedGroup,
    Number(elevatorCapacity),
    elevatorQueue,
    elevatorLog
  );

  // how long each lift took (the total of all the trip times for each lift)
  const totals = totalPerElevator(elevatorLog.getLengthLog());

  //find the lift that took the longest, this is the time to return
  const totalTime = totals.reduce((highest, time) => {
    return Math.max(highest, time);
  }, 0);

  const logs = elevatorLog.getElevatorLog();

  const output =
    'TotalTime: ' +
    totalTime +
    ' seconds \n' +
    'Lift Logs: ' +
    JSON.stringify(logs);

  fs.writeFile('output.txt', output, err => {
    if (err) throw err;
    console.log('file saved as output.txt');
  });

  return output;
}

function totalPerElevator(rideLength) {
  let totals = [];
  for (lift in rideLength) {
    let currentMax = -Infinity;
    let total = rideLength[lift].reduce((total, time) => {
      return (total += +time);
    }, 0);
    if (total > currentMax) {
      currentMax = total;
    }
    totals.push(currentMax);
  }
  return totals;
}

function sendOffElevators(group, elevatorCap, elevatorQueue, elevatorLog) {
  for (var j = 0; j < group.length; j += elevatorCap) {
    let currentElevator = elevatorQueue.dequeue();
    for (let i = j; i < j + elevatorCap; i++) {
      if (!group[i]) {
        continue;
      }
      currentElevator.visitFloor(group[i]);
    }
    let maximum = currentElevator.floorsVisited.reduce((max, val) => {
      return max > val ? max : +val;
    }, 0);
    let currentTime = maximum * 3;
    elevatorLog.addToLengthLog(currentElevator.number, currentTime);
    elevatorLog.addToLog(currentElevator.number, currentElevator.floorsVisited);
    currentElevator.rideComplete();
    elevatorQueue.enqueue(currentElevator);
  }
  return elevatorLog.getElevatorLog();
}

module.exports = {
  lift,
  totalPerElevator,
  sendOffElevators
};
