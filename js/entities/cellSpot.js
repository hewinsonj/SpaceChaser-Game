export class CellSpot {
  constructor(x, y, color, width, height, alive, occupied) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.alive = alive),
      (this.zLayer = 0),
      (this.occupied = occupied),
      // Overwrite render to skip hitbox rendering unless debugging
      (this.render = function (ctx) {
        // Skip hitbox rendering unless debugging
      });
  }
}