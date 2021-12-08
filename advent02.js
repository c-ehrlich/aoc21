/*
 * Advent of Code Day 2
 * run in terminal:
 * `node advent02.js <input data FILENAME>
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

// solution to part 1
const solutionPart1 = (data) => {
  const processedData = data
    .split("\n")
    .map((item) => item.split(" "))
    .map((item) => ({
      direction: item[0],
      distance: Number(item[1]),
    }))
    .reduce(
      (movement, item) => ({
        ...movement,
        [item.direction]: (movement[item.direction] ?? 0) + item.distance,
      }),
      {}
    );
  const xDistance =
    (processedData.forward ?? 0) - (processedData.backward ?? 0);
  const yDistance = (processedData.down ?? 0) - (processedData.up ?? 0);
  return xDistance * yDistance;
};

// solution to part 2
const solutionPart2 = (data) => {
  const processedData = data
    .split("\n")
    .map((item) => item.split(" "))
    .map((item) => ({
      [item[0]]: Number(item[1]),
    }))
    .reduce(
      ({ horizontal, depth, aim }, curr) => ({
        aim: aim + (curr.down ?? 0) - (curr.up ?? 0),
        horizontal: horizontal + (curr.forward ?? 0),
        depth:
          depth +
          (aim + (curr.down ?? 0) - (curr.up ?? 0)) * (curr.forward ?? 0),
      }),
      {
        horizontal: 0,
        depth: 0,
        aim: 0,
      }
    );
  const result = processedData.horizontal * processedData.depth;
  return result;
};

// print solutions to console
getData(process.argv[2]).then((data) => {
  console.log(solutionPart1(data));
  console.log(solutionPart2(data));
});
