const { expect } = require('chai');
const {
  lift,
  stringTo2DArray,
  splitLifts,
  differentFloors,
  totalPerLift
} = require('./lift.js');

// describe('lift', () => {
//   it('takes values M(number of elevators), N(number of floors), Q(people per car) and list of people in a queue and returns the shortest time to service them all', () => {
//     // expect(decodeString('2[b3[a]]')).to.deep.equal('baaabaaa');
//   });
// });

describe('splitLifts', () => {
  it('takes a nested array of sorted groups, and a lift capacity, and splits each group into lifts', () => {
    expect(
      splitLifts(
        [
          [1, 2, 3, 4, 5, 5, 5, 6, 8, 9],
          [2, 2, 3, 4, 5, 8, 9, 9, 10, 10],
          [1, 1, 2, 4, 5, 6, 7, 9, 9, 10]
        ],
        4
      )
    ).to.deep.equal([
      [[1, 2, 3, 4], [5, 5, 5, 6], [8, 9]],
      [[2, 2, 3, 4], [5, 8, 9, 9], [10, 10]],
      [[1, 1, 2, 4], [5, 6, 7, 9], [9, 10]]
    ]);
  });
});

describe('differentFloors', () => {
  it('takes an an array and returns a count of the number of different values', () => {
    expect(
      differentFloors([1, 3, 3, 4, 6, 12, 18, 28, 38, 40, 40, 41])
    ).to.deep.equal(10);
  });
});

describe('stringTo2DArray', () => {
  it('converts a string of integers into a nested array, with the nested arrays being of length number of lifts times capacity', () => {
    expect(
      stringTo2DArray(
        '10,21,24,30,7,24,24,17,37,26,12,34,35,5,10,22,20,8,20,15,16,29,14,16,33,15,4,15,15,21,24,1,18,17,28,20,30,20,11,7,36,29,19,3,16,9,17,25,10,35,27,4,30,32,24,14,23,1,3,31,25,31,33,8,11,25,5,11,6,33',
        3,
        8
      )
    ).to.deep.equal([
      [
        '10',
        '21',
        '24',
        '30',
        '7',
        '24',
        '24',
        '17',
        '37',
        '26',
        '12',
        '34',
        '35',
        '5',
        '10',
        '22',
        '20',
        '8',
        '20',
        '15',
        '16',
        '29',
        '14',
        '16'
      ],
      [
        '33',
        '15',
        '4',
        '15',
        '15',
        '21',
        '24',
        '1',
        '18',
        '17',
        '28',
        '20',
        '30',
        '20',
        '11',
        '7',
        '36',
        '29',
        '19',
        '3',
        '16',
        '9',
        '17',
        '25'
      ],
      [
        '10',
        '35',
        '27',
        '4',
        '30',
        '32',
        '24',
        '14',
        '23',
        '1',
        '3',
        '31',
        '25',
        '31',
        '33',
        '8',
        '11',
        '25',
        '5',
        '11',
        '6',
        '33'
      ]
    ]);
  });
});

describe('totalPerLift', () => {
  it('takes an object as input and reduces its values into an array of the totals at each key', () => {
    expect(
      totalPerLift({
        0: [28, 12, 32, 13, 26],
        2: [8, 35, 10, 28, 12, 28],
        3: [19, 6, 24, 12, 23]
      })
    ).to.deep.equal([111, 121, 84]);
  });
});
