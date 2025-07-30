import {  gameState, dog  } from "../gameState/gameState.js";

function setDogState(state) {
  gameState.dogState = state;
}

const dogImg = new Image();
const dogWidth = 64;
const dogHeight = 64;
let gameFrame = 0;
const staggerFrames = 1000;
const spriteAnimations = {};
dogImg.src = "SpaceChaserSprites/alienPrisoners/alienRukussmall.png";

const animationStates = [
  {
    name: "rightMove",
    frames: 8,
  },
  {
    name: "leftMove",
    frames: 8,
  }
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * dogWidth;
    let positionY = index * dogHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

function drawDog(ctx, globalFrame) {
  const currentAnimation = spriteAnimations[gameState.dogState];
  if (!currentAnimation) {
    console.warn(`Unknown dog state: ${gameState.dogState}`);
    gameState.dogState = "rightMove";
    return;
  }

  const position =
    Math.floor(globalFrame / staggerFrames) % currentAnimation.loc.length;

  const frameX = dogWidth * position;
  const frameY = currentAnimation.loc[position].y;

  ctx.drawImage(
    dogImg,
    frameX,
    frameY,
    dogWidth,
    dogHeight,
    dog.x - 15,
    dog.y - 10,
    50,
    50
  );
}

export {
//   setNeighborState,
  setDogState,
  drawDog,
  dogImg,
}