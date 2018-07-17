const fs = require('fs');

let content = fs.readFileSync(process.argv[2], 'utf8', (err, data) => {
  if (err) throw err;
  content = data;
});

//split the data so can grab M,N,Q and the line of people
let splitContent = content.split('\n');

//m = elevators
//n = floors
//q = capacity

function lift(elevatorQueue, numOfElevators, liftCap) {
  // split input string into 'groups' of lengths numOfElevators * capacity
  const maxCapacityGroup = stringTo2DArray(
    elevatorQueue,
    numOfElevators,
    liftCap
  );

  //create a 'lift queue', 'lift log' and 'ride length' object to hold the lengths of each elevator trip
  const liftQueue = [];
  const liftLog = {};
  const rideLength = {};
  for (let j = 0; j < numOfElevators; j++) {
    liftQueue.push(j);
    liftLog[j] = [];
    rideLength[j] = [];
  }

  //sort each group
  maxCapacityGroup.forEach(group => {
    return group.sort((a, b) => {
      return a - b;
    });
  });

  //split the sorted groups into lifts
  const dividedIntoLifts = splitLifts(maxCapacityGroup, liftCap);

  let reverse = false;
  let currentLift;
  let currentTime;
  let numDiffFloors;
  dividedIntoLifts.forEach(group => {
    if (!reverse) {
      for (let k = 0; k < group.length; k++) {
        //start at front of lift queue, sending lowest floors off first
        currentLift = liftQueue.shift();
        //add 5 seconds per different floor visited
        numDiffFloors = differentFloors(group[k]);
        currentTime = group[k][group[k].length - 1] * 3 + numDiffFloors * 5;
        //add time for each ride to rideLength obj
        rideLength[currentLift].push(currentTime);
        liftLog[currentLift].push(group[k]);
        //add lift to back of lift queue
        liftQueue.push(currentLift);
      }
      //in next group, send highest floor off first to keep an even spread of ride times across lifts
      //keep alternating this direction
      reverse = !reverse;
    } else if (reverse) {
      for (let k = group.length - 1; k >= 0; k--) {
        currentLift = liftQueue.shift();
        numDiffFloors = differentFloors(group[k]);
        currentTime = group[k][group[k].length - 1] * 3 + numDiffFloors * 5;
        rideLength[currentLift].push(currentTime);
        liftLog[currentLift].push(group[k]);
        liftQueue.push(currentLift);
      }
      reverse = !reverse;
    }
  });

  //how long each lift took (the total of all the trip times for each lift)
  const totals = totalPerLift(rideLength);

  // //find the lift that took the longest, this is the time to return
  const totalTime = totals.reduce((highest, time) => {
    return Math.max(highest, time);
  }, 0);

  const output =
    'TotalTime: ' +
    totalTime +
    ' seconds \n' +
    'Lift Logs: ' +
    JSON.stringify(liftLog);

  fs.writeFile('output.txt', output, err => {
    if (err) throw err;
    console.log('file saved as output.txt');
  });
}

function stringTo2DArray(string, numLifts, liftCap) {
  let array = string.split(',');
  const total = liftCap * numLifts;
  const fullQueue = [];
  for (let i = 0; i < array.length; i += total) {
    let round = [];
    for (let j = i; j < i + total; j++) {
      if (!array[j]) continue;
      round.push(array[j]);
    }
    fullQueue.push(round);
  }
  return fullQueue;
}

function splitLifts(maxCapacityGroup, liftCap) {
  const dividedGroup = maxCapacityGroup.map(group => {
    const splitLifts = [];
    for (let g = 0; g < group.length; g += liftCap) {
      let lift = group.slice(g, g + liftCap);
      splitLifts.push(lift);
    }
    return splitLifts;
  });
  return dividedGroup;
}

function differentFloors(array) {
  const uniques = new Set(array);
  return uniques.size;
}

function totalPerLift(rideLength) {
  let totals = [];
  for (lift in rideLength) {
    let total = rideLength[lift].reduce((total, time) => {
      return (total += time);
    });
    totals.push(total);
  }
  return totals;
}

lift(splitContent[3], splitContent[0], splitContent[2]);

module.exports = {
  lift,
  stringTo2DArray,
  splitLifts,
  differentFloors,
  totalPerLift
};
