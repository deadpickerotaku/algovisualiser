import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isWall,
      weight,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;

    let extraClassName = "";

    if (isStart) {
      extraClassName = "node-start";
    } else if (isFinish) {
      extraClassName = "node-finish";
    } else if (isWall) {
      extraClassName = "node-wall";
    } else if (weight > 1) {
      extraClassName = "node-weight";
    }

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={(e) => {
          e.preventDefault();
          onMouseDown(row, col);
        }}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      >
        {!isStart && !isFinish && !isWall && weight > 1 && weight}
      </div>
    );
  }
}