import React from "react";
// import GameBoard from "GameBoard.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: "world",
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
      nextPiece: 1
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(row, idx) {
    // alert(`Row ${row} number ${idx} clicked`);
    if (this.state.isPlaying) {
      let board = this.state.gameState;
      if (board[row - 1][idx] === 0) {
        this.handleNextPiece();
        board[row - 1][idx] = this.state.nextPiece;
        this.applyGravity();
        this.validateBoard();
        console.table(this.state.gameState);
        if (this.state.isInsane) {
          let currentRotation = this.state.currentRotation;
          this.setState({ currentRotation: currentRotation + 90 });
        }
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

  applyGravity() {}

  validateBoard() {
    console.log("validating board");
  }

  render() {
    return (
      <React.Fragment>
        <div className="title-container">
          <h1 id="title">CONNECT FOUR</h1>
        </div>
        <GameBoard
          gameState={this.state.gameState}
          handleClick={this.handleClick}
          currentRotation={this.state.currentRotation}
        />
      </React.Fragment>
    );
  }
}

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let row1 = this.props.gameState[0].map((tile, index) => {
      return (
        <Tile
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={1}
        />
      );
    });
    let row2 = this.props.gameState[1].map((tile, index) => {
      return (
        <Tile
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={2}
        />
      );
    });
    let row3 = this.props.gameState[2].map((tile, index) => {
      return (
        <Tile
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={3}
        />
      );
    });
    let row4 = this.props.gameState[3].map((tile, index) => {
      return (
        <Tile
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={4}
        />
      );
    });
    let row5 = this.props.gameState[4].map((tile, index) => {
      return (
        <Tile
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={5}
        />
      );
    });
    let row6 = this.props.gameState[5].map((tile, index) => {
      return (
        <Tile
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={6}
        />
      );
    });
    let row7 = this.props.gameState[6].map((tile, index) => {
      return (
        <Tile
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={7}
        />
      );
    });

    let rotatedStyle = {
      transform: `rotate(${this.props.currentRotation}deg)`
    };

    return (
      <div id="gameboard" style={rotatedStyle}>
        {row1}
        {row2}
        {row3}
        {row4}
        {row5}
        {row6}
        {row7}
      </div>
    );
  }
}

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorDisplayed: null,
      needsToRerender: false
    };
  }

  updateTile() {
    if (this.props.gameState[this.props.row - 1][this.props.index] === 1) {
      this.setState({ colorDisplayed: "black" });
    }
    if (this.props.gameState[this.props.row - 1][this.props.index] === -1) {
      this.setState({ colorDisplayed: "red" });
    }
  }

  componentWillReceiveProps() {
    this.updateTile();
  }

  componentDidMount() {
    this.updateTile();
  }

  render() {
    let RedGamePiece = <div className="token-red" />;
    let BlackGamePiece = <div className="token-black" />;

    return (
      <div
        className="tile"
        onClick={() => this.props.handleClick(this.props.row, this.props.index)}
      >
        {this.state.colorDisplayed === "red" ? RedGamePiece : null}
        {this.state.colorDisplayed === "black" ? BlackGamePiece : null}
      </div>
    );
  }
}

export default App;
