const utils = require("../utils");

function hasMeasurmentIncreasedTimes(data) {
  let result = 0;
  for (let idx = 0; idx < data.length - 1; idx++) {
    if (data[idx] < data[idx + 1]) {
      result += 1;
    }
  }
  console.log(result);
}

function createBlockSums(data) {
  let sums = [];

  for (let idx = 0; idx < data.length - 2; idx++) {
    sums.push(data[idx] + data[idx + 1] + data[idx + 2]);
  }
  return sums;
}

try {
  //let data = utils.readInput("./example.txt");
  let data = utils.readInput("./input.txt");
  data = utils.modDataNewline(data);
  const temp = createBlockSums(data);
  hasMeasurmentIncreasedTimes(temp);
} catch (e) {
  console.log("Error", e.stack);
}
