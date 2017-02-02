class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isLiving = 0.8 < Math.random();
    this.aliveNeighbors = 0;
  }
}
