const utils = require("../utils");


function createRulebook(data){
  const ruleBook = new Map();
  data.forEach(element => {
    const rule = element.split(' -> ');
    ruleBook.set(rule[0].trim(), rule[1].trim());
  });
  return ruleBook;
}

function executeInsertion(pair,ruleBook){
  const splitPair = pair.split('');
  const newTupel =  splitPair[0]+ruleBook.get(pair);
  return newTupel;
}

function insertIntoTemplate(template,ruleBook){
  let newPolymer = '';
  for(let pointer = 0; pointer < template.length-1; pointer++){
    const end = pointer+2;
    const pair = template.slice(pointer,end);
    const newTupel = executeInsertion(pair, ruleBook)
    newPolymer = [newPolymer, newTupel].join('');
  }
  newPolymer = [newPolymer, template.charAt(template.length-1)].join('');
  return newPolymer;
}

function calculateResult(polymer){
  const polymerArr = polymer.split('');
  const counts = {};
  polymerArr.forEach(letter => {
   counts[letter] = counts[letter] ? counts[letter] + 1 : 1;
  })
  console.log(counts);
  const max = Object.keys(counts).reduce((max, letter) => 
    Math.max(max, counts[letter]),[0]
  );
  
  const min = Object.keys(counts).reduce((min, letter) => 
    Math.min(min, counts[letter]),[Infinity]
  );
  console.log(max-min);
}



try {
  // let data = utils.readInput('./example.txt');
  // const startTemplate = 'NNCB';
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const startTemplate = 'SFBBNKKOHHHPFOFFSPFV';
  const ruleBook = createRulebook(data);

  let polymer = startTemplate;
  for(let rounds = 0; rounds <10; rounds++){
    polymer = insertIntoTemplate(polymer, ruleBook);
  }
  
  calculateResult(polymer);
} catch (e) {
  console.log("Error", e.stack);
}
