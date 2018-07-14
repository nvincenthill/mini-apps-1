// TODO: Fix gravity for all cardinal directions
// TODO: Display user name on win
// TODO: Validate diagonal wins
// TODO: Graphically represent winning pieces to the user

// TODO: Fix up, left, right gravity functions

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
      isInsane: false,
      currentRotation: 0,
      cardinalRotation: 0,
      nextPiece: 1,
      piecesPlaced: 0,
      title: "CONNECT FOUR",
      isInsaneClass: ""
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.toggleInsane = this.toggleInsane.bind(this);
  }

  handleClick(row, idx) {
    let board = this.state.gameState.slice();

    if (this.state.isPlaying) {
      if (board[row - 1][idx] === 0) {
        // get next piece
        this.handleNextPiece();

        // place piece
        board[row - 1][idx] = this.state.nextPiece;
        let count = this.state.piecesPlaced;
        this.setState({ piecesPlaced: count + 1 });
        if (count + 1 === 49) {
          this.handleDraw();
        }
        // rotate game state
        // let rotatedBoard = this.rotateGameState(board);

        // handle board rotation
        if (this.state.isInsane) {
          var currentRotation = this.state.currentRotation;
          this.setState({ currentRotation: currentRotation + 90 });

          var cardinalRotation = this.state.cardinalRotation;
          cardinalRotation++;
          cardinalRotation = cardinalRotation % 4;
          this.setState({ cardinalRotation: cardinalRotation });
        }

        // apply gravity
        let gravedBoard;
        if (this.state.isInsane) {
          if (this.state.cardinalRotation === 3) {
            gravedBoard = this.applyGravityDown(board);
          } else if (this.state.cardinalRotation === 0) {
            gravedBoard = this.applyGravityLeft(board);
          } else if (this.state.cardinalRotation === 1) {
            gravedBoard = this.applyGravityUp(board);
          } else {
            gravedBoard = this.applyGravityRight(board);
          }
        } else {
          gravedBoard = this.applyGravityDown(board);
        }

        //check for wins/draws
        this.validateBoard(gravedBoard);

        // set the new model in state
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

  applyGravityDown(board) {
    console.log("applying gravity down");

    let newBoard = board;
    console.table(newBoard);
    let n = 0;
    while (n < 6) {
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
      n++;
    }
    console.table(newBoard);
    return newBoard;
  }

  applyGravityUp(board) {
    console.log("applying gravity up");
    let newBoard = board;
    console.table(newBoard);
    let n = 0;
    while (n < 6) {
      for (let i = 0; i < board.length - 1; i++) {
        let currentRow = board[i];
        let nextRow = board[i + 1];
        for (let j = 0; j < board[i].length; j++) {
          if (currentRow[j] === 0) {
            currentRow[j] = nextRow[j];
            nextRow[j] = 0;
          }
        }
      }
      n++;
    }

    console.table(newBoard);
    return newBoard;
  }

  applyGravityLeft(board) {
    console.log("applying gravity left");
    let newBoard = board;
    console.table(newBoard);
    for (let i = 0; i < newBoard.length; i++) {
      for (let j = 0; j < newBoard[i].length; j++) {
        let count = 0;
        if (newBoard[i][j] === 0) {
          newBoard[i].splice(j, 1);
          count++;
        }
        for (let k = 0; k < count; k++) {
          newBoard[i].unshift(0);
        }
      }
    }
    console.table(newBoard);
    return newBoard;
  }

  applyGravityRight(board) {
    console.log("applying gravity right");
    let newBoard = board;
    console.table(newBoard);
    let n = 0;
    while (n < 6) {
      for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard[i].length; j++) {
          let count = 0;
          if (newBoard[i][j] === 0) {
            newBoard[i].splice(j, 1);
            count++;
          }
          for (let k = 0; k < count; k++) {
            newBoard[i].push(0);
          }
        }
      }
      n++;
    }

    console.table(newBoard);
    return newBoard;
  }

  validateBoard(board) {
    let cols = this.checkColums(board, 7, 7);
    let rows = this.checkRows(board, 7, 7);
    let diags = this.checkDiags(board, 7, 7);
    if (cols || rows || diags) {
      this.handleWin();
    }
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
    // let board = this.state.gameState.slice();
    let board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    this.setState({
      isPlaying: true,
      gameState: board,
      title: "CONNECT FOUR",
      piecesPlaced: 0,
      currentRotation: 0,
      cardinalRotation: 0
    });
  }

  toggleInsane() {
    let isInsane = this.state.isInsane;
    this.setState({ isInsane: !isInsane });
    let isInsaneClass = this.state.isInsaneClass;
    if (isInsaneClass === "") {
      isInsaneClass = "insane";
    } else {
      isInsaneClass = "";
    }

    this.setState({ isInsaneClass: isInsaneClass });
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

  componentWillMount() {
    // let player1 = prompt("Enter player one's name");
    // let player2 = prompt("Enter player two's name");
    // this.setState({ playerOneName: player1, playerOneName: player2 });
  }

  render() {
    let restartButton = (
      <button id="restart-button" onClick={this.handleRestart}>
        RESTART
      </button>
    );

    let insaneButton = (
      <button
        id="insane-button"
        className={this.state.isInsaneClass}
        onClick={this.toggleInsane}
      >
        INSANE MODE
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
          cardinalRotation={this.state.cardinalRotation}
        />
        <div className="button-container">
          {restartButton}
          {insaneButton}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
