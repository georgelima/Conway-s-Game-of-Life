let TIME = 0;

class Board {
  constructor(x, y, rows, columns, width, height) {
    this.x = x;
    this.y = y;
    this.rows = rows;
    this.columns = columns;
    this.width = width;
    this.height = height;

    this.started = false;

    this.cells = new Array();
    this._init();
  }

  _init() {
    for (let i = 0; i < (this.rows * this.columns); i++) {
      const x = i % this.columns;
      const y = Math.floor(i / this.columns);

      this.cells.push(new Cell(x, y, this));
    }
  }

  getCell(x, y) {
    // think about this
    x = (this.columns + x) % this.columns;
    y = (this.rows + y) % this.rows;

    const position = x + (y * this.columns);
    return this.cells[position];
  }

  _update(game, dlt) {
    if (!this.started) return;

    TIME += 30;
    if (TIME < 200) return;

    let cellsMustDie = this.cells.filter(currentCell => currentCell.shouldDie());

    cellsMustDie.forEach(currentCell => {
      currentCell.isLiving = false;
    });

    let cellsMustBorn = this.cells.filter(currentCell => currentCell.shouldBorn());

    cellsMustBorn.forEach(currentCell => {
      currentCell.isLiving = true;
    });

    TIME = 0;
  }

  _draw(context, dlt) {
    context.save();

    context.translate(this.x, this.y);

    context.fillStyle = 'white';
    context.fillRect(0, 0, this.columns * this.width, this.rows * this.height);

    context.fillStyle = 'black';

    for (let i = 0, X = 0; i < this.columns; i++, X += this.width) {
      context.beginPath();
      context.moveTo(X, 0);
      context.lineTo(X, this.rows * this.height);
      context.closePath();
      context.stroke();
    }

    for (let i = 0, Y = 0; i < this.rows; i++, Y += this.width) {
      context.beginPath();
      context.moveTo(0, Y);
      context.lineTo(this.columns * this.width, Y);
      context.closePath();
      context.stroke();
    }

    context.fillStyle = '#3498DB';
    this.cells
      .filter(current => current.isLiving)
      .forEach(currentCell => {
        context.fillRect(currentCell.x * this.width, currentCell.y * this.height, this.width, this.height);
      });

    context.restore();
  }
}
