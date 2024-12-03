const utils = require("../utils");

function countEasyDigits(data) {
  let easyDigitCounter = 0;
  data.forEach(signalPattern => {
    const outputValues = signalPattern[1].split(" ");
    outputValues.forEach(value => {
      const length = value.length;
      if (length == 2 || length == 3 || length === 4 || length == 7) {
        easyDigitCounter++;
      }
    });
  });
  console.log(easyDigitCounter);
}

try {
  // let data = utils.readInput("./example.txt");
  let data = utils.readInput("./input.txt");
  data = utils.modDataNewlineStr(data);
  data = data.map(signalPatterns =>
    signalPatterns.split("|").map(item => item.trim())
  );
  countEasyDigits(data);
} catch (e) {
  console.log("Error", e.stack);
}
