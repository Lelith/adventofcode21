const utils = require("../utils");


function createRulebook(data){
  const ruleBook = new Map();
  data.forEach(element => {
    const rule = element.split(' -> ');
    ruleBook.set(rule[0].trim(), rule[1].trim());
  });
  return ruleBook;
}

function addToCounter(letter, times) {
 letterCounter[letter] = letterCounter[letter]?  letterCounter[letter]+times : times;
 return letterCounter;
}

function getNewPairs(pair,ruleBook,occurance){
  const newLetter = ruleBook.get(pair);
  addToCounter(newLetter, occurance);
  const splitPair = pair.split('');
  const newTupel = [ [splitPair[0],newLetter].join(''), [newLetter+ splitPair[1]].join('')];
  return newTupel;
}

function insertIntoTemplate(polymer,ruleBook){
  const newPolymer = new Map();
  polymer.forEach((occurance, pair)=>{

    const newPairs = getNewPairs(pair, ruleBook, occurance);
    newPolymer.set(newPairs[0], newPolymer.get(newPairs[0])+occurance||occurance);
    newPolymer.set(newPairs[1], newPolymer.get(newPairs[1])+occurance||occurance);
  
  });
  return newPolymer;
}

function calculateResult(){
  console.log(letterCounter);
  const max = Object.keys(letterCounter).reduce((max, letter) => 
    Math.max(max, letterCounter[letter]),[0]
  );
  
  const min = Object.keys(letterCounter).reduce((min, letter) => 
    Math.min(min, letterCounter[letter]),[Infinity]
  );
  console.log(max-min);
}


function getInitialLetterCount(polymer){
  const polymerArr = polymer.split('');
  const counts = {};
  polymerArr.forEach(letter => {
   counts[letter] = counts[letter] ? counts[letter] + 1 : 1;
  })
  return counts;
}

function createStartMap(template){
  const startMap = new Map();
  for(let pointer = 0; pointer < template.length-1; pointer ++){
    const end = pointer+2;
    const pair = template.slice(pointer,end);
    startMap.set(pair, startMap.get(pair)+1||1);
  }
  return startMap;
}

const letterCounter = getInitialLetterCount('SFBBNKKOHHHPFOFFSPFV');
//const letterCounter = getInitialLetterCount('NNCB');

 try {
  //let data = utils.readInput('./example.txt');
  //const startTemplate = 'NNCB';
  let data = utils.readInput('./input.txt');
  const startTemplate = 'SFBBNKKOHHHPFOFFSPFV';

  let polymer = createStartMap(startTemplate);
  data = utils.modDataNewlineStr(data);
  const ruleBook = createRulebook(data);

  for(let rounds = 0; rounds <40; rounds++){
    polymer = insertIntoTemplate(polymer, ruleBook);
    console.log('---'+rounds+'----')
    console.log(polymer.size);
  }
  calculateResult();
} catch (e) {
  console.log("Error", e.stack);
}
