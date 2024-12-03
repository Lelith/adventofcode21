const utils = require("../utils");

function getFuelRequired(distance) {
  let fuelRequired = 0;
  for (let idx = 1; idx <= distance; idx++) {
    fuelRequired += idx;
  }
  return fuelRequired;
}

function calculateFuelUsage(crabs) {
  const maxPosition = Math.max(...crabs);
  const minPosition = Math.min(...crabs);
  let minimumFuelUsage = Number.MAX_SAFE_INTEGER;
  let bestPosition = -1;

  for (
    let currentPosition = minPosition;
    currentPosition <= maxPosition;
    currentPosition++
  ) {
    let currentFuelUsage = crabs.reduce((fuel, crabPosition) => {
      let distance = Math.abs(crabPosition - currentPosition);
      let currentFuel = getFuelRequired(distance);
      return fuel + currentFuel;
    }, 0);
    // console.log(
    //   "current fuel usage",
    //   currentFuelUsage + " at position: " + currentPosition
    // );

    if (currentFuelUsage < minimumFuelUsage) {
      minimumFuelUsage = currentFuelUsage;
      bestPosition = currentPosition;
    }
  }
  console.log(
    "minimumFuelUsage: " + minimumFuelUsage + " at position: " + bestPosition
  );
}

try {
  // let data = utils.readInput("./example.txt");
  let data = utils.readInput("./input.txt");
  data = utils.modDataCommas(data);
  calculateFuelUsage(data);
} catch (e) {
  console.log("Error", e.stack);
}
