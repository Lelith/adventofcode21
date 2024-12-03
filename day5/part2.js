const utils = require("../utils");

function drawLines(data) {
  const lineVektors = data.map(line => {
    return line.split("->").map(item => item.trim().split(","));
  });

  const lines = new Map();
  lineVektors.forEach(lineVektor => {
    const lineVektorStart = lineVektor[0].map(item => parseInt(item, 10));
    const lineVektorEnd = lineVektor[1].map(item => parseInt(item, 10));

    // check if line is horizontal or vertical
    if (lineVektorStart[0] === lineVektorEnd[0]) {
      let loopStart = lineVektorStart[1];
      let loopEnd = lineVektorEnd[1];
      if (lineVektorStart[1] > lineVektorEnd[1]) {
        loopStart = lineVektorEnd[1];
        loopEnd = lineVektorStart[1];
      }

      for (loopStart; loopStart <= loopEnd; loopStart++) {
        const key = lineVektorStart[0] + "," + loopStart;
        const value = lines.get(key);
        const newValue = value ? value + 1 : 1;
        lines.set(key, newValue);
      }
    } else if (lineVektorStart[1] === lineVektorEnd[1]) {
      let loopStart = lineVektorStart[0];
      let loopEnd = lineVektorEnd[0];
      if (lineVektorStart[0] > lineVektorEnd[0]) {
        loopStart = lineVektorEnd[0];
        loopEnd = lineVektorStart[0];
      }

      for (loopStart; loopStart <= loopEnd; loopStart++) {
        const key = loopStart + "," + lineVektorStart[1];
        const value = lines.get(key);
        const newValue = value ? value + 1 : 1;
        lines.set(key, newValue);
      }
    } else {
      let loopLength = Math.abs(lineVektorStart[0] - lineVektorEnd[0]);
      let xCoord = lineVektorStart[0];
      let yCoord = lineVektorStart[1];
      for (let idx = 0; idx <= loopLength; idx++) {
        const key = xCoord + "," + yCoord;
        const value = lines.get(key);
        const newValue = value ? value + 1 : 1;
        lines.set(key, newValue);
        xCoord =
          lineVektorStart[0] > lineVektorEnd[0] ? xCoord - 1 : xCoord + 1;
        yCoord =
          lineVektorStart[1] > lineVektorEnd[1] ? yCoord - 1 : yCoord + 1;
      }
    }
  });
  return lines;
}

function countOverlaps(lines) {
  let overlaps = 0;
  lines.forEach(value => {
    if (value > 1) {
      overlaps++;
    }
  });
  console.log("overlaps amount:", overlaps);
}
try {
  //let data = utils.readInput("./example.txt");
  let data = utils.readInput("./input.txt");
  data = utils.modDataNewlineStr(data);
  const lines = drawLines(data);
  countOverlaps(lines);
} catch (e) {
  console.log("Error", e.stack);
}
