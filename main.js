let TIME = 0;

const game = new Game();
// board(sizeOfBoard, cellWidth, cellHeight);

const board = new Board(100, 15, 15);
game.addNode(board);

game.start();

// Listeners
game.canvas.addEventListener('click', (e) => {
  const boardX = Math.floor(e.offsetX / board.width);
  const boardY = Math.floor(e.offsetY / board.height);
  board.cells[boardX][boardY].isLiving = true;
});

document.getElementById("stop").disabled = true;

document.getElementById("start").addEventListener("click", (e) => {
  document.getElementById("start").disabled = true;
  document.getElementById("stop").disabled = false;
  board.started = true;
});

document.getElementById("stop").addEventListener("click", (e) => {
  document.getElementById("stop").disabled = true;
  document.getElementById("start").disabled = false;
  board.started = false;
});
