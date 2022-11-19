const utils = require("../utils");

function increaseAll(data) {
  const increased = data.map(row => {
    return row.map((number) => number+1);
  })
  return increased;
}

function hasHighEnergy(data) {
  let found = false; 
  let row=0;
  while(!found && row < rowLength){
    let pointer = 0;
    while(!found && pointer < colLength){
      found = data[row][pointer] > 9;
      pointer ++;
    }
    row++;
  }
  return found;
}

function maximumEnergy(data) {
  let row = 0;
  let found = false;
  while(!found && row < rowLength){
    let pointer = 0;
    while(!found && pointer < colLength){
      found = data[row][pointer] > 0; // is there one not yet at max
      pointer ++;
    }
    row++;
  }
  // when no lower than 10 found we reached maximum
  return !found;
}



function executeFlash(currRow, currCol, currState){
  flashCounter++;
  // set current energy to zero 
  currState[currRow][currCol]=0;

  // left 
  if(currCol>0) {
    const left = currState[currRow][currCol-1];
    currState[currRow][currCol-1] = left >0 ? left+1:left;
  }

  // right
  if(currCol<rowLength-1){
    const right = currState[currRow][currCol+1];
    currState[currRow][currCol+1] = right >0 ? right+1:right;
  }

  // upper neighbours
  if(currRow >0){
    const upperRow = currRow-1;
    const upper = currState[upperRow][currCol];
    currState[upperRow][currCol] = upper >0 ? (upper+1):upper;

    if(currCol>0) {
      // left diagonal
      const leftD = currState[upperRow][currCol-1];
      currState[upperRow][currCol-1] = leftD >0 ? leftD+1:leftD;
    } 

    if(currCol<colLength-1){
      // right diagonal
      const rightD = currState[upperRow][currCol+1];
      currState[upperRow][currCol+1] = rightD >0 ? rightD+1:rightD;
    }
  }

  // lower neighbours
  if(currRow < rowLength-1){
    const lowerRow = currRow+1;
    const lower = currState[lowerRow][currCol];
    currState[lowerRow][currCol] = lower >0 ? lower+1:lower;

    if(currCol>0) {
      // left diagonal
      const leftD = currState[lowerRow][currCol-1];
      currState[lowerRow][currCol-1] = leftD >0 ? leftD+1:leftD;
    } 

    if(currCol<colLength-1){
      // right diagonal
      const rightD = currState[lowerRow][currCol+1];
      currState[lowerRow][currCol+1] = rightD >0 ? rightD+1:rightD;
    }
  }
}

function runRound(data) {
  const newState = increaseAll(data);
  let counter = 0;

  while(hasHighEnergy(newState)){
    newState.forEach((row, rowPos) => {
      row.forEach((number, colPos)=>{
        if(number>9){
          executeFlash(rowPos, colPos, newState);
        }
      })
    });
    counter++;

  }
  return newState;
}

let flashCounter = 0;
let rounds=0;
// 10 x 10 matrix
  const rowLength = 10;
  const colLength = 10;

  // 5x5 matrix
  // const rowLength = 5;
  // const colLength = 5;
try {
  //let data = utils.readInput('./example.txt');
  //let max = utils.readInput('./max.txt');
  //let data = utils.readInput('./example2.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  data = data.map(row => utils.modStringIntoNumbers(row));


  let timeElapse = data;
  while(!maximumEnergy(timeElapse)){
    timeElapse = runRound(timeElapse);
    rounds++;
  }

  console.log(timeElapse);
  console.log('number of flashes:',flashCounter);
  console.log('rounds played', rounds);

} catch (e) {
  console.log("Error", e.stack);
}
