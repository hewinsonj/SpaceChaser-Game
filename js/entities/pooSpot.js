export class PooSpot {
  constructor(x, y, color, width, height, alive, name) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.alive = alive),
      (this.name = name),
      this.render = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      };
  }
}
