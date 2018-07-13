import React from "react";
import Tile from "./Tile.jsx";

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

export default GameBoard;
