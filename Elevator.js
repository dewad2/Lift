class Elevator {
  constructor(number, maxCapacity) {
    this.number = number;
    this.maxCapacity = maxCapacity;
    this.floorsVisited = [];
  }
  getMaxCapacity() {
    return this.maxCapacity;
  }
  visitFloor(floor) {
    this.floorsVisited.push(floor);
  }
  rideLength() {
    this.floorsVisited.reduce((sum, floor) => {
      return (sum += floor);
    });
  }
  rideComplete() {
    this.floorsVisited = [];
  }
}

class ElevatorQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(lift) {
    this.queue.push(lift);
  }
  dequeue() {
    let removed = this.queue.shift();
    return removed;
  }
  getQueue() {
    return this.queue;
  }
}

class ElevatorLog {
  constructor() {
    this.elevatorLog = {};
    this.lengthLog = {};
  }
  addToLog(number, array) {
    if (!this.elevatorLog[number]) {
      this.elevatorLog[number] = [array];
    } else {
      this.elevatorLog[number].push(array);
    }
  }
  addToLengthLog(number, array) {
    if (!this.elevatorLog[number]) {
      this.lengthLog[number] = [array];
    } else {
      this.lengthLog[number].push(array);
    }
  }
  getElevatorLog() {
    return this.elevatorLog;
  }
  getLengthLog() {
    return this.lengthLog;
  }
}

module.exports = { Elevator, ElevatorQueue, ElevatorLog };
