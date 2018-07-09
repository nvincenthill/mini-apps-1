console.log("loading game...");

// board state
let board = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];

let game = {
  isPlaying: false,
  firstPlayersTurn: true,
  turn: 0
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
      validate();
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

let validate = () => {
  console.log("validating board");
};
