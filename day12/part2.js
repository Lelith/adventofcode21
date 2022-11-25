const { Modal } = require("@contentful/f36-components");
const utils = require("../utils");

function createMap(data){
  const graphMap = new Map();
  data.forEach((line)=>{
    const pair = line.split('-');
    // adding left side
    graphMap.has(pair[0]) ? graphMap.get(pair[0]).push(pair[1]) : graphMap.set(pair[0], [pair[1]]);

    // adding right side
    graphMap.has(pair[1]) ? graphMap.get(pair[1]).push(pair[0]) : graphMap.set(pair[1], [pair[0]]);
  });
  return graphMap;
}

const isSmallCave = (cave) => cave.toLowerCase() === cave

function hasAlreadyVisited(cave, visitedSmallCave){
  if(cave ==='start') {
    return true;
  }
  return visitedSmallCave.includes(cave) && visitedSmallCave.includes('twice');
}

const getVisitedCaves = (visited, cave) => {
  const isSmall = isSmallCave(cave);
  if (!isSmall) {
    return visited;
  }
  // a single small cave in a path can be visited twice
  if (visited.includes(cave)) {
    return [...visited, "twice"];
  }
  return [...visited, cave];
}

function findPath(graphMap, currentCave, visitedSmallCaves){

  if(currentCave === "end") {
    return 1;
  }

  let validPaths=0;

  const connectedCaves = graphMap.get(currentCave)||[];
  
  connectedCaves.forEach((linkedCave) => {
    if(!hasAlreadyVisited(linkedCave, visitedSmallCaves)){
      const newVisitedArray = getVisitedCaves(visitedSmallCaves, linkedCave);
      validPaths+=findPath(graphMap, linkedCave, newVisitedArray);
    }
  });  
  return validPaths;
}


try {
  //let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const graphMap = createMap(data);
  console.log(graphMap);
  const validPaths =findPath(graphMap, 'start', ['start']);
  console.log(validPaths);
} catch (e) {
  console.log("Error", e.stack);  
}
