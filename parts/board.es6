let TIME = 0;

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

class Board {
  constructor(x, y, size, width, height) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.width = width;
    this.height = height;

    this.started = false;

    this.cells = [];
    this._init();
  }

  _init() {
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(new Cell(i, j, this));
      }
      this.cells.push(row);
    }
    console.log(this.cells);

  }

  getCell(x, y) {
    // think about this
    x = (this.size + x) % this.size;
    y = (this.size + y) % this.size;

    return this.cells[x][y];
  }

  updateNeighborhoods() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this._updateNeighborhoodFromCell(i, j);
      }
    }
  }

  _updateNeighborhoodFromCell(x, y) {
    let cell = this.cells[x][y];
    cell.aliveNeighbors = 0;

    for (let i = 0; i < directions.length; i++) {
      let direction = directions[i];
      let dRow = direction[0];
      let dCol = direction[1];

      if (this._isBounds(x + dRow, y + dCol)) {

        let neighbor = this.getCell(dRow + x, y + dCol);
        if (neighbor.isLiving) {
          neighbor.aliveNeighbors = neighbor.aliveNeighbors + 1;
        }

      }
    }

  }

  _updateCells(x, y) {
    let cell = this.cells[x][y];

    if (this._isUnderPop(x, y) || this._isOverPop(x, y)) {
      cell.isLiving = false;
    } else if (this._shouldBorn(x, y)) {
      cell.isLiving = true;
    }

  }

  updateBoard() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this._updateCells(i, j);
      }
    }
  }

  _isBounds(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  _isUnderPop(x, y) {
    let cell = this.cells[x][y];
    return cell.aliveNeighbors < 2;
  }

  _isOverPop(x, y) {
    let cell = this.cells[x][y];
    return cell.aliveNeighbors > 3;
  }

  _shouldBorn(x, y) {
    let cell = this.cells[x][y];
    return !cell.isLiving && cell.aliveNeighbors === 3;
  }

  _update(game) {
    if (!this.started) return;

    TIME += 30;
    if (TIME < 200) return;

    // this.updateNeighborhoods();
    // this.updateBoard();

    for (let i = 0; i < this.size; i++) {

      // let row = this.cells[i];
      for (let j = 0; j < this.size; j++) {

        let cell = this.cells[i][j];

        if (cell.shouldBorn()) {
          cell.isLiving = true;
        } else if (cell.shouldDie()) {
          cell.isLiving = false;
        }
      }
    }

    TIME = 0;
  }

  _draw(context) {
    context.save();

    context.translate(this.x, this.y);

    context.fillStyle = 'white';
    context.fillRect(0, 0, this.size * this.width, this.size * this.height);

    context.fillStyle = 'black';

    for (let i = 0, X = 0; i < this.size; i++, X += this.width) {
      context.beginPath();
      context.moveTo(X, 0);
      context.lineTo(X, this.size * this.height);
      context.closePath();
      context.stroke();
    }

    for (let i = 0, Y = 0; i < this.size; i++, Y += this.width) {
      context.beginPath();
      context.moveTo(0, Y);
      context.lineTo(this.size * this.width, Y);
      context.closePath();
      context.stroke();
    }

    context.fillStyle = '#3498DB';

    for (let i = 0; i < this.size; i++) {
      let row = this.cells[i];
      for (let j = 0; j < this.size; j++) {
        let cell = row[j];
        if (cell.isLiving) {
          context.fillRect(cell.x * this.width, cell.y * this.height, this.width, this.height);
        }
      }
    }

    context.restore();
  }
}
