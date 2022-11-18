const utils = require("../utils");

const getRight = (posCol, rowArr) => {
  if(posCol<(rowArr.length-1)) {
    return rowArr[posCol+1];
  }
  return 9;
}


const getDown = (posRow, posCol, data) => {
  if(posRow<(data.length-1)) {
   const lowerRow = utils.modStringIntoNumbers(data[posRow+1]);
   return lowerRow[posCol];
  }
  return 9;
}



const getBasins = (data) => {
  const basins = [];
  let row = 0;
  let col = 0;
  let pointer = {row: 0, col: 0};
}

try {
  let data = utils.readInput("./example.txt");
  //let data = utils.readInput("./input.txt");
  data = utils.modDataNewlineStr(data);
  data = data.map(row => utils.modStringIntoNumbers(row));
  getBasins(data);
} catch (e) {
  console.log("Error", e.stack);
}
