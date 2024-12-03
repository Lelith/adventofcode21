const utils = require("../utils");

function countMarks(paper){
  let numberMarks = 0;
  paper.forEach(row=>{
    row.forEach(column =>{
      if(column == '#') {
        numberMarks++;
      }
    })
  })
  console.log(numberMarks);
}

function getMaxSize(data){
  const xCoords = [];
  const yCoords = [];
  data.forEach(point => {
    const coord = utils.modDataCommas(point);
    xCoords.push(coord[0]);
    yCoords.push(coord[1]);
  })
   const maxCol = utils.maxArrayNum(xCoords);
   const maxRow = utils.maxArrayNum(yCoords);
   return {cols: maxCol, rows: maxRow};
}

function drawOnPaper(data) {
  const paper = [];
  const paperSize = getMaxSize(data);
  for(let rows = 0; rows <=paperSize.rows; rows++){
    paper[rows] = [];
    for(let cols = 0; cols <=paperSize.cols; cols++) {
      paper[rows][cols]='.';
    }
  }
  data.forEach(point => {
    const coord = utils.modDataCommas(point);
    paper[coord[1]][coord[0]] = '#';
  })
  return paper;
}

function foldY(row, paper){
  let lowerRowPointer = row+1;
  const newPaper=[];

  // move from fold upwards
  for(let upperRowPointer = row-1; upperRowPointer >=0; upperRowPointer-- ){
    // take last row of lower half and overlapp with last row upper half
    newPaper[upperRowPointer] = [...paper[upperRowPointer]]; 

    paper[lowerRowPointer].forEach((lowerCol, idx) =>{
      if(lowerCol=='#'){
        newPaper[upperRowPointer][idx]='#'
      }
    });
    lowerRowPointer++;
  }
  return newPaper;
}

function foldX(column, paper) {
  let rightPointer = column+1;
  const newPaper = [];
  //prepare new paper
  paper.forEach((row,idx)=>newPaper[idx]=[]);

  for(let leftPointer = column-1; leftPointer>=0; leftPointer--){
    // overlap original left row with right row
    paper.forEach((row, idx) => {
      const originalCol = row[leftPointer];
      newPaper[idx][leftPointer] = row[rightPointer] == '#' ? '#': originalCol;
    });

    rightPointer++;
  } 
  return newPaper;
}

function createOrigami(initialPaper, instructions){
  let foldedPaper = [...initialPaper];
  instructions.forEach(step =>{
    const toDo=step.split('=');
    if(toDo[0]=='y'){
      const row = parseInt(toDo[1], 10);
      console.log('folding y on row', row);
      foldedPaper=foldY(row,foldedPaper);
    }
    else {
      const col = parseInt(toDo[1], 10);
      console.log('folding x on col', col);
      foldedPaper=foldX(col, foldedPaper);
    }
  })
  return foldedPaper;
}

function prettyPrint(paper){
  paper.forEach(row=>{
    console.log(row.join(""));
  })
}

try {
  // let data = utils.readInput('./example.txt');
  //let instructions = utils.readInput('./example_fold.txt');
  let data = utils.readInput('./input.txt');
  let instructions = utils.readInput('./input_fold.txt');
  data = utils.modDataNewlineStr(data);
  instructions = utils.modDataNewlineStr(instructions);
  const paper = drawOnPaper(data);
  const foldedPaper = createOrigami(paper, instructions);
  prettyPrint(foldedPaper);

} catch (e) {
  console.log("Error", e.stack);
}
