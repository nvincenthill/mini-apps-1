import React from "react";

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

export default Tile;
