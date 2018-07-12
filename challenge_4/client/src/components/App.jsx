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
        [0, 0, 0, 0, 0, 0, 0]
      ]
    };
  }
  render() {
    return (
      <React.Fragment>
        {/* <h1 id="title">Connect Four</h1> */}
        <GameBoard gameState={this.state.gameState} />
      </React.Fragment>
    );
  }
}

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let gameBoardLayout = this.props.gameState.map((tile, index) => {
      return <Tile key={index} />;
    });

    return (
      <div id="gameboard">
        {gameBoardLayout}
        {gameBoardLayout}
        {gameBoardLayout}
        {gameBoardLayout}
        {gameBoardLayout}
        {gameBoardLayout}
      </div>
    );
  }
}

class Tile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="tile" />;
  }
}

export default App;
