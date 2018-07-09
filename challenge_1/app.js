console.log("loading game...");

// board state
let board = [["T", "I", "C"], ["T", "A", "C"], ["T", "O", "E"]];

let startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
  handleClick();
});

for (let i = 1; i <= 9; i++) {
  document.getElementById(`square${i}`);
}

let handleClick = () => {
  console.log("starting a new game...");
  let square;
  for (let i = 1; i <= 9; i++) {
    square = document.getElementById(`square${i}`);
    square.innerHTML = "";
    console.log(square);
  }
};
