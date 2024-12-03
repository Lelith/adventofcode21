const utils = require("../utils");

function calculateFishSpawning(data) {
  for (let idx = 1; idx <= 80; idx++) {
    data.forEach((fishAge, fishnumber) => {
      if (fishAge === 0) {
        data[fishnumber] = 6;
        data.push(8);
      } else {
        data[fishnumber] = fishAge - 1;
      }
    });
  }
  console.log(data.length);
}

try {
  //let data = utils.readInput("./example.txt");
  // let data = utils.readInput("./input.txt");
  data = utils.modDataCommas(data);
  calculateFishSpawning(data);
} catch (e) {
  console.log("Error", e.stack);
}
