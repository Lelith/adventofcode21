const utils = require("../utils");

function calculatePosition(instruction, position) {
  instruction = instruction.split(" ");
  const verb = instruction[0];
  const action = parseInt(instruction[1]);
  if (verb === "forward") {
    position.horizontal += action;
  } else if (verb === "down") {
    position.vertical += action;
  } else if (verb === "up") {
    position.vertical -= action;
  }
}

try {
  //let data = utils.readInput("./example.txt");
  let data = utils.readInput("./input.txt");
  console.log(data);
  data = utils.modDataNewlineStr(data);
  const position = {
    horizontal: 0,
    vertical: 0
  };
  data.map(instruction => {
    calculatePosition(instruction, position);
  });
  console.log("final sum", position.horizontal * position.vertical);
} catch (e) {
  console.log("Error", e.stack);
}
