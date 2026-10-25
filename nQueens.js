export function solveNQueens(n) {
  const board = Array(n)
    .fill(null)
    .map(() => Array(n).fill(false));

  const steps = [];

  function saveStep() {
    steps.push(
      board.map((row) => [...row])
    );
  }

  function isSafe(row, col) {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col]) {
        return false;
      }
    }

    // Check upper-left diagonal
    for (
      let i = row - 1, j = col - 1;
      i >= 0 && j >= 0;
      i--, j--
    ) {
      if (board[i][j]) {
        return false;
      }
    }

    // Check upper-right diagonal
    for (
      let i = row - 1, j = col + 1;
      i >= 0 && j < n;
      i--, j++
    ) {
      if (board[i][j]) {
        return false;
      }
    }

    return true;
  }

  function backtrack(row) {
    // All queens have been placed
    if (row === n) {
      return true;
    }

    for (let col = 0; col < n; col++) {

      if (isSafe(row, col)) {

        // Place queen
        board[row][col] = true;

        // Save this state
        saveStep();

        // Move to next row
        if (backtrack(row + 1)) {
          return true;
        }

        // Remove queen
        board[row][col] = false;

        // Save backtracking state
        saveStep();
      }
    }

    return false;
  }

  backtrack(0);

  return {
    steps,
    solution: board.map((row) => [...row]),
  };
}