class Game {
  constructor() {
    this.running = false;
    this.canvas = document.getElementById("gameOfLife");
    this.context = this.canvas.getContext('2d');
    this.nodes = [];
  }

  _runner(lastTime) {
    let lTime = Date.now();

    if (this.running === false) {
      return false;
    }

    self.requestAnimationFrame(this._runner.bind(this));

    let currentTime = Date.now();

    const elapsedTime = currentTime - lTime;

    this._clear();
    this._update();
    this._draw();

    lTime = currentTime;
  }

  _clear() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _update(dlt) {
    this.nodes.forEach((current, idx) => {

      current._update(this, dlt);

    });
  }

  _draw(dlt) {
    this.nodes.forEach((current, idx) => {

      current._draw(this.context);

    });
  }

  start() {
    this.running = true;
    let lastTime = Date.now();
    this._runner(lastTime);
  }

  addNode(node) {
    this.nodes.push(node);
  }

}
