export class PowerUps {
  constructor(x, y, color, width, height, alive) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.alive = alive),
       this.render = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      };
  }
}