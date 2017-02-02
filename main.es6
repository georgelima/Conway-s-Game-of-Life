const game = new Game();

const board = new Board(0, 0, Math.floor(800/30), Math.floor(600/30), 30, 30);

game.canvas.addEventListener('click', (e) => {
  const boardX = Math.floor(e.offsetX / board.width);
  const boardY = Math.floor(e.offsetY / board.height);

  board.getCell(boardX, boardY).isLiving = true;
});

game.addNode(board);

game.start();

// Listeners
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
