const utils = require("../utils");

function calculatePowerConsumption(data, treshold) {
  const gammaRateBinary = [];
  const epsilonRateBinary = [];
  for (idx = 0; idx < data.length; idx++) {
    const columnBinaryString = data[idx].join("");
    const binaryOnes = columnBinaryString.split("1");
    if (binaryOnes.length > treshold) {
      gammaRateBinary.push(1);
      epsilonRateBinary.push(0);
    } else {
      gammaRateBinary.push(0);
      epsilonRateBinary.push(1);
    }
  }
  const gammaRateDec = parseInt(gammaRateBinary.join(""), 2);
  const epsilonRateDec = parseInt(epsilonRateBinary.join(""), 2);
  console.log("sum", gammaRateDec * epsilonRateDec);
}

try {
  //let data = utils.readInput("./example.txt");
  let data = utils.readInput("./input.txt");
  data = utils.modDataNewlineStr(data);
  data = data.map(stringNumber => stringNumber.split(""));
  const transformed = transformMatrix(data);
  //console.log(transformed);

  const treshold = data.length / 2;
  calculatePowerConsumption(transformed, treshold);
} catch (e) {
  console.log("Error", e.stack);
}
