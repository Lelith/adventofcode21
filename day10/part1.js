const utils = require("../utils");

const validOpenSigns = ['(','{', '[', '<'];
const validCloseSigns = [')', '}', ']', '>'];


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
            return 3;
          }
        break;
        case ']': 
          if(openSigns[0] === '['){
            openSigns.shift();
          } else {
            isCorrupted = true;
            return 57;
          }
        break;
        case '}': 
          if(openSigns[0] === '{'){
            openSigns.shift();
          } else {
            isCorrupted = true;
            return 1197;
          }
        break;
        case '>': 
          if(openSigns[0] === '<'){
            openSigns.shift();
          } else {
            isCorrupted = true;
            return 25137;
          }
        break;
      }
    }
    pointer+=1;
  }
  return 0;
}

function calculateSyntaxErrorScore(data) {
  let score = 0;
  data.forEach(line => {
    const result = checkCorrupted(line);
    score +=result; 
  });
  console.log('final score:',score);
}

try {
  //let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  calculateSyntaxErrorScore(data);
} catch (e) {
  console.log("Error", e.stack);
}
