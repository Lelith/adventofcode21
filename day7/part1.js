const utils = require("../utils");

function findLowestFuel(fuelUsagePerPositon) {
  const min = Math.min.apply(null, Object.values(fuelUsagePerPositon));
  const key = Object.keys(fuelUsagePerPositon).find(
    key => fuelUsagePerPositon[key] === min
  );

  console.log("minimal fuel of " + min + " at position " + key);
}

function calculateFuelUsage(crabs) {
  const maxPosition = Math.max(...crabs);
  const minPosition = Math.min(...crabs);
  const fuelUsagePerPositon = {};

  for (
    let currentPosition = minPosition;
    currentPosition <= maxPosition;
    currentPosition++
  ) {
    let fuelUsage = 0;
    crabs.forEach(crabPosition => {
      fuelUsage += Math.abs(crabPosition - currentPosition);
    });
    fuelUsagePerPositon[currentPosition] = fuelUsage;
  }
  //console.log(fuelUsagePerPositon);
  findLowestFuel(fuelUsagePerPositon);
}

try {
  // let data = utils.readInput("./example.txt");
  let data = utils.readInput("./input.txt");
  data = utils.modDataCommas(data);
  calculateFuelUsage(data);
} catch (e) {
  console.log("Error", e.stack);
}
