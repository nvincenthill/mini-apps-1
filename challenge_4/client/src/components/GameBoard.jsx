import React from "react";
import Tile from "Tile";

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="gameboard">
        <Tile />
      </div>
    );
  }
}

export default GameBoard;
