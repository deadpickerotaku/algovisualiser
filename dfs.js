export function dfs(
  grid,
  startNode,
  finishNode
) {
  const visitedNodesInOrder = [];

  function dfsHelper(node) {

    if (
      node.isVisited ||
      node.isWall
    ) {
      return false;
    }

    node.isVisited = true;

    visitedNodesInOrder.push(
      node
    );

    if (node === finishNode) {
      return true;
    }

    const neighbors =
      getNeighbors(
        node,
        grid
      );

    for (
      const neighbor
      of neighbors
    ) {

      if (
        neighbor.isVisited ||
        neighbor.isWall
      ) {
        continue;
      }

      neighbor.previousNode =
        node;

      if (
        dfsHelper(neighbor)
      ) {
        return true;
      }
    }

    return false;
  }

  dfsHelper(startNode);

  return visitedNodesInOrder;
}


/* =========================
       GET NEIGHBOURS
   ========================= */

function getNeighbors(
  node,
  grid
) {
  const neighbors = [];

  const { row, col } = node;

  if (row > 0) {
    neighbors.push(
      grid[row - 1][col]
    );
  }

  if (row < grid.length - 1) {
    neighbors.push(
      grid[row + 1][col]
    );
  }

  if (col > 0) {
    neighbors.push(
      grid[row][col - 1]
    );
  }

  if (
    col <
    grid[0].length - 1
  ) {
    neighbors.push(
      grid[row][col + 1]
    );
  }

  return neighbors;
}