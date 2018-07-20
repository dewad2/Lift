# Lift

1.  Run 'npm install'
2.  Run 'node lift.js inputFileName.txt'

For tests:

1.  Run 'npm run test' - unfortunately I have started getting a 'TypeError' when I run the tests. I am sure this is to do with the instantiation of my 'elevatorQueue' instance, but I have been unable to debug it sadly!

# Output Log

The output log returns the total time for the line to be serviced (ie the longest running elevator)in seconds.
It also returns an object (stringified) where the key is the elevator number (0 indexed), and the value is a nested array of all the trips for that elevator, showing each floor visited.

# Notes

My main aim was to get the ride times split as evenly as possible across all the elevators - as the total time would be the length of the longest running elevator.

The data in the .txt files for 'N' floors seemed to not always have an accurate reading, as in input1.txt, the floors people were waiting for were higher than 'N'. At first I chose to therefore just use the Max floor as my top floor. However, in the end I found that the most efficient way I found didn't actually use the 'N' floors value, therefore the possible inaccuracy in the data didn't alter my result.
