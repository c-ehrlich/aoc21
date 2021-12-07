/*
 * Advent of Code Day 1
 * run in terminal: 
 * `node advent01.js <input data FILENAME> <NUMBER of values for moving average>`
 * `node advent01.js <input data FILENAME>` (defaults to moving average of 1)
 */

// Make sure we got a filename in the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

// Read the file and store its contents.
let inputData = [];
let fs = require('fs').promises
  , filename = process.argv[2];
const getData = async (filename) => {
	const data = await fs.readFile(filename, 'utf8', function(err, data) {
	  if (err) throw err;
	  console.log('OK: ' + filename);
	});
	return data.split('\n').map(item => Number(item));
}

// set the number of values to use for moving average
let movingAvgCount = process.argv.length > 3 ? process.argv[3] : 1;

// calculate the number of times that the current moving average is higher than
// the previous moving average
const numberOfIncreases = (numbers, movingAvgCount=1) => {
	const movingAvg = numbers.map((number, i) => {
		let sum = 0;
		for (let j = 0; j < movingAvgCount; j++) {
			sum += numbers[i-j];
		}
		return sum;
	})
	return movingAvg.map((number, i) => number - movingAvg[i-1])
	  .slice(movingAvgCount)
	  .filter(v => v > 0)
	  .length
}

// run the function and log result
getData(process.argv[2])
  .then(data => {
  	console.log(numberOfIncreases(data, movingAvgCount));
  });


/*
 * Answer that only solves Part 1
 * (Part 2 is not revealed until after Part 1 is solved)
 */
const numberOfIncreases1 = (data) => {
  return data.reduce((prev, curr, i, arr) => {
    return arr[i] > arr[i-1] ? prev + 1 : prev;
  }, 0)
}
