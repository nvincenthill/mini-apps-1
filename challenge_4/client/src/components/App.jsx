import React from "react";
import GameBoard from "./GameBoard.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      isPlaying: true,
      isInsane: true,
      currentRotation: 0,
      nextPiece: 1,
      title: "CONNECT FOUR"
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  handleClick(row, idx) {
    // alert(`Row ${row} number ${idx} clicked`);
    if (this.state.isPlaying) {
      let board = this.state.gameState;
      if (board[row - 1][idx] === 0) {
        // get next piece
        this.handleNextPiece();

        // place piece
        board[row - 1][idx] = this.state.nextPiece;

        // rotate game state
        // let rotatedBoard = this.rotateGameState(board);

        // handle board rotation
        if (this.state.isInsane) {
          let currentRotation = this.state.currentRotation;
          this.setState({ currentRotation: currentRotation + 90 });
        }

        // apply gravity
        let gravedBoard = this.applyGravity(board);

        //check for wins/draws
        this.validateBoard(gravedBoard);

        console.table(gravedBoard);
        this.setState({ gameState: gravedBoard });
      }
    }
  }

  handleNextPiece() {
    let lastPiece = this.state.nextPiece;
    if (lastPiece === -1) {
      this.setState({ nextPiece: 1 });
    } else {
      this.setState({ nextPiece: -1 });
    }
  }

  rotateGameState(board) {
    console.log("rotating board state");
    let newBoard = [];
    console.table(board);

    for (let i = 0; i < board[0].length; i++) {
      newBoard.push([]);
    }

    for (let i = 0; i < board[0].length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        newBoard[j].unshift(board[i][j]);
      }
    }

    console.table(newBoard);
    return newBoard;
  }

  applyGravity(board) {
    console.log("applying gravity");
    // console.table(newBoard);
    let newBoard = board;

    // if (this.state.currentRotation === 0) {
    for (let i = 0; i < board.length - 1; i++) {
      let currentRow = board[i];
      let nextRow = board[i + 1];
      for (let j = 0; j < board[i].length; j++) {
        if (nextRow[j] === 0) {
          nextRow[j] = currentRow[j];
          currentRow[j] = 0;
        }
      }
    }
    // } else if ()

    // console.table(newBoard);
    return newBoard;
  }

  validateBoard(board) {
    let cols = this.checkColums(board, 7, 7);
    let rows = this.checkRows(board, 7, 7);
    let diags = this.checkDiags(board, 7, 7);
    if (cols || rows || diags) {
      this.handleWin();
    }
    let draw = this.checkForDraw(board);
    if (draw) {
      this.handleDraw();
    }
  }

  checkForDraw(board) {
    for (let i = 0; i < board[0]; i++) {
      for (let j = 0; j < board[i]; j++) {
        if (board[i][j] === 0) {
          return true;
        }
      }
    }
    return false;
  }

  handleDraw() {
    this.setState({ title: "THE GAME WAS A DRAW" });
    this.setState({ isPlaying: false });
  }

  handleWin() {
    let winner;
    if (this.state.nextPiece === -1) {
      winner = "RED WINS!";
    } else {
      winner = "BLACK WINS!";
    }
    this.setState({ title: winner });
    this.setState({ isPlaying: false });
  }

  handleRestart() {
    console.log("restarting");
    this.setState({
      isPlaying: true,
      gameState: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    });
  }

  checkRows(board, columns, rows) {
    for (let y = 0; y < columns; y++) {
      let consecutiveBlack = 0;
      let consecutiveRed = 0;
      for (let x = 0; x < rows; x++) {
        if (board[y][x] === 1) {
          consecutiveBlack++;
          consecutiveRed = 0;
          if (consecutiveBlack === 4) {
            return true;
          }
        }
        if (board[y][x] === -1) {
          consecutiveRed++;
          consecutiveBlack = 0;
          if (consecutiveRed === 4) {
            return true;
          }
        }
      }
    }
    return false;
  }

  checkColums(board, columns, rows) {
    for (let x = 0; x < rows; x++) {
      let consecutiveBlack = 0;
      let consecutiveRed = 0;
      for (let y = 0; y < columns; y++) {
        if (board[y][x] === 1) {
          consecutiveBlack++;
          consecutiveRed = 0;
          if (consecutiveBlack === 4) {
            return true;
          }
        }
        if (board[y][x] === -1) {
          consecutiveRed++;
          consecutiveBlack = 0;
          if (consecutiveRed === 4) {
            return true;
          }
        }
      }
    }
    return false;
  }

  checkDiags(board, columns, rows) {
    let rightDiags = this.checkDiagsRight(board, columns, rows);
    let leftDiags = this.checkDiagsLeft(board, columns, rows);
    if (leftDiags || rightDiags) {
      return true;
    }
    return false;
  }

  checkDiagsLeft(board, columns, rows) {
    return false;
  }

  checkDiagsRight(board, columns, rows) {
    // for (let i = 0; i < columns - 4; i++) {
    //   let consecutiveBlack = 0;
    //   let consecutiveRed = 0;
    //   if (board[i][i] === 1) {
    //     consecutiveBlack++;
    //     consecutiveRed = 0;
    //     if (consecutiveBlack === 4) {
    //       return true;
    //     }
    //   }
    //   if (board[i][i] === -1) {
    //     consecutiveRed++;
    //     consecutiveBlack = 0;
    //     if (consecutiveRed === 4) {
    //       return true;
    //     }
    //   }
    // }
    return false;
  }

  render() {
    let restartButton = (
      <button id="restart-button" onClick={this.handleRestart}>
        RESTART
      </button>
    );
    return (
      <React.Fragment>
        <div className="title-container">
          <h1 id="title">{this.state.title}</h1>
        </div>
        <GameBoard
          gameState={this.state.gameState}
          handleClick={this.handleClick}
          currentRotation={this.state.currentRotation}
        />
        <div className="button-container">{restartButton}</div>
      </React.Fragment>
    );
  }
}

export default App;
