import { settings } from "../settings/settings.js";
import {
  // Core entities
  player
} from "../gameState/gameState.js";


const playerImg = new Image();
const playerWidth = 89;
const playerHeight = 89;
let gameFrame2 = 0;
const staggerFrames2 = 1000;
const spriteAnimations2 = [];
window.playerState = "rightMove";
playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningSmallFinal.png";


const animationStates2 = [
  {
    name: "leftMove",
    frames: 8,
  },
  {
    name: "rightMove",
    frames: 8,
  },
];

animationStates2.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * playerWidth;
    let positionY = index * playerHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations2[state.name] = frames;
});

// animation2 is the main function to draw the player sprite every frame
function animation2() {
  let position =
    Math.floor(gameFrame2 / staggerFrames2) %
    spriteAnimations2[window.playerState].loc.length;
  let frameX = playerWidth * position;
  let frameY = spriteAnimations2[window.playerState].loc[position].y;
  requestAnimationFrame(animation2);
  ctx.drawImage(
    playerImg,
    frameX,
    frameY,
    playerWidth,
    playerHeight,
    player.x - 20,
    player.y - 8,
    80,
    80
  );
  gameFrame2++;
}
