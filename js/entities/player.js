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

        // --- Adaptive speed multiplier with startup calibration ---
        // Estimate FPS from dt
        const fps = dt > 0 ? (1 / dt) : 60;

        // Heuristic mobile detection (prefer a flag if you already have one)
        const looksMobile = !!(gameState.isMobile || (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)));
        const mobileBoost = looksMobile ? 1. : 1.0; // slightly larger baseline bump on mobile

        // Heuristic Safari detection
        const isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const safariBoost = isSafari ? 2.2 : 1.0; // extra bump on Safari

        // Calibrate once at startup to avoid run-to-run variance
        if (!gameState._playerCalibStart) {
          gameState._playerCalibStart = (typeof performance !== 'undefined' ? performance.now() : Date.now());
          gameState._playerFpsSum = 0;
          gameState._playerFpsCount = 0;
        }

        let fixedMult = gameState._playerSpeedMultFixed;

        if (typeof fixedMult !== 'number') {
          // Accumulate FPS samples
          gameState._playerFpsSum += fps;
          gameState._playerFpsCount += 1;

          const nowTs = (typeof performance !== 'undefined' ? performance.now() : Date.now());
          const elapsed = (nowTs - gameState._playerCalibStart) / 1000; // seconds

          if (elapsed >= 0.75 && gameState._playerFpsCount > 0) {
            const avgFps = gameState._playerFpsSum / gameState._playerFpsCount;
            const lowFpsBoost = Math.min(Math.max(60 / Math.max(avgFps, 1), 1), 1.75);
            const mult = lowFpsBoost * mobileBoost * safariBoost;
            // Quantize for stability across reloads
            fixedMult = Math.round(mult * 100) / 100; // 2 decimals
            gameState._playerSpeedMultFixed = fixedMult;
          }
        }

        // Use fixed multiplier if available; otherwise use a provisional smoothed value
        let speedMult;
        if (typeof gameState._playerSpeedMultFixed === 'number') {
          speedMult = gameState._playerSpeedMultFixed;
        } else {
          const lowFpsBoost = Math.min(Math.max(60 / Math.max(fps, 1), 1), 1.75);
          const provisional = lowFpsBoost * mobileBoost * safariBoost;
          const prev = typeof gameState._playerSpeedMult === 'number' ? gameState._playerSpeedMult : 1;
          speedMult = prev + (provisional - prev) * 0.2; // light smoothing while calibrating
          gameState._playerSpeedMult = speedMult;
        }

        // Convert legacy per-frame speed (7.5 px/frame @ 60 FPS) to px/sec
        const basePxPerSec = this.speed * 60; // 7.5 * 60 = 450 px/sec
        const step = basePxPerSec * dt * speedMult;

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
