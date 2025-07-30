import { settings } from "../settings/settings.js";
import { cellSpots, player, dog, redBull, guardMovingProgressBar, slowDownClock } from "../gameState/gameState.js";

const playerGlovesImg = new Image();
const playerGlovesWidth = 89;
const playerGlovesHeight = 89;
const staggerFrames116 = 30;
const spriteAnimations116 = [];
playerGlovesImg.src = "";

const animationStates116 = [
  {
    name: "leftMove",
    frames: 8,
  },
  {
    name: "rightMove",
    frames: 8,
  },
];

animationStates116.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * playerGlovesWidth;
    let positionY = index * playerGlovesHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations116[state.name] = frames;
});

function animation116(ctx, globalFrame) {

    const anim = spriteAnimations116[player.state];
  if (!anim) return;

  const totalFrames = anim.loc.length;
  const position = Math.floor(globalFrame / staggerFrames116) % totalFrames;

  const frame = anim.loc[position];
  if (!frame) return;

  const frameX = frame.x;
  const frameY = frame.y;

  requestAnimationFrame(animation116);
  ctx.drawImage(
    playerGlovesImg,
    frameX,
    frameY,
    playerGlovesWidth,
    playerGlovesHeight,
    player.x - 20,
    player.y - 8,
    80,
    80
  );
}


const clockImg = new Image();
const clockWidth = 89;
const clockHeight = 89;
const staggerFrames4 = 30;
const spriteAnimations4 = [];
settings.clockState = "noMove";

const animationStates4 = [
  {
    name: "onlyMove",
    frames: 6,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates4.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * clockWidth;
    let positionY = index * clockHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations4[state.name] = frames;
});

function animation4(ctx, globalFrame) {
  const anim = spriteAnimations4[settings.clockState];
  if (!anim) return;

  const totalFrames = anim.loc.length;
  const position = Math.floor(globalFrame / staggerFrames4) % totalFrames;

  const frame = anim.loc[position];
  if (!frame) return;

  const frameX = frame.x;
  const frameY = frame.y;

  requestAnimationFrame(() => animation4(ctx, globalFrame));
  ctx.drawImage(
    clockImg,
    frameX,
    frameY,
    clockWidth,
    clockHeight,
    slowDownClock.x - 38,
    slowDownClock.y - 43,
    120,
    120
  );
}

const redBullImg = new Image();
const redBullWidth = 89;
const redBullHeight = 89;
const staggerFrames3 = 30;
const spriteAnimations3 = [];
settings.redBullState = "noMove";

const animationStates3 = [
  {
    name: "onlyMove",
    frames: 6,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates3.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * redBullWidth;
    let positionY = index * redBullHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations3[state.name] = frames;
});

function animation3(ctx, globalFrame) {
  const anim = spriteAnimations3[settings.redBullState];
  if (!anim) return; 

  const totalFrames = anim.loc.length;
  const position = Math.floor(globalFrame / staggerFrames3) % totalFrames;

  const frame = anim.loc[position];
  if (!frame) return; // frame data missing

  const frameX = frame.x;
  const frameY = frame.y;

  requestAnimationFrame(() => animation3(ctx, globalFrame));
  ctx.drawImage(
    redBullImg,
    frameX,
    frameY,
    redBullWidth,
    redBullHeight,
    redBull.x - 40,
    redBull.y - 40,
    120,
    120
  );
}


const guardMovingProgressBarImg = new Image();
const guardMovingProgressBarWidth = 800;
const guardMovingProgressBarHeight = 600;
const staggerFrames97 = 30;
const spriteAnimations97 = [];
let guardMovingProgressBarState = "move";
guardMovingProgressBarImg.src = `SpaceChaserSprites/ProgressBars/guardProgressBarOnly.png`;

const animationStates97 = [
  {
    name: "move",
    frames: 1,
  },
];

animationStates97.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * guardMovingProgressBarWidth;
    let positionY = index * guardMovingProgressBarHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations97[state.name] = frames;
});

function animation97(ctx, globalFrame) {
  const anim = spriteAnimations97[guardMovingProgressBarState];
  if (!anim) return; 

  const totalFrames = anim.loc.length;
  const position = Math.floor(globalFrame / staggerFrames97) % totalFrames;

  const frame = anim.loc[position];
  if (!frame) return; // frame data missing

  const frameX = frame.x;
  const frameY = frame.y;

  requestAnimationFrame(animation97);
  ctx.drawImage(
    guardMovingProgressBarImg,
    frameX,
    frameY,
    guardMovingProgressBarWidth,
    guardMovingProgressBarHeight,
    guardMovingProgressBar.x,
    guardMovingProgressBar.y,
    800,
    600
  );

}

const glowSpotImg = new Image();
const glowSpotWidth = 89;
const glowSpotHeight = 89;
const staggerFrames115 = 30;
const spriteAnimations115 = [];
let glowSpotState = "noMove";
glowSpotImg.src = `SpaceChaserSprites/PowerUps/cellSpotHighlightAnimation2.png`;

const animationStates115 = [
  {
    name: "noMove",
    frames: 4,
  },
];

animationStates115.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * glowSpotWidth;
    let positionY = index * glowSpotHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations115[state.name] = frames;
});

function animation115(ctx, globalFrame) {
  requestAnimationFrame(animation115);
  const anim = spriteAnimations115[settings.redBullState];
  if (!anim) return; 
  const totalFrames = anim.loc.length;
  const position = Math.floor(globalFrame / staggerFrames115) % totalFrames;
  const frame = anim.loc[position];
  if (!frame) return; 
  const frameX = frame.x;
  const frameY = frame.y;
  cellSpots.forEach((spot) => {
    if (!spot.occupied) {
      ctx.drawImage(
        glowSpotImg,
        frameX,
        frameY,
        glowSpotWidth,
        glowSpotHeight,
        spot.x - 20,
        spot.y - 20,
        89,
        89
      );
    }
  });

}

export {
  animation4,
  animation3,
  animation97,
  animation115,
  animation116,
  clockImg,
  playerGlovesImg,
  redBullImg,
};
