class Cell {
  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.isLiving = 0.9 < Math.random();
    this.aliveNeighbors = 0;
  }

  _aliveNeighbors() {
    return this.getNeighbors().filter(current => current.isLiving).length;
  }

  shouldDie() {
    const livingCells = this.getNeighbors().filter(current => {
      if (current) {
        return current.isLiving;
      }
    });

    // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    if (livingCells.length < 2)  {
      return true;
    }

    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    if (livingCells.length > 3) {
      return true;
    }

    return false;
  }

  shouldBorn() {
    const livingCells = this.getNeighbors().filter(current => {
      if (current) {
        return current.isLiving;
      }
    });

    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    if (this.isLiving === false && livingCells.length === 3) {
      return true;
    }

    return false;
  }

  // getNeighbors() {
  //   let row_above = (y-1 >= 0) ? y-1 : length_y-1; // If current cell is on first row, cell "above" is the last row (stitched)
  //   let row_below = (y+1 <= length_y-1) ? y+1 : 0; // If current cell is in last row, then cell "below" is the first row
  //   let column_left = (x-1 >= 0) ? x-1 : length_x - 1; // If current cell is on first row, then left cell is the last row
  //   let column_right = (x+1 <= length_x-1) ? x+1 : 0; // If current cell is on last row, then right cell is in the first row
  //
  //   return [
  //     current_gen[row_above][column_left].clone(),
  //     current_gen[row_above][x].clone(),
  //     current_gen[row_above][column_right].clone(),
  //     current_gen[y][column_left].clone(),
  //     current_gen[y][column_right].clone(),
  //     current_gen[row_below][column_left].clone(),
  //     current_gen[row_below][x].clone(),
  //     current_gen[row_below][column_right].clone()
  //   ];
  // }
}
