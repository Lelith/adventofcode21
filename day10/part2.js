const utils = require("../utils");

const validOpenSigns = ['(','{', '[', '<'];
const validCloseSigns = [')', '}', ']', '>'];

function fillIncompleteLine(openSigns){
  let incompleteLineScore = 0;
  const signsAdded = [];
  openSigns.forEach((sign) => {
    incompleteLineScore = incompleteLineScore*5;
    switch(sign){
      case '(': 
        signsAdded.push(')');
        incompleteLineScore = incompleteLineScore + 1; 
      break;
      case '[':
        signsAdded.push(']');
        incompleteLineScore = incompleteLineScore + 2;
      break;
      case '{': 
        signsAdded.push('}');
        incompleteLineScore= incompleteLineScore + 3;
      break;
      case '<':
        signsAdded.push('>')
        incompleteLineScore= incompleteLineScore+ 4;
      break;
    }
  })
  return incompleteLineScore;
}

function checkCorrupted(line) {
  const characters = line.split('');
  const openSigns = [];
  let isCorrupted = false;
  let pointer = 0;
  while(!isCorrupted && pointer <line.length){
    const character = characters[pointer];
    if(validOpenSigns.includes(character)){
      openSigns.unshift(character);
    } else if(validCloseSigns.includes(character)){
      switch(character){
        case ')': 
          if(openSigns[0] === '('){
            openSigns.shift();
          } else {
            isCorrupted = true;
          }
        break;
        case ']': 
          if(openSigns[0] === '['){
            openSigns.shift();
          } else {
            isCorrupted = true;
          }
        break;
        case '}': 
          if(openSigns[0] === '{'){
            openSigns.shift();
          } else {
            isCorrupted = true;
          }
        break;
        case '>': 
          if(openSigns[0] === '<'){
            openSigns.shift();
          } else {
            isCorrupted = true;
          }
        break;
      }
    }
    pointer+=1;
  }
  if(!isCorrupted){
   return fillIncompleteLine(openSigns);
  }
}

function calculateScore(data) {
  let scores = [];
  data.forEach(line => {
    const result = checkCorrupted(line);
    if(result) {
      scores.push(result); 
    }
  });
  scores.sort((a,b)=> a - b);
  const middle = scores.splice(Math.floor((scores.length-1) / 2), 1)[0]
  console.log(middle);
}

try {
  //let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  calculateScore(data);
} catch (e) {
  console.log("Error", e.stack);
}
