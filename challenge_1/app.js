console.log("loading game...");

// board and game state
let board = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
let game = {
  isPlaying: false,
  firstPlayersTurn: true,
  turn: 0,
  playerOneName: "Player 1",
  playerTwoName: "Player 2",
  winner: ""
};

let startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  handleStartButtonClick();
});

let restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", () => {
  handleRestartButtonClick();
});

// TODO: refactor
let square1 = document.getElementById(`square1`);
let square2 = document.getElementById(`square2`);
let square3 = document.getElementById(`square3`);
let square4 = document.getElementById(`square4`);
let square5 = document.getElementById(`square5`);
let square6 = document.getElementById(`square6`);
let square7 = document.getElementById(`square7`);
let square8 = document.getElementById(`square8`);
let square9 = document.getElementById(`square9`);

let letter1 = document.getElementById(`letter1`);
let letter2 = document.getElementById(`letter2`);
let letter3 = document.getElementById(`letter3`);
let letter4 = document.getElementById(`letter4`);
let letter5 = document.getElementById(`letter5`);
let letter6 = document.getElementById(`letter6`);
let letter7 = document.getElementById(`letter7`);
let letter8 = document.getElementById(`letter8`);
let letter9 = document.getElementById(`letter9`);

let allSquares = [];
let allLetters = [];

for (let i = 1; i <= 9; i++) {
  allSquares.push(document.getElementById(`square${i}`));
  allLetters.push(document.getElementById(`letter${i}`));
}

for (let i = 0; i < 9; i++) {
  allSquares[i].addEventListener("click", () => {
    handleClick(i);
  });
}

let handleClick = i => {
  if (game.isPlaying) {
    if (allLetters[i].innerHTML === "") {
      if (game.firstPlayersTurn) {
        allLetters[i].innerHTML = "X";
        game.firstPlayersTurn = !game.firstPlayersTurn;
        board[i] = "X";
      } else {
        allLetters[i].innerHTML = "O";
        game.firstPlayersTurn = !game.firstPlayersTurn;
        board[i] = "O";
      }
      validateBoard();
    }
  }
};

let handleStartButtonClick = () => {
  if (game.isPlaying === false) {
    console.log("starting a new game...");
    let letter;
    for (let i = 1; i <= 9; i++) {
      letter = document.getElementById(`letter${i}`);
      letter.innerHTML = "";
      board[i - 1] = "";
    }
    game.isPlaying = true;
    startButton.style.display = "none";
    restartButton.style.display = "inline";
  }
};

let handleRestartButtonClick = () => {
  if (game.isPlaying === true) {
    console.log("restarting game...");
    let letter;
    for (let i = 1; i <= 9; i++) {
      letter = document.getElementById(`letter${i}`);
      letter.innerHTML = "";
      board[i - 1] = "";
    }
    game.isPlaying = false;
    startButton.style.display = "inline";
    restartButton.style.display = "none";
  }
};

let validateBoard = () => {
  console.log("validating board");
  let columns = validateColumns();
  let rows = validateRows();
  let diagonals = validateDiagonals();
  let isBoardFull = checkBoardForDraw();

  if (isBoardFull) {
    handleGameEnd("draw");
  }
  if (columns || rows || diagonals) {
    handleGameEnd("win");
  }
};

let validateColumns = () => {
  let col1 = board[0] + board[3] + board[6];
  let col2 = board[1] + board[4] + board[7];
  let col3 = board[2] + board[5] + board[8];
  let cols = [col1, col2, col3];
  for (let i = 0; i < cols.length; i++) {
    if (cols[i] === "XXX") {
      game.winner = game.playerOneName;
      return true;
    }
    if (cols[i] === "OOO") {
      game.winner = game.playerTwoName;
      return true;
    }
  }

  return false;
};

let validateRows = () => {
  let row1 = board[0] + board[1] + board[2];
  let row2 = board[3] + board[4] + board[5];
  let row3 = board[6] + board[7] + board[8];
  let rows = [row1, row2, row3];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] === "XXX") {
      game.winner = game.playerOneName;
      return true;
    }
    if (rows[i] === "OOO") {
      game.winner = game.playerTwoName;
      return true;
    }
  }

  return false;
};

let validateDiagonals = () => {
  let diag1 = board[0] + board[4] + board[8];
  let diag2 = board[2] + board[4] + board[6];

  if (diag1 === "XXX") {
    game.winner = game.playerOneName;
    return true;
  }
  if (diag1 === "OOO") {
    game.winner = game.playerTwoName;
    return true;
  }
  if (diag2 === "XXX") {
    game.winner = game.playerOneName;
    return true;
  }
  if (diag2 === "OOO") {
    game.winner = game.playerTwoName;
    return true;
  }
  return false;
};

let checkBoardForDraw = () => {
  let count = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== "") {
      count++;
    }
  }
  if (count === 9) {
    return true;
  } else {
    return false;
  }
};

let handleGameEnd = result => {
  if (result === "draw") {
    alert("The game is drawn");
  }
  if (result === "win") {
    alert(`${game.winner} won the game!`);
  }
};
