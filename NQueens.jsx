import React, { Component } from "react";
import "./NQueens.css";
import { solveNQueens } from "../algorithms/nQueens";

export default class NQueens extends Component {
  constructor(props) {
    super(props);

    this.state = {
      n: 4,
      board: [],
      isSolving: false,
      status: "Ready",
      speed: 500,
    };
  }

  componentDidMount() {
    this.createBoard();
  }

  createBoard = () => {
    const { n } = this.state;

    const board = Array(n)
      .fill(null)
      .map(() => Array(n).fill(false));

    this.setState({
      board,
    });
  };

  solve = () => {
    if (this.state.isSolving) return;

    const { n, speed } = this.state;

    const result = solveNQueens(n);
    const { steps } = result;

    this.setState({
      isSolving: true,
      status: "Solving...",
    });

    for (let i = 0; i < steps.length; i++) {
      setTimeout(() => {
        this.setState({
          board: steps[i],
        });

        if (i === steps.length - 1) {
          this.setState({
            isSolving: false,
            status: "Solution Found!",
          });
        }
      }, speed * i);
    }
  };

  reset = () => {
    this.setState(
      {
        isSolving: false,
        status: "Ready",
      },
      this.createBoard
    );
  };

  render() {
    const {
      n,
      board,
      isSolving,
      status,
      speed,
    } = this.state;

    return (
      <div className="nqueens-container">

        <h1>N-Queens Visualizer</h1>

        <h3 className={isSolving ? "solving" : "status"}>
          Status: {status}
        </h3>

        <div className="controls">

          {/* N INPUT */}
          <label>
            N:
            <input
              type="number"
              min="4"
              max="12"
              value={n}
              disabled={isSolving}
              onChange={(e) =>
                this.setState(
                  {
                    n: Number(e.target.value),
                  },
                  this.createBoard
                )
              }
            />
          </label>

          {/* SPEED SLIDER */}
          <div className="speed-control">

            <label>
              Speed:
            </label>

            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={speed}
              disabled={isSolving}
              onChange={(e) =>
                this.setState({
                  speed: Number(e.target.value),
                })
              }
            />

            <span>{speed} ms</span>

          </div>

          {/* SOLVE BUTTON */}
          <button
            onClick={this.solve}
            disabled={isSolving}
          >
            {isSolving ? "Solving..." : "Solve"}
          </button>

          {/* RESET BUTTON */}
          <button
            onClick={this.reset}
            disabled={isSolving}
          >
            Reset
          </button>

        </div>

        {/* CHESS BOARD */}
        <div
          className="chess-board"
          style={{
            gridTemplateColumns: `repeat(${n}, 60px)`,
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`queen-cell ${
                  (rowIndex + colIndex) % 2 === 0
                    ? "light"
                    : "dark"
                }`}
              >
                {cell ? "♛" : ""}
              </div>
            ))
          )}
        </div>

      </div>
    );
  }
}