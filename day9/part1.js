const utils = require("../utils");

const getLeft = (posCol, rowArr) => {
  if(posCol>0) {
    return rowArr[posCol-1];
  }
  return 10;
}
const getRight = (posCol, rowArr) => {
  if(posCol<(rowArr.length-1)) {
    return rowArr[posCol+1];
  }
  return 10;
}

const getUp = (posRow, posCol, data) => {
  if(posRow>0) {
   const upperRow = utils.modStringIntoNumbers(data[posRow-1]);
   return upperRow[posCol];
  }
  return 10;
}

const getDown = (posRow, posCol, data) => {
  if(posRow<(data.length-1)) {
   const lowerRow = utils.modStringIntoNumbers(data[posRow+1]);
   return lowerRow[posCol];
  }
  return 10;
}

const allAreTrue=(arr) => {
  return arr.every(element => element === true);
}

const getLowPoints = (data) => {
  const lowPoints = [];
  data.forEach((row, posRow) => {
    const rowArr = utils.modStringIntoNumbers(row)
    rowArr.forEach((column, posCol) => {
       const highLow = [ 
        column < getUp(posRow, posCol, data), 
        column < getDown(posRow, posCol, data), 
        column < getLeft(posCol, rowArr), 
        column < getRight(posCol, rowArr)     
      ];
      if(allAreTrue(highLow)) {
        lowPoints.push(column);
      }
    });
  });
  return lowPoints;
}

const calcRiskSum = (lowPoints)  => {
  let sum =0;
  lowPoints.forEach(point => sum += (point+1));
  console.log(sum);
}

try {
  //let data = utils.readInput("./example.txt");
  let data = utils.readInput("./input.txt");
  data = utils.modDataNewlineStr(data);
  const lowPoints = getLowPoints(data);
  calcRiskSum(lowPoints);
} catch (e) {
  console.log("Error", e.stack);
}
