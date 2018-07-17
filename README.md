# Lift

In your terminal:

1.  Run 'npm install'
2.  Run 'node lift.js inputFileName.txt'

For tests:

1.  Run 'npm run test'

# Output Log

The output log returns the total time for the line to be serviced (ie the longest running elevator)in seconds.
It also returns an object (stringified) where the key is the elevator number (0 indexed), and the value is a nested array of all the trips for that elevator, showing each floor visited.

# Notes

My approach looked at the first 'C' number of people, 'C' being the number of lifts multiplied by their Capacity, and split them the most efficiently across the elevators (putting them in ascending order, so the lower-floor elevator would return before the higher-floor elevator). The first elevator back then serviced the elevator that would take the longest (the highest floor) of the next group. This rotation continued every group. This meant for a closest-to-even spread of trip times across the elevators.

As only the 2 seconds up and 1 second down per floor was specified, I decided to also add 5 seconds for each 'floor visited', as a lift that took many people to the same floor would take less time than an elevator that stopped at all different floors.

The data in the .txt files for 'N' floors seemed to not always have an accurate reading, as in input1.txt, the floors people were waiting for were higher than 'N'. This was partly the reason I took the approach I did, as the number of floors was not needed for the calculations.
I also chose not to look at all of the data at once (and split the elevators by floor), because it didn't seem to make common sense - people nearer the the front of the line, should be somewhat served before people much further down the line, especially with an input as large as in input4.txt and input5.txt.
