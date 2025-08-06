import { game } from "../index.js";
import { player, gameState } from "../gameState/gameState.js";

export class Dad {
  constructor(x, y, color, width, height) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.alive = true),
      (this.zLayer = 0),
      // we need two additional properties in order to make our hero move around a little smoother.
      (this.speed = 7.5),
      // because we're going to rework our movement handler, we need directions, set to be different values that we can update with a keypress
      (this.direction = {
        up: false,
        down: false,
        left: false,
        right: false,
      }),
      // we need two key based functions here that will change our hero's movement direction
      // this time, we'll only use WASD keys(purely for the sake of time)
      // setDirection will be tied to a keyDown event
      (this.setDirection = function (key) {
        if (key.toLowerCase() == "w") {
          this.direction.up = true;
        }
        if (key.toLowerCase() == "a") {
          (this.direction.left = true), (player.state = "leftMove");
        }
        if (key.toLowerCase() == "s") {
          this.direction.down = true;
        }
        if (key.toLowerCase() == "d") {
          (this.direction.right = true), (player.state = "rightMove");
        }
      }),
      // unsetDirection will be tied to a keyUp event
      (this.unsetDirection = function (key) {
        if (key.toLowerCase() == "w") {
          this.direction.up = false;
        }
        if (key.toLowerCase() == "a") {
          this.direction.left = false;
        }
        if (key.toLowerCase() == "s") {
          this.direction.down = false;
        }
        if (key.toLowerCase() == "d") {
          this.direction.right = false;
        }
      }),
      // we're also adding a movePlayer function that is tied to our directions
        (this.movePlayer = function () {
          if (gameState.gameOver) {
            this.direction = {
              up: false,
              down: false,
              left: false,
              right: false,
            };
            return;
          }        
        if (this.direction.up) {
          this.y -= this.speed;
          // while we're tracking movement, let's stop our hero from exiting the top of the screen
          if (this.y <= 10) {
            this.y = 10;
          }
        }
        if (this.direction.left) {
          this.x -= this.speed;
          // while we're tracking movement, let's stop our hero from exiting the top of the screen
          if (this.x <= 0) {
            this.x = 0;
          }
        }
        if (this.direction.down) {
          this.y += this.speed;
          // while we're tracking movement, let's stop our hero from exiting the top of the screen
          // for down, and right, we need the entire character for our detection of the wall, as well as the canvas width and height
          if (this.y + this.height >= game.height - 10) {
            this.y = game.height - this.height - 10;
          }
        }
        if (this.direction.right) {
          this.x += this.speed;
          // while we're tracking movement, let's stop our hero from exiting the top of the screen
          // for down, and right, we need the entire character for our detection of the wall, as well as the canvas width and height
          if (this.x + this.width >= game.width) {
            this.x = game.width - this.width;
          }
        }
      }),
      // Overwrite render to skip hitbox rendering unless debugging
      (this.render = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      });
  }
}
