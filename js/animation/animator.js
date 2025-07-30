import { settings } from "../settings/settings.js";
import { drawPlayer, playerImg, playerWidth, playerHeight } from './playerAnimations.js';

import {
  // Core entities
  player,
  dog,
  dogSit,
  neighbors,
  neighborOne,
  neighborTwo,
  neighborThree,
  neighborFour,
  neighborFive,
  neighborSix,
  neighborSeven,
  neighborEight,
  neighborNine,
  cellSpots,
  neighborSpots,
  cellDoorVisible,
  cellToCellZ,
  secondSpotMap,
  homeCellMap,

  // Spots
  dogSpot2,
  n1Spot,
  n2Spot,
  n3Spot,
  n4Spot,
  n5Spot,
  n6Spot,
  n7Spot,
  n8Spot,
  n9Spot,
  waitSpot,
  cellDoorZ1,
  cellDoorZ2,
  cellDoorZ3,
  cellDoorZ4,
  cellDoorZ5,
  cellDoorZ6,
  cellDoorZ7,
  cellDoorZ8,
  cellDoorZ9,
  brokenSwitchSpot,
  rukusSwitchSpot,
  secondSpot1,
  secondSpot2,
  secondSpot3,
  secondSpot4,
  lastSpot,

  // Powerups
  redBull,
  slowDownClock,

  // Progress bars
  guardMovingProgressBar,
  rukusMovingProgressBar,

  // Game state
  gameState,
  escapedNeighbors,
  ESCAPE_X_THRESHOLD,
  // UI + DOM
  isMobile,
  isMobileLandscape,
  canvas,
  ctx,
  cWidth,
  cHeight,
  game,
  movement,
  timer,
  escapedCount,
  carryCount,
  message,
  message2,
  message3,
  boxDiv,
  gOScreen,
  scoreH2,
  urScore,
  urScore2,
  urScore3,
  urScore4,
  urScoreCon2,
  urScoreCon3,
  musicButton,
  rightArrowL,
  leftArrowL,
  upButton,
  downButton,
  leftButton,
  rightButton,
  topRightButton,
  bottomRightButton,
  topLeftButton,
  bottomLeftButton,
  topRightArrow,
  bottomRightArrow,
  topLeftArrow,
  bottomLeftArrow,
  upButtonL,
  downButtonL,
  leftButtonL,
  rightButtonL,
  topRightButtonL,
  bottomRightButtonL,
  topLeftButtonL,
  bottomLeftButtonL,
  topRightArrowL,
  bottomRightArrowL,
  topLeftArrowL,
  bottomLeftArrowL,
  music,
  butts,
  buttsLong,
  scoreBox1,
  scoreBox2,
  scoreBox3,
  scoreBox4,
  movementContainer,
  cellDoorImages,
  lastVisibleDoors,
} from "../gameState/gameState.js";


const redBullImg = new Image();
const redBullWidth = 89;
const redBullHeight = 89;
let gameFrame3 = 0;
const staggerFrames3 = 2000;
const spriteAnimations3 = [];
settings.redBullState = "noMove";

const clockImg = new Image();
const clockWidth = 89;
const clockHeight = 89;
let gameFrame4 = 0;
const staggerFrames4 = 2000;
const spriteAnimations4 = [];
settings.clockState = "noMove";

//----------------------------------------------------------

const playerGlovesImg = new Image();
const playerGlovesWidth = 89;
const playerGlovesHeight = 89;
let gameFrame116 = 0;
const staggerFrames116 = 1000;
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

// animation2 is the main function to draw the player sprite every frame
function animation116() {
  let position =
    Math.floor(gameFrame116 / staggerFrames116) %
    spriteAnimations116[player.state].loc.length;
  let frameX = playerWidth * position;
  let frameY = spriteAnimations116[player.state].loc[position].y;
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
  gameFrame116++;
}


//------------------------------------------------------------

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

function animation4() {
  let position =
    Math.floor(gameFrame4 / staggerFrames4) %
    spriteAnimations4[settings.clockState].loc.length;
  let frameX = clockWidth * position;
  let frameY = spriteAnimations4[settings.clockState].loc[position].y;
  requestAnimationFrame(animation4);
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

  gameFrame4++;
}
// -----------------------------------------------------------

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

function animation3() {
  let position =
    Math.floor(gameFrame3 / staggerFrames3) %
    spriteAnimations3[settings.redBullState].loc.length;
  let frameX = redBullWidth * position;
  let frameY = spriteAnimations3[settings.redBullState].loc[position].y;
  requestAnimationFrame(animation3);
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

  gameFrame3++;
}

// -----------------------------------------------------------

// -------------------------------------------------------------
const guardMovingProgressBarImg = new Image();
const guardMovingProgressBarWidth = 800;
const guardMovingProgressBarHeight = 600;
let gameFrame97 = 0;
const staggerFrames97 = 10000;
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

function animation97() {
  let position =
    Math.floor(gameFrame97 / staggerFrames97) %
    spriteAnimations97[guardMovingProgressBarState].loc.length;
  let frameX = guardMovingProgressBarWidth * position;
  let frameY = spriteAnimations97[guardMovingProgressBarState].loc[position].y;
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

  gameFrame97++;
}

const glowSpotImg = new Image();
const glowSpotWidth = 89;
const glowSpotHeight = 89;
let gameFrame115 = 0;
const staggerFrames115 = 1000;
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

function animation115() {
  let position =
    Math.floor(gameFrame115 / staggerFrames115) %
    spriteAnimations115[glowSpotState].loc.length;
  let frameX = glowSpotWidth * position;
  let frameY = spriteAnimations115[glowSpotState].loc[position].y;
  requestAnimationFrame(animation115);
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

  gameFrame115++;
}

// --------------------------------------------------------

export {
  animation4,
  animation3,
//   animation,
//   animation2,
  animation97,
  animation115,
  animation116,
  clockImg,
  playerGlovesImg,
//   playerImg,
  redBullImg,
  rukusMovingProgressBar,
  player,
  dog,
  dogSpot2,
  neighborOne,
  neighborTwo,
  neighborThree,
  neighborFour,
  neighborFive,
  neighborSix,
  neighborSeven,
  neighborEight,
  neighborNine,
  neighbors,
  n1Spot,
  n2Spot,
  n3Spot,
  n4Spot,
  n5Spot,
  n6Spot,
  n7Spot,
  n8Spot,
  n9Spot,
  waitSpot,
  cellDoorZ1,
  cellDoorZ2,
  cellDoorZ3,
  cellDoorZ4,
  cellDoorZ5,
  cellDoorZ6,
  cellDoorZ7,
  cellDoorZ8,
  cellDoorZ9,
  cellSpots,
  cellDoorVisible,
  brokenSwitchSpot,
  rukusSwitchSpot,
  secondSpot1,
  secondSpot2,
  secondSpot3,
  secondSpot4,
  lastSpot,
  dogSit,
  redBull,
  slowDownClock,
  guardMovingProgressBar,
};
