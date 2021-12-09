/*
 * Advent of Code Day 3
 * run in terminal:
 * `node advent03.js <input data FILENAME>
 */

/*
 * SOLUTIONS
 */

const solutionPart1 = (data) => {
  // create array of input lines
  data = data.split("\n");

  // create array iterator that we will use multiple times
  const stringLength = [...Array(data[0].length)];

  // create count array
  let countArray = [];
  for (let pos in stringLength) {
    countArray.push({0: 0, 1: 0});
  }

  // fill count array
  for (let posX in stringLength) {
    for (let posY in [...Array(data.length).keys()]) {
      countArray[posX][data[posY][posX]] += 1;
    }
  }

  // create gamma and epsilon as strings
  let gamma = "";
  let epsilon = "";

  // fill beta and gamma
  for (let pos in stringLength) {
    if (countArray[pos]['0'] > countArray[pos]['1']) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  }

  console.log("gamme: " + gamma);
  console.log("epsilon: " + epsilon);

  // calculate rates
  const gammaRate = parseInt(gamma, 2);
  const epsilonRate = parseInt(epsilon, 2);

  return gammaRate * epsilonRate; 
}

const solutionPart2 = (data) => {
  const findOxygenRating = (data) => {
    // create array iterator that we will use multiple times
    const stringLength = [...Array(data[0].length)];

    for (char in stringLength) {
      // determine whether 1 or 0 is more popular
      let oneCount = 0;
      let zeroCount = 0;
      for (item of data) {
        item[char] === '1' ? oneCount++ : zeroCount++;
      }
      const winnerChar = oneCount >= zeroCount ? '1' : '0';

      // figure out which items of the array have the less popular character
      // create the array of items to drop in reverse order, so we don't offset
      // the data array after deleting an item from it
      let itemsToDrop = [];
      for (let [index, item] of data.entries()) {
        if (item[char] !== winnerChar) {
          itemsToDrop.unshift(index);
        }
      }
      
      // delete the items that have the less popular character
      for (index of itemsToDrop) {
        data.splice(index, 1);
      }
      
      // if there's only one value, it's the one we're looking for
      if (data.length === 1) {
        return parseInt(data[0], 2);
      }
    }
  }

  const findCO2ScrubRating = (data) => {
    // create array iterator that we will use multiple times
    const stringLength = [...Array(data[0].length)];

    for (char in stringLength) {
      let oneCount = 0;
      let zeroCount = 0;
      // determine whether 1 or 0 is less popular
      for (item of data) {
        item[char] === '1' ? oneCount++ : zeroCount++;
      }
      const winnerChar = zeroCount <= oneCount ? '0' : '1'; //CHANGED
      // figure out which items of the array have the less popular character
      let itemsToDrop = [];
      for (let [index, item] of data.entries()) {
        if (item[char] !== winnerChar) {
          // create the array of items to drop in reverse order, so we don't offset
          // the data array after deleting an item from it
          itemsToDrop.unshift(index);
        }
      }
      // delete the items that have the less popular character
      for (index of itemsToDrop) {
        data.splice(index, 1);
      }
      // if there's only one value, it's the one we're looking for
      if (data.length === 1) {
        return parseInt(data[0], 2);
      }
    }
  }

  // create array of input lines
  data = data.split("\n");

  const oxygenRating = findOxygenRating([...data]);
  const co2rating = findCO2ScrubRating([...data]);

  console.log("oxygen rating: " + oxygenRating);
  console.log("co2 rating: " + co2rating);

  return oxygenRating * co2rating;
}

/*
 * BOILERPLATE
 */

// make sure we got a filename in the command line
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

// Read the file and store its contents
let fs = require("fs").promises;
const getData = async (filename) => {
  const data = await fs.readFile(filename, "utf8", function (err, data) {
    if (err) throw err;
    console.timeLog("OK: " + filename);
  });
  return data;
};

// print solutions to console
getData(process.argv[2]).then((data) => {
  console.log("part 1: " + solutionPart1(data));
  console.log("part 2: " + solutionPart2(data));
});
