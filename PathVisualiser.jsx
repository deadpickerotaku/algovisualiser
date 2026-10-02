import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathVisualiser.css";

import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "./algorithms/dijkstra";

import { bfs } from "./algorithms/bfs";
import { dfs } from "./algorithms/dfs";

// Grid size
const ROWS = 20;
const COLS = 50;

// Start and finish positions
const START_NODE_ROW = 10;
const START_NODE_COL = 15;

const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathVisualiser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      mouseIsPressed: false,

      // Current algorithm
      algorithm: "dijkstra",

      // wall or weight
      mode: "wall",

      // Prevent editing while algorithm is running
      isVisualizing: false,
    };
  }

  componentDidMount() {
    const grid = this.getInitialGrid();

    this.setState({
      grid: grid,
    });
  }

  // =========================================================
  // CREATE A NODE
  // =========================================================

  createNode(row, col) {
    return {
      row: row,
      col: col,

      isStart:
        row === START_NODE_ROW &&
        col === START_NODE_COL,

      isFinish:
        row === FINISH_NODE_ROW &&
        col === FINISH_NODE_COL,

      distance: Infinity,

      isVisited: false,

      isWall: false,

      weight: 1,

      previousNode: null,
    };
  }

  // =========================================================
  // CREATE INITIAL GRID
  // =========================================================

  getInitialGrid() {
    const grid = [];

    for (let row = 0; row < ROWS; row++) {
      const currentRow = [];

      for (let col = 0; col < COLS; col++) {
        currentRow.push(this.createNode(row, col));
      }

      grid.push(currentRow);
    }

    return grid;
  }

  // =========================================================
  // MOUSE DOWN
  // =========================================================

  handleMouseDown = (row, col) => {
    if (this.state.isVisualizing) {
      return;
    }

    const newGrid = this.state.grid.map((row) =>
      row.map((node) => ({
        ...node,
      }))
    );

    const node = newGrid[row][col];

    // Don't modify start or finish
    if (node.isStart || node.isFinish) {
      return;
    }

    // -------------------------
    // WALL MODE
    // -------------------------

    if (this.state.mode === "wall") {
      node.isWall = !node.isWall;
    }

    // -------------------------
    // WEIGHT MODE
    // -------------------------

    if (this.state.mode === "weight") {
      node.weight++;

      if (node.weight > 9) {
        node.weight = 1;
      }
    }

    this.setState({
      grid: newGrid,
      mouseIsPressed: true,
    });
  };

  // =========================================================
  // MOUSE ENTER
  // =========================================================

  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) {
      return;
    }

    if (this.state.isVisualizing) {
      return;
    }

    const newGrid = this.state.grid.map((row) =>
      row.map((node) => ({
        ...node,
      }))
    );

    const node = newGrid[row][col];

    // Don't modify start or finish
    if (node.isStart || node.isFinish) {
      return;
    }

    // -------------------------
    // WALL MODE
    // -------------------------

    if (this.state.mode === "wall") {
      node.isWall = true;
    }

    // -------------------------
    // WEIGHT MODE
    // -------------------------

    if (this.state.mode === "weight") {
      node.weight++;

      if (node.weight > 9) {
        node.weight = 1;
      }
    }

    this.setState({
      grid: newGrid,
    });
  };

  // =========================================================
  // MOUSE UP
  // =========================================================

  handleMouseUp = () => {
    this.setState({
      mouseIsPressed: false,
    });
  };

  // =========================================================
  // CHANGE ALGORITHM
  // =========================================================

  handleAlgorithmChange = (event) => {
    if (this.state.isVisualizing) {
      return;
    }

    const algorithm = event.target.value;

    let newGrid = this.state.grid;

    // BFS and DFS don't use weights
    if (algorithm === "bfs" || algorithm === "dfs") {
      newGrid = this.state.grid.map((row) =>
        row.map((node) => ({
          ...node,
          weight: 1,
        }))
      );
    }

    this.setState({
      algorithm: algorithm,

      // Only Dijkstra can use weights
      mode:
        algorithm === "dijkstra"
          ? this.state.mode
          : "wall",

      grid: newGrid,
    });
  };

  // =========================================================
  // CHANGE MODE
  // =========================================================

  handleModeChange = (event) => {
    if (this.state.isVisualizing) {
      return;
    }

    this.setState({
      mode: event.target.value,
    });
  };

  // =========================================================
  // CLEAR ALGORITHM DATA
  // =========================================================

  clearAlgorithmData() {
    const newGrid = this.state.grid.map((row) =>
      row.map((node) => ({
        ...node,

        isVisited: false,

        distance: Infinity,

        previousNode: null,
      }))
    );

    this.setState({
      grid: newGrid,
    });
  }

  // =========================================================
  // CLEAR BOARD
  // =========================================================

  clearBoard = () => {
    if (this.state.isVisualizing) {
      return;
    }

    const grid = this.getInitialGrid();

    this.setState({
      grid: grid,
      mouseIsPressed: false,
    });
  };

  // =========================================================
  // VISUALIZE ALGORITHM
  // =========================================================

  visualizeAlgorithm = () => {
    if (this.state.isVisualizing) {
      return;
    }

    const grid = this.state.grid.map((row) =>
      row.map((node) => ({
        ...node,

        isVisited: false,

        distance: Infinity,

        previousNode: null,
      }))
    );

    const startNode =
      grid[START_NODE_ROW][START_NODE_COL];

    const finishNode =
      grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    let visitedNodesInOrder = [];
    let nodesInShortestPathOrder = [];

    // =====================================================
    // DIJKSTRA
    // =====================================================

    if (this.state.algorithm === "dijkstra") {
      visitedNodesInOrder = dijkstra(
        grid,
        startNode,
        finishNode
      );

      nodesInShortestPathOrder =
        getNodesInShortestPathOrder(finishNode);
    }

    // =====================================================
    // BFS
    // =====================================================

    else if (this.state.algorithm === "bfs") {
      visitedNodesInOrder = bfs(
        grid,
        startNode,
        finishNode
      );

      nodesInShortestPathOrder =
        getNodesInShortestPathOrder(finishNode);
    }

    // =====================================================
    // DFS
    // =====================================================

    else if (this.state.algorithm === "dfs") {
      visitedNodesInOrder = dfs(
        grid,
        startNode,
        finishNode
      );

      nodesInShortestPathOrder =
        getNodesInShortestPathOrder(finishNode);
    }

    this.setState(
      {
        grid: grid,
        isVisualizing: true,
      },
      () => {
        this.animateAlgorithm(
          visitedNodesInOrder,
          nodesInShortestPathOrder
        );
      }
    );
  };

  // =========================================================
  // ANIMATE VISITED NODES
  // =========================================================

  animateAlgorithm(
    visitedNodesInOrder,
    nodesInShortestPathOrder
  ) {
    for (
      let i = 0;
      i <= visitedNodesInOrder.length;
      i++
    ) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(
            nodesInShortestPathOrder
          );
        }, 10 * i);

        return;
      }

      setTimeout(() => {
        const node = visitedNodesInOrder[i];

        if (!node) {
          return;
        }

        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );

        if (
          nodeElement &&
          !node.isStart &&
          !node.isFinish
        ) {
          nodeElement.classList.add(
            "node-visited"
          );
        }
      }, 10 * i);
    }
  }

  // =========================================================
  // ANIMATE SHORTEST PATH
  // =========================================================

  animateShortestPath(nodesInShortestPathOrder) {
    for (
      let i = 0;
      i < nodesInShortestPathOrder.length;
      i++
    ) {
      setTimeout(() => {
        const node =
          nodesInShortestPathOrder[i];

        if (!node) {
          return;
        }

        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );

        if (
          nodeElement &&
          !node.isStart &&
          !node.isFinish
        ) {
          nodeElement.classList.remove(
            "node-visited"
          );

          nodeElement.classList.add(
            "node-shortest-path"
          );
        }

        // Last node
        if (
          i ===
          nodesInShortestPathOrder.length - 1
        ) {
          this.setState({
            isVisualizing: false,
          });
        }
      }, 50 * i);
    }

    // No path found
    if (nodesInShortestPathOrder.length === 0) {
      setTimeout(() => {
        this.setState({
          isVisualizing: false,
        });
      }, 100);
    }
  }

  // =========================================================
  // CLEAR PATH
  // =========================================================

  clearPath = () => {
    if (this.state.isVisualizing) {
      return;
    }

    const newGrid = this.state.grid.map((row) =>
      row.map((node) => ({
        ...node,

        isVisited: false,

        distance: Infinity,

        previousNode: null,
      }))
    );

    this.setState({
      grid: newGrid,
    });

    // Remove animation classes from DOM
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const nodeElement =
          document.getElementById(
            `node-${row}-${col}`
          );

        if (nodeElement) {
          nodeElement.classList.remove(
            "node-visited"
          );

          nodeElement.classList.remove(
            "node-shortest-path"
          );
        }
      }
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  render() {
    const {
      grid,
      mouseIsPressed,
      algorithm,
      mode,
      isVisualizing,
    } = this.state;

    return (
      <div
        className="path-visualiser"
        onMouseUp={this.handleMouseUp}
      >

        {/* ================================================= */}
        {/* CONTROLS */}
        {/* ================================================= */}

        <div className="controls">

          {/* ALGORITHM */}

          <label>
            Algorithm:
          </label>

          <select
            value={algorithm}
            onChange={
              this.handleAlgorithmChange
            }
            disabled={isVisualizing}
          >
            <option value="dijkstra">
              Dijkstra
            </option>

            <option value="bfs">
              BFS
            </option>

            <option value="dfs">
              DFS
            </option>
          </select>

          {/* MODE */}

          <label>
            Mode:
          </label>

          <select
            value={mode}
            onChange={this.handleModeChange}
            disabled={
              isVisualizing ||
              algorithm !== "dijkstra"
            }
          >
            <option value="wall">
              Wall
            </option>

            <option value="weight">
              Weight
            </option>
          </select>

          {/* VISUALIZE */}

          <button
            onClick={
              this.visualizeAlgorithm
            }
            disabled={isVisualizing}
          >
            Visualize {algorithm}
          </button>

          {/* CLEAR PATH */}

          <button
            onClick={this.clearPath}
            disabled={isVisualizing}
          >
            Clear Path
          </button>

          {/* CLEAR BOARD */}

          <button
            onClick={this.clearBoard}
            disabled={isVisualizing}
          >
            Clear Board
          </button>

        </div>

        {/* ================================================= */}
        {/* LEGEND */}
        {/* ================================================= */}

        <div className="legend">

          <span>
            🟢 Start
          </span>

          <span>
            🔴 Finish
          </span>

          <span>
            🟣 Wall
          </span>

          {algorithm === "dijkstra" && (
            <span>
              🟠 Weight
            </span>
          )}

        </div>

        {/* ================================================= */}
        {/* GRID */}
        {/* ================================================= */}

        <div
          className="grid"
          onMouseLeave={() => {
            if (mouseIsPressed) {
              // Don't stop dragging.
              // MouseUp on the parent will
              // eventually stop it.
            }
          }}
        >

          {grid.map((row, rowIdx) => (
            <div
              className="row"
              key={rowIdx}
            >

              {row.map(
                (node, nodeIdx) => (
                  <Node
                    key={nodeIdx}
                    row={node.row}
                    col={node.col}
                    isStart={node.isStart}
                    isFinish={node.isFinish}
                    isWall={node.isWall}
                    weight={node.weight}

                    onMouseDown={
                      this.handleMouseDown
                    }

                    onMouseEnter={
                      this.handleMouseEnter
                    }

                    onMouseUp={
                      this.handleMouseUp
                    }
                  />
                )
              )}

            </div>
          ))}

        </div>

      </div>
    );
  }
}