class Board {
  constructor(size, width, height) {
    this.x = 0;
    this.y = 0;
    this.size = size;
    // largura e altura de cada bloco da grid
    this.width = width;
    this.height = height;

    this.started = false;

    this.cells = [];
    this._init();
  }

  // inicializa a matriz com as células
  _init() {
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(new Cell(i, j));
      }
      this.cells.push(row);
    }
  }

  // retorna os 8 vizinhos diretos da célula na posição (x, y)
  getNeighborsFromCell(x, y) {
    let rowUp = (y-1 >= 0) ? y-1 : this.size - 1;
    let rowDown = (y+1 <= this.size - 1) ? y + 1 : 0;
    let leftColumn = (x-1 >= 0) ? x-1 : this.size - 1;
    let rightColumn = (x+1 <= this.size - 1) ? x + 1 : 0;

    return [
      this.cells[leftColumn][rowUp],
      this.cells[x][rowUp],
      this.cells[rightColumn][rowUp],
      this.cells[leftColumn][y],
      this.cells[rightColumn][y],
      this.cells[leftColumn][[rowDown]],
      this.cells[x][rowDown],
      this.cells[rightColumn][rowDown]
    ];
  }

  // itera sobre todas as células atualizando a quantidade de vizinhos vivos
  updateNeighborhoods() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this._updateNeighborhoodFromCell(i, j);
      }
    }
  }

  // atualiza os vizinhos vivos de uma célula na posição (x, y)
  _updateNeighborhoodFromCell(x, y) {
    let cell = this.cells[x][y];
    cell.aliveNeighbors = 0;

    const neighbors = this.getNeighborsFromCell(x, y);

    for (let i = 0; i < neighbors.length; i++)  {
      let neighbor = neighbors[i];
      if (neighbor.isLiving === true) {
        cell.aliveNeighbors++;
      }
    }

  }
  // verifica as condições de vida ou morte de uma célula em (x, y)
  // e atualiza seu estado
  _updateCells(x, y) {
    let cell = this.cells[x][y];

    if (this._isUnderPop(x, y) || this._isOverPop(x, y)) {
      cell.isLiving = false;
    } else if (this._shouldBorn(x, y)) {
      cell.isLiving = true;
    }

  }

  // itera sobre todas as células do quadro atualizado seus estados
  updateBoard() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this._updateCells(i, j);
      }
    }
  }

  // condições de nascimento ou  morte
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

  // chamada a cada frame da animação atualiza o estado do game
  _update(game) {
    if (!this.started) return;

    // Cadence frames
    TIME += 30;
    if (TIME < 100) return;

    this.updateNeighborhoods();
    this.updateBoard();

    TIME = 0;
  }

  // responsável por renderizar os elementos do quadro
  _draw(context) {
    context.save();

    context.translate(this.x, this.y);

    context.fillStyle = '#666';
    context.fillRect(0, 0, this.size * this.width, this.size * this.height);

    context.fillStyle = 'black';

    // Draw rows and columns of grid
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

    // desenha as células vivas
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
