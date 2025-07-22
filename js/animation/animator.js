import { settings } from "../settings/settings.js";
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

function setNeighborState(neighborNum, state) {
  switch (neighborNum) {
    case 1:
      gameState.nbr1State = state;
      break;
    case 2:
      gameState.nbr2State = state;
      break;
    case 3:
      gameState.nbr3State = state;
      break;
    case 4:
      gameState.nbr4State = state;
      break;
    case 5:
      gameState.nbr5State = state;
      break;
    case 6:
      gameState.nbr6State = state;
      break;
    case 7:
      gameState.nbr7State = state;
      break;
    case 8:
      gameState.nbr8State = state;
      break;
    case 9:
      gameState.nbr9State = state;
      break;
    default:
      console.error("Invalid neighbor number in setNeighborState");
  }
}

function setDogState(state) {
  gameState.dogState = state;
}
function setWallTopState(state) {
  gameState.wallTopState = state;
}

function setCell7State(state) {
  gameState.cell7State = state;
}

function setRukusSwitchAnimationState(state) {
  gameState.rukusSwitchAnimationState = state;
}

function setBrokenSwitchAnimationState(state) {
  gameState.brokenSwitchAnimationState = state;
}

function setBrokenSwitch2AnimationState(state) {
  gameState.brokenSwitch2AnimationState = state;
}

function setExitSignState(state) {
  gameState.exitSignState = state;
}

const rukusSwitchAnimationImg = new Image();
const rukusSwitchAnimationWidth = 800;
const rukusSwitchAnimationHeight = 600;
let gameFrame92 = 0;
const staggerFrames92 = 4500;
const spriteAnimations92 = [];
rukusSwitchAnimationImg.src = "SpaceChaserSprites/ExitSign/rukusSwitch.png";

const animationStates92 = [
  {
    name: "noMove",
    frames: 2,
  },
];

animationStates92.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * rukusSwitchAnimationWidth;
    let positionY = index * rukusSwitchAnimationHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations92[state.name] = frames;
});

function animation92() {
  let position =
    Math.floor(gameFrame92 / staggerFrames92) %
    spriteAnimations92[gameState.rukusSwitchAnimationState].loc.length;
  let frameX =
    spriteAnimations92[gameState.rukusSwitchAnimationState].loc[position].x;
  let frameY =
    spriteAnimations92[gameState.rukusSwitchAnimationState].loc[position].y;
  ctx.drawImage(
    rukusSwitchAnimationImg,
    frameX,
    frameY,
    rukusSwitchAnimationWidth,
    rukusSwitchAnimationHeight,
    0,
    0,
    rukusSwitchAnimationWidth,
    rukusSwitchAnimationHeight
  );
  gameFrame92++;
  requestAnimationFrame(animation92);
}

const exitSignImg = new Image();
const exitSignWidth = 800;
const exitSignHeight = 600;
let gameFrame88 = 0;
const staggerFrames88 = 4500;
const spriteAnimations88 = [];
exitSignImg.src = "SpaceChaserSprites/ExitSign/exitSignGlow.png";

const animationStates88 = [
  {
    name: "move",
    frames: 3,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates88.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * exitSignWidth;
    let positionY = index * exitSignHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations88[state.name] = frames;
});

function animation88() {
  let position =
    Math.floor(gameFrame88 / staggerFrames88) %
    spriteAnimations88[gameState.exitSignState].loc.length;
  let frameX = spriteAnimations88[gameState.exitSignState].loc[position].x;
  let frameY = spriteAnimations88[gameState.exitSignState].loc[position].y;
  ctx.drawImage(
    exitSignImg,
    frameX,
    frameY,
    exitSignWidth,
    exitSignHeight,
    0,
    0,
    exitSignWidth,
    exitSignHeight
  );
  gameFrame88++;
  requestAnimationFrame(animation88);
}

const brokenSwitchAnimationImg = new Image();
const brokenSwitchAnimationWidth = 800;
const brokenSwitchAnimationHeight = 600;
let gameFrame89 = 0;
const staggerFrames89 = 400;
const spriteAnimations89 = [];
brokenSwitchAnimationImg.src =
  "SpaceChaserSprites/BrokenSwitch/brokenSwitchAnimation.png";

const animationStates89 = [
  {
    name: "move",
    frames: 3,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates89.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * brokenSwitchAnimationWidth;
    let positionY = index * brokenSwitchAnimationHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations89[state.name] = frames;
});

function animation89() {
  let position =
    Math.floor(gameFrame89 / staggerFrames89) %
    spriteAnimations89[gameState.brokenSwitchAnimationState].loc.length;
  let frameX =
    spriteAnimations89[gameState.brokenSwitchAnimationState].loc[position].x;
  let frameY =
    spriteAnimations89[gameState.brokenSwitchAnimationState].loc[position].y;
  ctx.drawImage(
    brokenSwitchAnimationImg,
    frameX,
    frameY,
    brokenSwitchAnimationWidth,
    brokenSwitchAnimationHeight,
    0,
    0,
    brokenSwitchAnimationWidth,
    brokenSwitchAnimationHeight
  );
  gameFrame89++;
  requestAnimationFrame(animation89);
}

const brokenSwitch2AnimationImg = new Image();
const brokenSwitch2AnimationWidth = 800;
const brokenSwitch2AnimationHeight = 600;
let gameFrame118 = 0;
const staggerFrames118 = 400;
const spriteAnimations118 = [];
brokenSwitch2AnimationImg.src =
  "SpaceChaserSprites/BrokenSwitch/brokenSwitchAnimationBigDoor2.png";

const animationStates118 = [
  {
    name: "move",
    frames: 3,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates118.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * brokenSwitch2AnimationWidth;
    let positionY = index * brokenSwitch2AnimationHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations118[state.name] = frames;
});

function animation118() {
  let position =
    Math.floor(gameFrame118 / staggerFrames118) %
    spriteAnimations118[gameState.brokenSwitch2AnimationState].loc.length;
  let frameX =
    spriteAnimations118[gameState.brokenSwitch2AnimationState].loc[position].x;
  let frameY =
    spriteAnimations118[gameState.brokenSwitch2AnimationState].loc[position].y;
  ctx.drawImage(
    brokenSwitch2AnimationImg,
    frameX,
    frameY,
    brokenSwitch2AnimationWidth,
    brokenSwitch2AnimationHeight,
    0,
    0,
    brokenSwitch2AnimationWidth,
    brokenSwitch2AnimationHeight
  );
  gameFrame118++;
  requestAnimationFrame(animation118);
}

const lastDoorAlarmAnimationImg = new Image();
const lastDoorAlarmAnimationWidth = 800;
const lastDoorAlarmAnimationHeight = 600;
let gameFrame93 = 0;
const staggerFrames93 = 4500;
const spriteAnimations93 = [];
lastDoorAlarmAnimationImg.src =
  "SpaceChaserSprites/LastDoor/lastDoorAlarmAnimation2.png";

const animationStates93 = [
  {
    name: "alarm",
    frames: 2,
  },
  {
    name: "closed",
    frames: 2,
  },
  {
    name: "open",
    frames: 2,
  },
];

animationStates93.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * lastDoorAlarmAnimationWidth;
    let positionY = index * lastDoorAlarmAnimationHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations93[state.name] = frames;
});

function animation93() {
  let position =
    Math.floor(gameFrame93 / staggerFrames93) %
    spriteAnimations93[settings.lastDoorAlarmAnimationState].loc.length;
  let frameX =
    spriteAnimations93[settings.lastDoorAlarmAnimationState].loc[position].x;
  let frameY =
    spriteAnimations93[settings.lastDoorAlarmAnimationState].loc[position].y;
  ctx.drawImage(
    lastDoorAlarmAnimationImg,
    frameX,
    frameY,
    lastDoorAlarmAnimationWidth,
    lastDoorAlarmAnimationHeight,
    0,
    0,
    lastDoorAlarmAnimationWidth,
    lastDoorAlarmAnimationHeight
  );
  gameFrame93++;
  requestAnimationFrame(animation93);
}

const bigDoorAlarmAnimationImg = new Image();
const bigDoorAlarmAnimationWidth = 800;
const bigDoorAlarmAnimationHeight = 600;
let gameFrame95 = 0;
const staggerFrames95 = 4500;
const spriteAnimations95 = [];
bigDoorAlarmAnimationImg.src =
  "SpaceChaserSprites/BigDoor/bigDoorAlarmAnimation4.png";

const animationStates95 = [
  {
    name: "alarm",
    frames: 2,
  },
  {
    name: "closed",
    frames: 2,
  },
  {
    name: "closedLights",
    frames: 2,
  },
  {
    name: "open",
    frames: 2,
  },
];

animationStates95.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * bigDoorAlarmAnimationWidth;
    let positionY = index * bigDoorAlarmAnimationHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations95[state.name] = frames;
});

function animation95() {
  let position =
    Math.floor(gameFrame95 / staggerFrames95) %
    spriteAnimations95[settings.bigDoorAlarmAnimationState].loc.length;
  let frameX =
    spriteAnimations95[settings.bigDoorAlarmAnimationState].loc[position].x;
  let frameY =
    spriteAnimations95[settings.bigDoorAlarmAnimationState].loc[position].y;
  ctx.drawImage(
    bigDoorAlarmAnimationImg,
    frameX,
    frameY,
    bigDoorAlarmAnimationWidth,
    bigDoorAlarmAnimationHeight,
    0,
    0,
    bigDoorAlarmAnimationWidth,
    bigDoorAlarmAnimationHeight
  );
  gameFrame95++;
  requestAnimationFrame(animation95);
}

const rukusBarImg = new Image();
const rukusBarWidth = 800;
const rukusBarHeight = 600;
let gameFrame99 = 0;
const staggerFrames99 = 10000;
const spriteAnimations99 = [];
rukusBarImg.src = "SpaceChaserSprites/ProgressBars/rukusProgressBar0.png";

const animationStates99 = [
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates99.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * rukusBarWidth;
    let positionY = index * rukusBarHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations99[state.name] = frames;
});

function animation99() {
  let position =
    Math.floor(gameFrame99 / staggerFrames99) %
    spriteAnimations99[gameState.rukusBarState].loc.length;
  let frameX = spriteAnimations99[gameState.rukusBarState].loc[position].x;
  let frameY = spriteAnimations99[gameState.rukusBarState].loc[position].y;
  ctx.drawImage(
    rukusBarImg,
    frameX,
    frameY,
    rukusBarWidth,
    rukusBarHeight,
    0,
    0,
    rukusBarWidth,
    rukusBarHeight
  );
  gameFrame99++;
  requestAnimationFrame(animation99);
}

const guardProgressBarEndCapImg = new Image();
const guardProgressBarEndCapWidth = 800;
const guardProgressBarEndCapHeight = 600;
let gameFrame110 = 0;
const staggerFrames110 = 10000;
const spriteAnimations110 = [];
guardProgressBarEndCapImg.src =
  "SpaceChaserSprites/ProgressBars/combinedEndCaps2.png";

const animationStates110 = [
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates110.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * guardProgressBarEndCapWidth;
    let positionY = index * guardProgressBarEndCapHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations110[state.name] = frames;
});

function animation110() {
  let position =
    Math.floor(gameFrame110 / staggerFrames110) %
    spriteAnimations110[gameState.guardProgressBarEndCapState].loc.length;
  let frameX =
    spriteAnimations110[gameState.guardProgressBarEndCapState].loc[position].x;
  let frameY =
    spriteAnimations110[gameState.guardProgressBarEndCapState].loc[position].y;
  ctx.drawImage(
    guardProgressBarEndCapImg,
    frameX,
    frameY,
    guardProgressBarEndCapWidth,
    guardProgressBarEndCapHeight,
    0,
    0,
    guardProgressBarEndCapWidth,
    guardProgressBarEndCapHeight
  );
  gameFrame110++;
  requestAnimationFrame(animation110);
}

const rukusMovingProgressBarImg = new Image();
const rukusMovingProgressBarWidth = 800;
const rukusMovingProgressBarHeight = 600;
let gameFrame111 = 0;
const staggerFrames111 = 10000;
const spriteAnimations111 = [];
rukusMovingProgressBarImg.src = `SpaceChaserSprites/ProgressBars/rukusProgressBarOnly.png`;

const animationStates111 = [
  {
    name: "move",
    frames: 1,
  },
];

animationStates111.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * rukusMovingProgressBarWidth;
    let positionY = index * rukusMovingProgressBarHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations111[state.name] = frames;
});

function animation111() {
  let position =
    Math.floor(gameFrame111 / staggerFrames111) %
    spriteAnimations111[gameState.rukusMovingProgressBarState].loc.length;
  let frameX = rukusMovingProgressBarWidth * position;
  let frameY =
    spriteAnimations111[gameState.rukusMovingProgressBarState].loc[position].y;
  requestAnimationFrame(animation111);
  ctx.drawImage(
    rukusMovingProgressBarImg,
    frameX,
    frameY,
    rukusMovingProgressBarWidth,
    rukusMovingProgressBarHeight,
    rukusMovingProgressBar.x,
    rukusMovingProgressBar.y,
    800,
    600
  );

  gameFrame111++;
}

const guardBarImg = new Image();
const guardBarWidth = 800;
const guardBarHeight = 600;
let gameFrame100 = 0;
const staggerFrames100 = 10000;
const spriteAnimations100 = [];
guardBarImg.src = "SpaceChaserSprites/ProgressBars/guardProgressBar0.png";

const animationStates100 = [
  {
    name: "move",
    frames: 1,
  },
];

animationStates100.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * guardBarWidth;
    let positionY = index * guardBarHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations100[state.name] = frames;
});

function animation100() {
  let position =
    Math.floor(gameFrame100 / staggerFrames100) %
    spriteAnimations100[gameState.guardBarState].loc.length;
  let frameX = spriteAnimations100[gameState.guardBarState].loc[position].x;
  let frameY = spriteAnimations100[gameState.guardBarState].loc[position].y;
  ctx.drawImage(
    guardBarImg,
    frameX,
    frameY,
    guardBarWidth,
    guardBarHeight,
    0,
    0,
    guardBarWidth,
    guardBarHeight
  );
  gameFrame100++;
  requestAnimationFrame(animation100);
}

const dogImg = new Image();
const dogWidth = 64;
const dogHeight = 64;
let gameFrame = 0;
const staggerFrames = 1000;
const spriteAnimations = [];
dogImg.src = "SpaceChaserSprites/alienPrisoners/alienRukussmall.png";

const playerImg = new Image();
const playerWidth = 89;
const playerHeight = 89;
let gameFrame2 = 0;
const staggerFrames2 = 1000;
const spriteAnimations2 = [];
window.playerState = "rightMove";
playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningSmallFinal.png";

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

const nbr9Img = new Image();
const nbr9Width = 550;
const nbr9Height = 550;
let gameFrame117 = 0;
const staggerFrames117 = 10000;
const spriteAnimations117 = [];
nbr9Img.src = `SpaceChaserSprites/alienPrisoners/bigFootGuy3.png`;

const animationStates117 = [
  {
    name: "Move",
    frames: 4,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates117.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * nbr9Width;
    let positionY = index * nbr9Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations117[state.name] = frames;
});

function animation117() {
  let position =
    Math.floor(gameFrame117 / staggerFrames117) %
    spriteAnimations117[gameState.nbr9State].loc.length;
  let frameX = nbr9Width * position;
  let frameY = spriteAnimations117[gameState.nbr9State].loc[position].y;
  requestAnimationFrame(animation117);
  ctx.drawImage(
    nbr9Img,
    frameX,
    frameY,
    nbr9Width,
    nbr9Height,
    neighborNine.x - 150,
    neighborNine.y - 450,
    550,
    550
  );

  gameFrame117++;
}
//----------------------------------------------------------

const explosionImg = new Image();
const explosionWidth = 800;
const explosionHeight = 600;
let gameFrame120 = 0;
const staggerFrames120 = 7;
const spriteAnimations120 = [];
explosionImg.src = "SpaceChaserSprites/cellDoors/cellDoorA7Explosion2.png";

const animationStates120 = [
  {
    name: "move",
    frames: 5,
  },
];

// Initialize spriteAnimations120
animationStates120.forEach((state, index) => {
  let frames = { loc: [] };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * explosionWidth;
    let positionY = index * explosionHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations120[state.name] = frames;
});

function animation120() {
  const totalFrames = spriteAnimations120[gameState.explosionState].loc.length;
  const position = Math.floor(gameFrame120 / staggerFrames120) % totalFrames;

  const frameX = spriteAnimations120[gameState.explosionState].loc[position].x;
  const frameY = spriteAnimations120[gameState.explosionState].loc[position].y;

  ctx.drawImage(
    explosionImg,
    frameX,
    frameY,
    explosionWidth,
    explosionHeight,
    0,
    0,
    explosionWidth,
    explosionHeight
  );

  if (Math.floor(gameFrame120 / staggerFrames120) < totalFrames - 1) {
    gameFrame120++;
    requestAnimationFrame(animation120);
  } else {
    gameFrame120 = 0; // reset for reuse if needed
  }
}
const nbr1Img = new Image();
const nbr1Width = 75;
const nbr1Height = 75;
let gameFrame5 = 0;
const staggerFrames5 = 10000;
const spriteAnimations5 = [];
nbr1Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner113.png`;

const nbr2Img = new Image();
const nbr2Width = 105;
const nbr2Height = 105;
let gameFrame6 = 0;
const staggerFrames6 = 10000;
const spriteAnimations6 = [];
nbr2Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner231.png`;

const nbr3Img = new Image();
const nbr3Width = 260;
const nbr3Height = 260;
let gameFrame7 = 0;
const staggerFrames7 = 10000;
const spriteAnimations7 = [];
nbr3Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner121.png`;

const nbr4Img = new Image();
const nbr4Width = 190;
const nbr4Height = 190;
let gameFrame8 = 0;
const staggerFrames8 = 10000;
const spriteAnimations8 = [];
nbr4Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner104.png`;

const nbr5Img = new Image();
const nbr5Width = 100;
const nbr5Height = 100;
let gameFrame9 = 0;
const staggerFrames9 = 10000;
const spriteAnimations9 = [];
nbr5Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner87.png`;

const nbr6Img = new Image();
const nbr6Width = 90;
const nbr6Height = 90;
let gameFrame10 = 0;
const staggerFrames10 = 10000;
const spriteAnimations10 = [];
nbr6Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner808.png`;

const nbr7Img = new Image();
const nbr7Width = 110;
const nbr7Height = 110;
let gameFrame11 = 0;
const staggerFrames11 = 10000;
const spriteAnimations11 = [];
nbr7Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner2123.png`;

const nbr8Img = new Image();
const nbr8Width = 170;
const nbr8Height = 170;
let gameFrame12 = 0;
const staggerFrames12 = 10000;
const spriteAnimations12 = [];
nbr8Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner987.png`;

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
    spriteAnimations116[window.playerState].loc.length;
  let frameX = playerWidth * position;
  let frameY = spriteAnimations116[window.playerState].loc[position].y;
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

// ------------------------------------------------------
const cell1Img = new Image();
const cell1Width = 800;
const cell1Height = 600;
let gameFrame14 = 0;
const staggerFrames14 = 10000;
const spriteAnimations14 = [];
cell1Img.src = `SpaceChaserSprites/cellDoors/cellDoorA1.png`;

const animationStates14 = [
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates14.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * cell1Width;
    let positionY = index * cell1Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations14[state.name] = frames;
});

function animation14() {
  let position =
    Math.floor(gameFrame14 / staggerFrames14) %
    spriteAnimations14[gameState.cell1State].loc.length;
  let frameX = spriteAnimations14[gameState.cell1State].loc[position].x;
  let frameY = spriteAnimations14[gameState.cell1State].loc[position].y;
  if (cellDoorVisible[1]) {
    ctx.drawImage(
      cell1Img,
      frameX,
      frameY,
      cell1Width,
      cell1Height,
      0,
      0,
      cell1Width,
      cell1Height
    );
  }
  gameFrame14++;
  requestAnimationFrame(animation14);
}

const backgroundEndCapImg = new Image();
const backgroundEndCapWidth = 1536;
const backgroundEndCapHeight = 1024;
let gameFrame112 = 0;
const staggerFrames112 = 10000;
const spriteAnimations112 = [];
backgroundEndCapImg.src =
  "SpaceChaserSprites/ProgressBars/spacePrisonBackgroundEndCaps2.png";

const animationStates112 = [
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates112.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * backgroundEndCapWidth;
    let positionY = index * backgroundEndCapHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations112[state.name] = frames;
});

function animation112() {
  let position =
    Math.floor(gameFrame112 / staggerFrames112) %
    spriteAnimations112[gameState.backgroundEndCapState].loc.length;
  let frameX =
    spriteAnimations112[gameState.backgroundEndCapState].loc[position].x;
  let frameY =
    spriteAnimations112[gameState.backgroundEndCapState].loc[position].y;
  ctx.drawImage(
    backgroundEndCapImg,
    frameX,
    frameY,
    backgroundEndCapWidth,
    backgroundEndCapHeight,
    0,
    0,
    800,
    600
  );

  gameFrame112++;
  requestAnimationFrame(animation112);
}

// --------------------------------------------------------------------------
// Wall Top Animation (cellWallTopA1.png)
const wallTopImg = new Image();
const wallTopWidth = 800;
const wallTopHeight = 600;
let gameFrame24 = 0;
const staggerFrames24 = 10000;
const spriteAnimations24 = [];
wallTopImg.src = "SpaceChaserSprites/cellDoors/cellWallTopB2.png";

const animationStates24 = [
  {
    name: "full",
    frames: 1,
  },
  {
    name: "chopped",
    frames: 1,
  },
];

animationStates24.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * wallTopWidth;
    let positionY = index * wallTopHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations24[state.name] = frames;
});

function animation24() {
  let position =
    Math.floor(gameFrame24 / staggerFrames24) %
    spriteAnimations24[gameState.wallTopState].loc.length;
  let frameX = spriteAnimations24[gameState.wallTopState].loc[position].x;
  let frameY = spriteAnimations24[gameState.wallTopState].loc[position].y;
  ctx.drawImage(
    wallTopImg,
    frameX,
    frameY,
    wallTopWidth,
    wallTopHeight,
    0,
    0,
    wallTopWidth,
    wallTopHeight
  );
  gameFrame24++;
  requestAnimationFrame(animation24);
}

// --------------------------------------------------------------------------
// Wall Bottom Animation (cellWallBottomA1.png)
const wallBottomImg = new Image();
const wallBottomWidth = 800;
const wallBottomHeight = 600;
let gameFrame25 = 0;
const staggerFrames25 = 10000;
const spriteAnimations25 = [];
wallBottomImg.src = "SpaceChaserSprites/cellDoors/cellWallBottomA1.png";

const animationStates25 = [
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates25.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * wallBottomWidth;
    let positionY = index * wallBottomHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations25[state.name] = frames;
});

function animation25() {
  let position =
    Math.floor(gameFrame25 / staggerFrames25) %
    spriteAnimations25[gameState.wallBottomState].loc.length;
  let frameX = spriteAnimations25[gameState.wallBottomState].loc[position].x;
  let frameY = spriteAnimations25[gameState.wallBottomState].loc[position].y;
  ctx.drawImage(
    wallBottomImg,
    frameX,
    frameY,
    wallBottomWidth,
    wallBottomHeight,
    0,
    0,
    wallBottomWidth,
    wallBottomHeight
  );
  gameFrame25++;
  requestAnimationFrame(animation25);
}

const cell2Img = new Image();
const cell2Width = 800;
const cell2Height = 600;
let gameFrame15 = 0;
const staggerFrames15 = 10000;
const spriteAnimations15 = [];
cell2Img.src = `SpaceChaserSprites/cellDoors/cellDoorA2.png`;

const animationStates15 = [
  {
    name: "noMove",
    frames: 1,
  },
];
animationStates15.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * cell2Width;
    let positionY = index * cell2Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations15[state.name] = frames;
});
function animation15() {
  let position =
    Math.floor(gameFrame15 / staggerFrames15) %
    spriteAnimations15[gameState.cell2State].loc.length;
  let frameX = spriteAnimations15[gameState.cell2State].loc[position].x;
  let frameY = spriteAnimations15[gameState.cell2State].loc[position].y;
  if (cellDoorVisible[2]) {
    ctx.drawImage(
      cell2Img,
      frameX,
      frameY,
      cell2Width,
      cell2Height,
      0,
      0,
      cell2Width,
      cell2Height
    );
  }
  gameFrame15++;
  requestAnimationFrame(animation15);
}

const cell3Img = new Image();
const cell3Width = 800;
const cell3Height = 600;
let gameFrame16 = 0;
const staggerFrames16 = 10000;
const spriteAnimations16 = [];
cell3Img.src = `SpaceChaserSprites/cellDoors/cellDoorA3.png`;

const animationStates16 = [
  {
    name: "noMove",
    frames: 1,
  },
];
animationStates16.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * cell3Width;
    let positionY = index * cell3Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations16[state.name] = frames;
});
function animation16() {
  let position =
    Math.floor(gameFrame16 / staggerFrames16) %
    spriteAnimations16[gameState.cell3State].loc.length;
  let frameX = spriteAnimations16[gameState.cell3State].loc[position].x;
  let frameY = spriteAnimations16[gameState.cell3State].loc[position].y;
  if (cellDoorVisible[3]) {
    ctx.drawImage(
      cell3Img,
      frameX,
      frameY,
      cell3Width,
      cell3Height,
      0,
      0,
      cell3Width,
      cell3Height
    );
  }
  gameFrame16++;
  requestAnimationFrame(animation16);
}

const cell4Img = new Image();
const cell4Width = 800;
const cell4Height = 600;
let gameFrame17 = 0;
const staggerFrames17 = 10000;
const spriteAnimations17 = [];
cell4Img.src = `SpaceChaserSprites/cellDoors/cellDoorA4.png`;

const animationStates17 = [
  {
    name: "noMove",
    frames: 1,
  },
];
animationStates17.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * cell4Width;
    let positionY = index * cell4Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations17[state.name] = frames;
});
function animation17() {
  let position =
    Math.floor(gameFrame17 / staggerFrames17) %
    spriteAnimations17[gameState.cell4State].loc.length;
  let frameX = spriteAnimations17[gameState.cell4State].loc[position].x;
  let frameY = spriteAnimations17[gameState.cell4State].loc[position].y;
  if (cellDoorVisible[4]) {
    ctx.drawImage(
      cell4Img,
      frameX,
      frameY,
      cell4Width,
      cell4Height,
      0,
      0,
      cell4Width,
      cell4Height
    );
  }
  gameFrame17++;
  requestAnimationFrame(animation17);
}

const cell5Img = new Image();
const cell5Width = 800;
const cell5Height = 600;
let gameFrame18 = 0;
const staggerFrames18 = 10000;
const spriteAnimations18 = [];
cell5Img.src = `SpaceChaserSprites/cellDoors/cellDoorA5.png`;

const animationStates18 = [
  {
    name: "noMove",
    frames: 1,
  },
];
animationStates18.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * cell5Width;
    let positionY = index * cell5Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations18[state.name] = frames;
});
function animation18() {
  let position =
    Math.floor(gameFrame18 / staggerFrames18) %
    spriteAnimations18[gameState.cell5State].loc.length;
  let frameX = spriteAnimations18[gameState.cell5State].loc[position].x;
  let frameY = spriteAnimations18[gameState.cell5State].loc[position].y;
  if (cellDoorVisible[5]) {
    ctx.drawImage(
      cell5Img,
      frameX,
      frameY,
      cell5Width,
      cell5Height,
      0,
      0,
      cell5Width,
      cell5Height
    );
  }
  gameFrame18++;
  requestAnimationFrame(animation18);
}

const cell6Img = new Image();
const cell6Width = 800;
const cell6Height = 600;
let gameFrame19 = 0;
const staggerFrames19 = 10000;
const spriteAnimations19 = [];
cell6Img.src = `SpaceChaserSprites/cellDoors/cellDoorA6.png`;

const animationStates19 = [
  {
    name: "noMove",
    frames: 1,
  },
];
animationStates19.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * cell6Width;
    let positionY = index * cell6Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations19[state.name] = frames;
});
function animation19() {
  let position =
    Math.floor(gameFrame19 / staggerFrames19) %
    spriteAnimations19[gameState.cell6State].loc.length;
  let frameX = spriteAnimations19[gameState.cell6State].loc[position].x;
  let frameY = spriteAnimations19[gameState.cell6State].loc[position].y;
  if (cellDoorVisible[6]) {
    ctx.drawImage(
      cell6Img,
      frameX,
      frameY,
      cell6Width,
      cell6Height,
      0,
      0,
      cell6Width,
      cell6Height
    );
  }
  gameFrame19++;
  requestAnimationFrame(animation19);
}

const cell7Img = new Image();
const cell7Width = 800;
const cell7Height = 600;
let gameFrame20 = 0;
const staggerFrames20 = 100000;
const spriteAnimations20 = [];
cell7Img.src = `SpaceChaserSprites/cellDoors/cellDoorA7.png`;
const animationStates20 = [
  {
    name: "noMove",
    frames: 1,
  },
  {
    name: "gone",
    frames: 1,
  },
];
animationStates20.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * cell7Width;
    let positionY = index * cell7Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations20[state.name] = frames;
});
function animation20() {
  let position =
    Math.floor(gameFrame20 / staggerFrames20) %
    spriteAnimations20[gameState.cell7State].loc.length;
  let frameX = spriteAnimations20[gameState.cell7State].loc[position].x;
  let frameY = spriteAnimations20[gameState.cell7State].loc[position].y;
  if (cellDoorVisible[7]) {
    ctx.drawImage(
      cell7Img,
      frameX,
      frameY,
      cell7Width,
      cell7Height,
      0,
      0,
      cell7Width,
      cell7Height
    );
  }
  gameFrame20++;
  requestAnimationFrame(animation20);
}

const cell8Img = new Image();
const cell8Width = 800;
const cell8Height = 600;
let gameFrame21 = 0;
const staggerFrames21 = 10000;
const spriteAnimations21 = [];
let cell8State = "noMove";
cell8Img.src = `SpaceChaserSprites/cellDoors/cellDoorA8.png`;

const animationStates21 = [
  {
    name: "noMove",
    frames: 1,
  },
];
animationStates21.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * cell8Width;
    let positionY = index * cell8Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations21[state.name] = frames;
});
function animation21() {
  let position =
    Math.floor(gameFrame21 / staggerFrames21) %
    spriteAnimations21[cell8State].loc.length;
  let frameX = spriteAnimations21[cell8State].loc[position].x;
  let frameY = spriteAnimations21[cell8State].loc[position].y;
  if (cellDoorVisible[8]) {
    ctx.drawImage(
      cell8Img,
      frameX,
      frameY,
      cell8Width,
      cell8Height,
      0,
      0,
      cell8Width,
      cell8Height
    );
  }
  gameFrame21++;
  requestAnimationFrame(animation21);
}

const cell9Img = new Image();
const cell9Width = 800;
const cell9Height = 600;
let gameFrame22 = 0;
const staggerFrames22 = 10000;
const spriteAnimations22 = [];
let cell9State = "noMove";
cell9Img.src = `SpaceChaserSprites/cellDoors/cellDoorA9.png`;

const animationStates22 = [
  {
    name: "noMove",
    frames: 1,
  },
];
animationStates22.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * cell9Width;
    let positionY = index * cell9Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations22[state.name] = frames;
});
function animation22() {
  let position =
    Math.floor(gameFrame22 / staggerFrames22) %
    spriteAnimations22[cell9State].loc.length;
  let frameX = spriteAnimations22[cell9State].loc[position].x;
  let frameY = spriteAnimations22[cell9State].loc[position].y;
  if (cellDoorVisible[9]) {
    ctx.drawImage(
      cell9Img,
      frameX,
      frameY,
      cell9Width,
      cell9Height,
      0,
      0,
      cell9Width,
      cell9Height
    );
  }
  gameFrame22++;
  requestAnimationFrame(animation22);
}

const cell10Img = new Image();
const cell10Width = 800;
const cell10Height = 600;
let gameFrame23 = 0;
const staggerFrames23 = 10000;
const spriteAnimations23 = [];
let cell10State = "noMove";
cell10Img.src = `SpaceChaserSprites/cellDoors/cellDoorA10.png`;

const animationStates23 = [
  {
    name: "noMove",
    frames: 1,
  },
];
animationStates23.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * cell10Width;
    let positionY = index * cell10Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations23[state.name] = frames;
});
function animation23() {
  let position =
    Math.floor(gameFrame23 / staggerFrames23) %
    spriteAnimations23[cell10State].loc.length;
  let frameX = spriteAnimations23[cell10State].loc[position].x;
  let frameY = spriteAnimations23[cell10State].loc[position].y;
  if (cellDoorVisible[10]) {
    ctx.drawImage(
      cell10Img,
      frameX,
      frameY,
      cell10Width,
      cell10Height,
      0,
      0,
      cell10Width,
      cell10Height
    );
  }
  gameFrame23++;
  requestAnimationFrame(animation23);
}

function animation12() {
  let position =
    Math.floor(gameFrame12 / staggerFrames12) %
    spriteAnimations12[gameState.nbr8State].loc.length;
  let frameX = nbr8Width * position;
  let frameY = spriteAnimations12[gameState.nbr8State].loc[position].y;
  requestAnimationFrame(animation12);
  ctx.drawImage(
    nbr8Img,
    frameX,
    frameY,
    nbr8Width,
    nbr8Height,
    neighborEight.x - 35,
    neighborEight.y - 35,
    123,
    123
  );

  gameFrame12++;
}

//----------------------------------------------------------------------------------------------------
const animationStates12 = [
  {
    name: "downMove",
    frames: 4,
  },
  {
    name: "upMove",
    frames: 4,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates12.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * nbr8Width;
    let positionY = index * nbr8Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations12[state.name] = frames;
});

//----------------------------------------------------------------------------------------------------
const animationStates11 = [
  {
    name: "downMove",
    frames: 5,
  },
  {
    name: "upMove",
    frames: 5,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates11.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * nbr7Width;
    let positionY = index * nbr7Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations11[state.name] = frames;
});

function animation11() {
  let position =
    Math.floor(gameFrame11 / staggerFrames11) %
    spriteAnimations11[gameState.nbr7State].loc.length;
  let frameX = nbr7Width * position;
  let frameY = spriteAnimations11[gameState.nbr7State].loc[position].y;
  requestAnimationFrame(animation11);
  ctx.drawImage(
    nbr7Img,
    frameX,
    frameY,
    nbr7Width,
    nbr7Height,
    neighborSeven.x - 15,
    neighborSeven.y - 10,
    85,
    85
  );

  gameFrame11++;
}

//----------------------------------------------------------------------------------------------------
const animationStates10 = [
  {
    name: "downMove",
    frames: 4,
  },
  {
    name: "upMove",
    frames: 4,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates10.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * nbr6Width;
    let positionY = index * nbr6Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations10[state.name] = frames;
});

function animation10() {
  let position =
    Math.floor(gameFrame10 / staggerFrames10) %
    spriteAnimations10[gameState.nbr6State].loc.length;
  let frameX = nbr6Width * position;
  let frameY = spriteAnimations10[gameState.nbr6State].loc[position].y;
  requestAnimationFrame(animation10);
  ctx.drawImage(
    nbr6Img,
    frameX,
    frameY,
    nbr6Width,
    nbr6Height,
    neighborSix.x - 5,
    neighborSix.y - 5,
    75,
    75
  );

  gameFrame10++;
}

//-------------------------------------------------------------------------------------------

const animationStates9 = [
  {
    name: "downMove",
    frames: 4,
  },
  {
    name: "upMove",
    frames: 4,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates9.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * nbr5Width;
    let positionY = index * nbr5Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations9[state.name] = frames;
});

function animation9() {
  let position =
    Math.floor(gameFrame9 / staggerFrames9) %
    spriteAnimations9[gameState.nbr5State].loc.length;
  let frameX = nbr5Width * position;
  let frameY = spriteAnimations9[gameState.nbr5State].loc[position].y;
  requestAnimationFrame(animation9);
  ctx.drawImage(
    nbr5Img,
    frameX,
    frameY,
    nbr5Width,
    nbr5Height,
    neighborFive.x - 20,
    neighborFive.y - 20,
    85,
    85
  );

  gameFrame9++;
}

//------------------------------------------------------------------------------------------
const animationStates8 = [
  {
    name: "downMove",
    frames: 4,
  },
  {
    name: "upMove",
    frames: 4,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates8.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * nbr4Width;
    let positionY = index * nbr4Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations8[state.name] = frames;
});

function animation8() {
  let position =
    Math.floor(gameFrame8 / staggerFrames8) %
    spriteAnimations8[gameState.nbr4State].loc.length;
  let frameX = nbr4Width * position;
  let frameY = spriteAnimations8[gameState.nbr4State].loc[position].y;
  requestAnimationFrame(animation8);
  ctx.drawImage(
    nbr4Img,
    frameX,
    frameY,
    nbr4Width,
    nbr4Height,
    neighborFour.x - 15,
    neighborFour.y - 10,
    100,
    100
  );

  gameFrame8++;
}

//---------------------------------------------------------------------
const animationStates7 = [
  {
    name: "downMove",
    frames: 8,
  },
  {
    name: "upMove",
    frames: 8,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates7.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * nbr3Width;
    let positionY = index * nbr3Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations7[state.name] = frames;
});

function animation7() {
  let position =
    Math.floor(gameFrame7 / staggerFrames7) %
    spriteAnimations7[gameState.nbr3State].loc.length;
  let frameX = nbr3Width * position;
  let frameY = spriteAnimations7[gameState.nbr3State].loc[position].y;
  requestAnimationFrame(animation7);
  ctx.drawImage(
    nbr3Img,
    frameX,
    frameY,
    nbr3Width,
    nbr3Height,
    neighborThree.x - 23,
    neighborThree.y - 15,
    89,
    89
  );

  gameFrame7++;
}

//------------------------------------------------------------------------

const animationStates6 = [
  {
    name: "downMove",
    frames: 4,
  },
  {
    name: "upMove",
    frames: 4,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates6.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * nbr2Width;
    let positionY = index * nbr2Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations6[state.name] = frames;
});

function animation6() {
  let position =
    Math.floor(gameFrame6 / staggerFrames6) %
    spriteAnimations6[gameState.nbr2State].loc.length;
  let frameX = nbr2Width * position;
  let frameY = spriteAnimations6[gameState.nbr2State].loc[position].y;
  requestAnimationFrame(animation6);
  ctx.drawImage(
    nbr2Img,
    frameX,
    frameY,
    nbr2Width,
    nbr2Height,
    neighborTwo.x - 15,
    neighborTwo.y - 5,
    80,
    80
  );

  gameFrame6++;
}
//--------------------------------------------------------------

const animationStates5 = [
  {
    name: "downMove",
    frames: 4,
  },
  {
    name: "upMove",
    frames: 4,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates5.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * nbr1Width;
    let positionY = index * nbr1Height;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations5[state.name] = frames;
});

function animation5() {
  let position =
    Math.floor(gameFrame5 / staggerFrames5) %
    spriteAnimations5[gameState.nbr1State].loc.length;
  let frameX = nbr1Width * position;
  let frameY = spriteAnimations5[gameState.nbr1State].loc[position].y;
  requestAnimationFrame(animation5);
  ctx.drawImage(
    nbr1Img,
    frameX,
    frameY,
    nbr1Width,
    nbr1Height,
    neighborOne.x - 5,
    neighborOne.y - 5,
    80,
    80
  );

  gameFrame5++;
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

const animationStates = [
  {
    name: "rightMove",
    frames: 8,
  },
  {
    name: "leftMove",
    frames: 8,
  },
  {
    name: "sit",
    frames: 1,
  },
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

function animation() {
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[gameState.dogState].loc.length;
  let frameX = dogWidth * position;
  let frameY = spriteAnimations[gameState.dogState].loc[position].y;
  requestAnimationFrame(animation);
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

  gameFrame++;
}
// -------------------------------------------------------------
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
  animation111,
  animation92,
  animation88,
  animation89,
  animation118,
  animation93,
  animation95,
  animation99,
  animation110,
  animation100,
  animation117,
  animation120,
  animation14,
  animation112,
  animation24,
  animation25,
  animation15,
  animation16,
  animation17,
  animation18,
  animation19,
  animation20,
  animation21,
  animation22,
  animation23,
  animation12,
  animation11,
  animation10,
  animation9,
  animation8,
  animation7,
  animation6,
  animation5,
  animation4,
  animation3,
  animation,
  animation2,
  animation97,
  animation115,
  animation116,
  clockImg,
  playerGlovesImg,
  playerImg,
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
  setNeighborState,
  setDogState,
  setWallTopState,
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
  setCell7State,
  cellDoorVisible,
  brokenSwitchSpot,
  rukusSwitchSpot,
  setRukusSwitchAnimationState,
  setBrokenSwitchAnimationState,
  setBrokenSwitch2AnimationState,
  setExitSignState,
  secondSpot1,
  secondSpot2,
  secondSpot3,
  secondSpot4,
  cell7Img,
  lastSpot,
  dogSit,
  redBull,
  slowDownClock,
  guardMovingProgressBar,
};
