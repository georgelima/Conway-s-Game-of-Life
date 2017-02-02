class Cell {
  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.isLiving = false;
  }

  _aliveNeighbors() {
    return this.getNeighbors().filter(current => current.isLiving).length;
  }

  shouldDie() {
    // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    if (this._aliveNeighbors() < 2)  {
      return true;
    }

    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    if (this._aliveNeighbors() > 3) {
      return true;
    }

    return false;
  }

  shouldBorn() {
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    if (this._aliveNeighbors() === 3) {
      return true;
    }

    return false;
  }

  getNeighbors() {
    return [
      this.board.getCell(this.x-1, this.y-1),
      this.board.getCell(this.x-1, this.y),
      this.board.getCell(this.x-1, this.y+1),
      this.board.getCell(this.x, this.y-1),
      this.board.getCell(this.x, this.y+1),
      this.board.getCell(this.x+1, this.y-1),
      this.board.getCell(this.x+1, this.y),
      this.board.getCell(this.x+1, this.y+1)
    ];
  }
}
