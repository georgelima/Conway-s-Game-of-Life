class Game {
  constructor() {
    this.running = false;
    this.canvas = document.getElementById("gameOfLife");
    this.context = this.canvas.getContext('2d');
    this.nodes = [];
  }

  _runner() {

    if (this.running === false) {
      return false;
    }

    self.requestAnimationFrame(this._runner.bind(this));

    this._clear();
    this._update();
    this._draw();
  }

  _clear() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _update() {
    this.nodes.forEach((current, idx) => {

      current._update(this);

    });
  }

  _draw() {
    this.nodes.forEach((current, idx) => {

      current._draw(this.context);

    });
  }

  start() {
    this.running = true;
    this._runner();
  }

  addNode(node) {
    this.nodes.push(node);
  }

}
