export class Dog {
  constructor(x, y, color, width, height, alive) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.alive = alive),
      (this.zLayer = 0),
      (this.render = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      });
  }
}