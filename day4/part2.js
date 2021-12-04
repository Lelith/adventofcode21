const utils = require("../utils");

function prepareBingoGame(boards) {
  const bingoGame = [];
  boards.forEach((board, index) => {
    let boardMap = new Map();
    board.forEach((boardRow, rowIndex) => {
      const rowArr = boardRow.split(/\s+/);
      rowArr.forEach((bingoNumber, columnIndex) => {
        boardMap.set(bingoNumber, [rowIndex, columnIndex]);
      });
    });
    bingoGame.push({
      map: boardMap,
      markedNumbers: [],
      columnCounter: [0, 0, 0, 0, 0],
      rowCounter: [0, 0, 0, 0, 0],
      boardNumber: index,
      boardBingo: false
    });
  });
  return bingoGame;
}

function calculateResult(winnerBoard, boards) {
  const markedNumbers = winnerBoard.markedNumbers;
  const lastNumber = parseInt(markedNumbers[markedNumbers.length - 1], 10);
  const boardArray = boards[winnerBoard.boardNumber].join(" ").split(/\s+/);
  let unmarkedItems = boardArray.filter(item => !markedNumbers.includes(item));
  unmarkedItems = unmarkedItems.map(Number);
  const sum = utils.calcArraySum(unmarkedItems);
  console.log(sum * lastNumber);
}

function playGame(bingoGame, numbers) {
  let index = 0;
  let winnerBoard;
  while (index < numbers.length) {
    const bingoNumber = numbers[index];
    bingoGame.forEach((board, boardNumber) => {
      if (board.bingo) {
        return;
      }
      const coordinates = board.map.get(bingoNumber);
      if (coordinates) {
        board.markedNumbers.push(bingoNumber);
        board.rowCounter[coordinates[0]] += 1;
        board.columnCounter[coordinates[1]] += 1;
      }
      if (
        board.rowCounter.find(counter => counter === 5) ||
        board.columnCounter.find(counter => counter === 5)
      ) {
        console.log("BINGOOOO! Board Number " + boardNumber + " is the winner");
        console.log("last drawn number", bingoNumber);
        board.bingo = true;
        winnerBoard = board;
      }
    });
    index++;
  }
  return winnerBoard;
}

try {
  let numbers = utils.readInput("./input_numbers.txt");
  let boards = utils.readInput("./input_boards.txt");
  // let numbers = utils.readInput("./example_numbers.txt");
  // let boards = utils.readInput("./example_boards.txt");

  numbers = numbers.split(",");
  boards = utils.modDataBlanklines(boards);
  boards = boards.map(board => {
    return utils.modDataNewlineStr(board);
  });
  //console.log(numbers);
  //console.log(boards);
  const bingoGame = prepareBingoGame(boards);
  const winnerBoard = playGame(bingoGame, numbers);
  calculateResult(winnerBoard, boards);
} catch (e) {
  console.log("Error", e.stack);
}
