import { settings } from "../settings/settings.js";
import {  player
} from "../gameState/gameState.js";


const playerImg = new Image();
const playerWidth = 89;
const playerHeight = 89;
let gameFrame2 = 0;
const staggerFrames2 = 10;
const spriteAnimations2 = {};
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

player.state = "rightMove";

function drawPlayer(ctx, globalFrame) {

  const currentAnimation = spriteAnimations2[player.state];

  // console.log("player.state:", player.state);
  // console.log("spriteAnimations2:", spriteAnimations2);
  // console.log("currentAnimation.loc:", currentAnimation?.loc);
  const position = Math.floor(globalFrame / staggerFrames2) % currentAnimation.loc.length;
  // console.log("position:", position);
  if (!currentAnimation) {
    console.warn(`Unknown player state: ${player.state}. Falling back to "rightMove".`);
    player.state = "rightMove";
    return;
  }

  const frameX = playerWidth * position;
  const frameY = currentAnimation.loc[position].y;



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
}

export { drawPlayer, playerImg, playerWidth, playerHeight};