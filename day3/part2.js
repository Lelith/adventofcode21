const utils = require("../utils");

function countBinaryOnes(remainingEntries, bitPointer) {
  const flippedEntries = utils.transformMatrix(remainingEntries);
  const columnBinaryString = flippedEntries[bitPointer].join("");
  return columnBinaryString.split(1);
}

function calculateLifeSupportRating(data) {
  let remainingOxygen = [...data];
  let coScrubberRate = [...data];
  let bitPointer = 0;
  const bitLength = data[0].length;

  while (bitPointer < bitLength) {
    if (remainingOxygen.length > 1) {
      const treshold = parseInt(Math.ceil(remainingOxygen.length / 2));
      const binaryOnes = countBinaryOnes(remainingOxygen, bitPointer);
      if (binaryOnes.length - 1 >= treshold) {
        remainingOxygen = remainingOxygen.filter(row => {
          return row[bitPointer] === "1";
        });
      } else {
        remainingOxygen = remainingOxygen.filter(row => {
          return row[bitPointer] === "0";
        });
      }
    }

    if (coScrubberRate.length > 1) {
      const treshold = parseInt(Math.ceil(coScrubberRate.length / 2));
      const binaryOnes = countBinaryOnes(coScrubberRate, bitPointer);
      if (binaryOnes.length - 1 < treshold) {
        coScrubberRate = coScrubberRate.filter(row => {
          return row[bitPointer] === "1";
        });
      } else {
        coScrubberRate = coScrubberRate.filter(row => {
          return row[bitPointer] === "0";
        });
      }
    }
    bitPointer += 1;
  }
  const remainingOxygenInt = parseInt(remainingOxygen[0].join(""), 2);
  const coScrubberRateInt = parseInt(coScrubberRate[0].join(""), 2);
  const res = coScrubberRateInt * remainingOxygenInt;
  console.log("final remaining oxygen", remainingOxygenInt);
  console.log("final coScrubber rate", coScrubberRateInt);
  console.log("result", res);
}

try {
  //let data = utils.readInput("./example.txt");
  let data = utils.readInput("./input.txt");
  data = utils.modDataNewlineStr(data);
  data = data.map(stringNumber => stringNumber.split(""));
  calculateLifeSupportRating(data);
} catch (e) {
  console.log("Error", e.stack);
}
