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
          this.direction = { up: false, down: false, left: false, right: false };
          return;
        }
        if (!gameState.controlsEnabled && !gameState.playerEnterActive) {
          return; // completely stop player sprite movement when controls are disabled
        }

        // Delta time in seconds (fallback to 1/60)
        const dt = (typeof gameState.dv === "number" && isFinite(gameState.dv) && gameState.dv > 0) ? gameState.dv : 1/60;

        // Convert legacy per-frame speed (7.5 px/frame @ 60 FPS) to px/sec
        const basePxPerSec = this.speed * 60; // 7.5 * 60 = 450 px/sec
        const step = basePxPerSec * dt;

        // Build direction vector from inputs
        let dx = 0;
        let dy = 0;
        if (this.direction.left) dx -= 1;
        if (this.direction.right) dx += 1;
        if (this.direction.up) dy -= 1;
        if (this.direction.down) dy += 1;

        // Normalize to avoid faster diagonal movement
        if (dx !== 0 || dy !== 0) {
          const len = Math.hypot(dx, dy);
          dx /= len;
          dy /= len;

          this.x += dx * step;
          this.y += dy * step;
        }

        // Skip clamping during intro/cutscenes so off-screen spawn works
        const allowOffscreen =
          !!gameState.inIntro ||
          !!gameState.introActive ||
          !!gameState.cutsceneActive ||
          !!gameState.allowOffscreenPlayer ||
          !!gameState.playerEnterActive;

        if (!allowOffscreen) {
          // Soft re-entry: if already offscreen, block further outward movement instead of snapping in
          if (this.x < 0) {
            if (dx < 0) this.x = 0; // block moving further left once at edge
          } else if (this.x <= 0) {
            this.x = 0;
          }

          if (this.y < 10) {
            if (dy < 0) this.y = 10; // block moving further up once at edge
          } else if (this.y <= 10) {
            this.y = 10;
          }

          // Always clamp right/bottom to prevent escaping
          if (this.y + this.height >= game.height - 10) {
            this.y = game.height - this.height - 10;
          }
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
