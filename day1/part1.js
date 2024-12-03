const utils = require("../utils");

try {
  //let data = utils.readInput("./example.txt");
  let data = utils.readInput("./input.txt");
  data = utils.modDataNewline(data);
  let result = 0;
  for (let idx = 0; idx < data.length - 1; idx++) {
    if (data[idx] < data[idx + 1]) {
      result += 1;
    }
  }
  console.log(result);
} catch (e) {
  console.log("Error", e.stack);
}
