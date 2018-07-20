const { expect } = require('chai');
const { sendOffElevators, totalPerLift, lift } = require('./lift.js');
const { ElevatorQueue, ElevatorLog } = require('./Elevator');

describe('sendOffElevators', () => {
  it('takes a sorted array, a lift capacity and a lift queue and assigns trips to lifts in a spread of high and low floors', () => {
    let elevatorQueue = new ElevatorQueue();
    elevatorQueue
      .enqueue(0)
      .enqueue(1)
      .enqueue(2);
    let elevatorLog = new ElevatorLog();
    expect(
      sendOffElevators(
        [
          1,
          2,
          5,
          8,
          11,
          11,
          12,
          19,
          21,
          23,
          28,
          29,
          34,
          34,
          35,
          35,
          36,
          42,
          43,
          44,
          45,
          47,
          47,
          49,
          58,
          61,
          70,
          71,
          87,
          90,
          93
        ],
        4,
        elevatorQueue,
        elevatorLog
      )
    ).to.deep.equal({
      '0': [
        ['1', '2', '5', '8'],
        ['34', '34', '35', '35'],
        ['58', '61', '70', '71']
      ],
      '1': [
        ['11', '11', '12', '19'],
        ['36', '42', '43', '44'],
        ['87', '90', '93']
      ],
      '2': [['21', '23', '28', '29'], ['45', '47', '47', '49']]
    });
  });
});

describe('totalPerLift', () => {
  it('takes an object as input and reduces its values into an array of the totals at each key', () => {
    expect(
      totalPerLift({
        0: [[28, 12, 32, 13, 26], [1, 2, 3, 4, 5], [1, 2]],
        2: [[8, 35, 10, 28, 12, 28], [23, 23, 24, 24, 25], [5, 6]],
        3: [[19, 6, 24, 12, 23], [2, 3, 4, 4, 5], [34, 34]]
      })
    ).to.deep.equal([111, 121, 84]);
  });
});

describe('lift', () => {
  it('sorts a line of people into elevators, to service them in the least amount of time', () => {
    expect(lift('10,21,24,30,7,24,24,17,37,26,12,34,35,5', 3, 3)).to.deep.equal(
      'TotalTime: 771 seconds Lift Logs: { 0: [[5, 7, 10],[26, 30, 34]], 1: [[12, 17, 21], [35, 37]], 2: [[24, 24, 24]] }'
    );
    expect(lift('10,21,24,30,7,24,24,17,37,26,12,34,35,5', 3, 3)).to.be.a(
      'string'
    );
  });
});
