// Ensures triggerEventAfterDelay is called only once per session
let hasTriggeredEvent = false;
import { Dad } from "./entities/player.js";
import { Dog } from "./entities/dog.js";
import { Neighbor } from "./entities/neighbor.js";
import { PowerUps } from "./entities/powerUps.js";
import { CellDoorZ } from "./entities/cellDoorZ.js";
import { ProgressBar } from "./entities/progressBar.js";
import { gameLoop } from "./core/gameLoop.js";

// Preload cell door images (1-10) into cellDoorImages[] array
const cellDoorImages = [];
for (let i = 1; i <= 10; i++) {
  const img = new Image();
  img.src = `./SpaceChaserSprites/cellDoors/cellDoor${i}.png`;
  img.onerror = () => {
    console.warn(`Image failed to load: cellDoor${i}.png`);
  };
  cellDoorImages[i] = img;
}
// Canvas-based cell doors
let gameStarted = false;
const game = document.getElementById("canvas");
let controlsEnabled = false;

// Cell door visibility array [1..10], index 0 unused for 1-based indexing
const cellDoorVisible = Array(11).fill(false);

// CellDoor animation function factory: returns object with drawFrame(ctx)
function cellDoorAnimation(i) {
  return {
    drawFrame(ctx) {
      if (cellDoorVisible[i] && cellDoorImages[i]) {
        ctx.drawImage(cellDoorImages[i], 0, 0, game.width, game.height);
      }
    },
  };
}

function showInitialCellDoors() {
  // Hide all cell doors first
  for (let i = 1; i <= 10; i++) cellDoorVisible[i] = false;
  // Show doors 4 and 7 as initially visible
  cellDoorVisible[4] = true;
  cellDoorVisible[7] = true;
}

// No more CellDoor class or instances needed; cellDoorAnimation(i) + cellDoorVisible[i] replaces them.

// Sync cell door visibility to cellDoorZ.alive state every frame
export function syncCellDoorVisibility() {
  // Map: [cellDoor index] = !cellDoorZX.alive
  cellDoorVisible[10] = !cellDoorZ1.alive;
  cellDoorVisible[9] = !cellDoorZ2.alive;
  cellDoorVisible[8] = !cellDoorZ3.alive;
  cellDoorVisible[6] = !cellDoorZ4.alive;
  cellDoorVisible[1] = !cellDoorZ5.alive;
  cellDoorVisible[2] = !cellDoorZ6.alive;
  cellDoorVisible[3] = !cellDoorZ7.alive;
  cellDoorVisible[5] = !cellDoorZ8.alive;
  cellDoorVisible[11] = !cellDoorZ9.alive;
  // cellDoorVisible[4] and [7] are set by showInitialCellDoors and not toggled here.
}

let lastVisibleDoors = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

export const settings = {
  dogSpeed: 5,
  neighborSpeed: 3,
  redBullState: "onlyMove",
  clockState: "onlyMove",
  clockState2: "move",
  guardWearingGloves: false,
  guardWearingBoots: false,
  guardProgress: 42,
  rukusProgress: 0,
  bigDoorAlarmAnimationState: "closedLights",
  lastDoorAlarmAnimationState: "closed",
  guardBootsColor: "none",
  guardGlovesColor: "none",
  glovesColor: "blue",
  bootsColor: "blue",
  stopped: false,
  isMusicPlaying: true,
};

const isMobile = window.innerWidth <= 500;
const isMobileLandscape = window.innerWidth > 500 && window.innerWidth <= 1300;
function removeContainerTopPadding() {
  const container = document.getElementById("container");
  if (container) {
    container.style.paddingTop = "0";
    container.style.backgroundImage = "none";
    if (isMobile || isMobileLandscape) {
      boxDiv.style.display = "flex";
    }
  }
}
// ======= Insert after your DOM grabs =======
const scoreUI = document.createElement("div");
scoreUI.id = "scoreUI";
scoreUI.style.display = "flex";
scoreUI.style.background = "rgba(0,0,0,1)";
scoreUI.style.color = "white";
scoreUI.style.fontFamily = "monospace";
scoreUI.style.fontSize = "4vw";
scoreUI.style.display = "none";
(scoreUI.style.fontFamily = "DigitalNormal"), "monospace";
scoreUI.style.color = "darkRed";
scoreUI.style.position = "absolute";
scoreUI.style.zIndex = "10";

// Create score boxes
const scores = ["00:00", "00:00", "00:00", "00:00"];

scores.forEach((text, index) => {
  const box = document.createElement("div");
  box.textContent = text;
  box.id = `scoreBox${index + 1}`;
  box.style.textAlign = "center";
  box.style.padding = "8px 0";
  scoreUI.appendChild(box);
});

// Placement based on orientation
if (isMobileLandscape) {
  scoreUI.style.fontSize = "1.5vw";
  scoreUI.style.flexDirection = "row";
  scoreUI.style.top = "0";
  scoreUI.style.left = "0";
  scoreUI.style.width = "35vw";
  scoreUI.style.gap = "18px";
  scoreUI.style.justifyContent = "space-evenly";
  scoreUI.style.boarder = "5px solid black";

  // Remove width stretch for landscape
  document.body.appendChild(scoreUI);

  // Adjust movement buttons to horizontal
  const movementContainer = document.getElementById("mobile-controls");
  if (movementContainer) {
    movementContainer.style.display = "flex";
    movementContainer.style.flexDirection = "row";
    movementContainer.style.flexWrap = "wrap";
    movementContainer.style.justifyContent = "center";
    movementContainer.style.alignItems = "center";
    movementContainer.style.width = "100%";
  }
} else if (isMobile) {
  scoreUI.style.flexDirection = "row";
  scoreUI.style.position = "relative";
  scoreUI.style.gap = "18px";
  scoreUI.style.justifyContent = "space-evenly";
  scoreUI.style.width = "99%"; // only stretch in portrait
  const container = document.getElementById("container");
  container.parentNode.insertBefore(scoreUI, container.nextSibling);

  // Movement buttons vertical in portrait
  const movementContainer = document.getElementById("mobile-controls");
  if (movementContainer) {
    movementContainer.style.display = "flex";
    movementContainer.style.flexDirection = "column";
    movementContainer.style.justifyContent = "center";
    movementContainer.style.alignItems = "center";
    movementContainer.style.width = "auto";
  }
}
const boxDiv = document.getElementById("boxDiv");

const musicButton = document.getElementById("musicButton");
const rightArrowL = document.getElementById("rightArrowL");
const leftArrowL = document.getElementById("leftArrowL");
const canvas = document.getElementById("canvas");
const movement = document.getElementById("movement");
const timer = document.getElementById("timer");
const escapedCount = document.getElementById("escapedCount");
const carryCount = document.getElementById("carryCount");
const message = document.getElementById("status");
const message3 = document.getElementById("status3");
const message2 = document.getElementById("status2");
const gOScreen = document.getElementById("game-over-screen");
const scoreH2 = document.getElementById("score-h2");
const urScore = document.getElementById("urScore");
const urScore3 = document.getElementById("urScore3");
const urScoreCon3 = document.getElementById("urScoreCon3");
const urScoreCon2 = document.getElementById("urScoreCon2");
const urScore4 = document.getElementById("urScore4");
const urScore2 = document.getElementById("urScore2");
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const topRightButton = document.getElementById("topRightButton");
const bottomRightButton = document.getElementById("bottomRightButton");
const topLeftButton = document.getElementById("topLeftButton");
const bottomLeftButton = document.getElementById("bottomLeftButton");
const topRightArrow = document.getElementById("topRightArrow");
const bottomRightArrow = document.getElementById("bottomRightArrow");
const topLeftArrow = document.getElementById("topLeftArrow");
const bottomLeftArrow = document.getElementById("bottomLeftArrow");
const upButtonL = document.getElementById("upButtonL");
const downButtonL = document.getElementById("downButtonL");
const leftButtonL = document.getElementById("leftButtonL");
const rightButtonL = document.getElementById("rightButtonL");
const topRightButtonL = document.getElementById("topRightButtonL");
const bottomRightButtonL = document.getElementById("bottomRightButtonL");
const topLeftButtonL = document.getElementById("topLeftButtonL");
const bottomLeftButtonL = document.getElementById("bottomLeftButtonL");
const topRightArrowL = document.getElementById("topRightArrowL");
const bottomRightArrowL = document.getElementById("bottomRightArrowL");
const topLeftArrowL = document.getElementById("topLeftArrowL");
const bottomLeftArrowL = document.getElementById("bottomLeftArrowL");
const music = document.getElementById("music");
const butts = document.getElementsByClassName("butts");
const buttsLong = document.getElementsByClassName("buttsLong");

const scoreBox1 = document.getElementById("scoreBox1");
const scoreBox2 = document.getElementById("scoreBox2");
const scoreBox3 = document.getElementById("scoreBox3");
const scoreBox4 = document.getElementById("scoreBox4");

function play() {
  music.play();
  music.volume = 0.009;
}

function pause() {
  music.pause();
}

const ctx = game.getContext("2d");
const cWidth = (game.width = 800);
const cHeight = (game.height = 600);
let score = 2;
let redLife = 0;
let gameOn = false;
let gameOver = false;
let escapedCountNum = 0;

const rukusSwitchAnimationImg = new Image();
const rukusSwitchAnimationWidth = 800;
const rukusSwitchAnimationHeight = 600;
let gameFrame92 = 0;
const staggerFrames92 = 4500;
const spriteAnimations92 = [];
let rukusSwitchAnimationState = "noMove";
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
    spriteAnimations92[rukusSwitchAnimationState].loc.length;
  let frameX = spriteAnimations92[rukusSwitchAnimationState].loc[position].x;
  let frameY = spriteAnimations92[rukusSwitchAnimationState].loc[position].y;
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
let exitSignState = "noMove";
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
    spriteAnimations88[exitSignState].loc.length;
  let frameX = spriteAnimations88[exitSignState].loc[position].x;
  let frameY = spriteAnimations88[exitSignState].loc[position].y;
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
let brokenSwitchAnimationState = "noMove";
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
    spriteAnimations89[brokenSwitchAnimationState].loc.length;
  let frameX = spriteAnimations89[brokenSwitchAnimationState].loc[position].x;
  let frameY = spriteAnimations89[brokenSwitchAnimationState].loc[position].y;
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
let brokenSwitch2AnimationState = "noMove";
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
    spriteAnimations118[brokenSwitch2AnimationState].loc.length;
  let frameX = spriteAnimations118[brokenSwitch2AnimationState].loc[position].x;
  let frameY = spriteAnimations118[brokenSwitch2AnimationState].loc[position].y;
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
let rukusBarState = "noMove";
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
    spriteAnimations99[rukusBarState].loc.length;
  let frameX = spriteAnimations99[rukusBarState].loc[position].x;
  let frameY = spriteAnimations99[rukusBarState].loc[position].y;
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
let guardProgressBarEndCapState = "noMove";
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
    spriteAnimations110[guardProgressBarEndCapState].loc.length;
  let frameX = spriteAnimations110[guardProgressBarEndCapState].loc[position].x;
  let frameY = spriteAnimations110[guardProgressBarEndCapState].loc[position].y;
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
let rukusMovingProgressBarState = "move";
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
    spriteAnimations111[rukusMovingProgressBarState].loc.length;
  let frameX = rukusMovingProgressBarWidth * position;
  let frameY = spriteAnimations111[rukusMovingProgressBarState].loc[position].y;
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
let guardBarState = "move";
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
    spriteAnimations100[guardBarState].loc.length;
  let frameX = spriteAnimations100[guardBarState].loc[position].x;
  let frameY = spriteAnimations100[guardBarState].loc[position].y;
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
let dogState = "leftMove";
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
let nbr9State = "Move";
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
    spriteAnimations117[nbr9State].loc.length;
  let frameX = nbr9Width * position;
  let frameY = spriteAnimations117[nbr9State].loc[position].y;
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
let explosionState = "move";
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
  const totalFrames = spriteAnimations120[explosionState].loc.length;
  const position = Math.floor(gameFrame120 / staggerFrames120) % totalFrames;

  const frameX = spriteAnimations120[explosionState].loc[position].x;
  const frameY = spriteAnimations120[explosionState].loc[position].y;

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
let nbr1State = "noMove";
nbr1Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner113.png`;

const nbr2Img = new Image();
const nbr2Width = 105;
const nbr2Height = 105;
let gameFrame6 = 0;
const staggerFrames6 = 10000;
const spriteAnimations6 = [];
let nbr2State = "noMove";
nbr2Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner231.png`;

const nbr3Img = new Image();
const nbr3Width = 260;
const nbr3Height = 260;
let gameFrame7 = 0;
const staggerFrames7 = 10000;
const spriteAnimations7 = [];
let nbr3State = "noMove";
nbr3Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner121.png`;

const nbr4Img = new Image();
const nbr4Width = 190;
const nbr4Height = 190;
let gameFrame8 = 0;
const staggerFrames8 = 10000;
const spriteAnimations8 = [];
let nbr4State = "noMove";
nbr4Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner104.png`;

const nbr5Img = new Image();
const nbr5Width = 100;
const nbr5Height = 100;
let gameFrame9 = 0;
const staggerFrames9 = 10000;
const spriteAnimations9 = [];
let nbr5State = "noMove";
nbr5Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner87.png`;

const nbr6Img = new Image();
const nbr6Width = 90;
const nbr6Height = 90;
let gameFrame10 = 0;
const staggerFrames10 = 10000;
const spriteAnimations10 = [];
let nbr6State = "noMove";
nbr6Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner808.png`;

const nbr7Img = new Image();
const nbr7Width = 110;
const nbr7Height = 110;
let gameFrame11 = 0;
const staggerFrames11 = 10000;
const spriteAnimations11 = [];
let nbr7State = "noMove";
nbr7Img.src = `SpaceChaserSprites/alienPrisoners/alienPrisoner2123.png`;

const nbr8Img = new Image();
const nbr8Width = 170;
const nbr8Height = 170;
let gameFrame12 = 0;
const staggerFrames12 = 10000;
const spriteAnimations12 = [];
let nbr8State = "noMove";
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
let cell1State = "noMove";
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
    spriteAnimations14[cell1State].loc.length;
  let frameX = spriteAnimations14[cell1State].loc[position].x;
  let frameY = spriteAnimations14[cell1State].loc[position].y;
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
let backgroundEndCapState = "noMove";
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
    spriteAnimations112[backgroundEndCapState].loc.length;
  let frameX = spriteAnimations112[backgroundEndCapState].loc[position].x;
  let frameY = spriteAnimations112[backgroundEndCapState].loc[position].y;
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
let wallTopState = "full";
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
    spriteAnimations24[wallTopState].loc.length;
  let frameX = spriteAnimations24[wallTopState].loc[position].x;
  let frameY = spriteAnimations24[wallTopState].loc[position].y;
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
let wallBottomState = "noMove";
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
    spriteAnimations25[wallBottomState].loc.length;
  let frameX = spriteAnimations25[wallBottomState].loc[position].x;
  let frameY = spriteAnimations25[wallBottomState].loc[position].y;
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
let cell2State = "noMove";
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
    spriteAnimations15[cell2State].loc.length;
  let frameX = spriteAnimations15[cell2State].loc[position].x;
  let frameY = spriteAnimations15[cell2State].loc[position].y;
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
let cell3State = "noMove";
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
    spriteAnimations16[cell3State].loc.length;
  let frameX = spriteAnimations16[cell3State].loc[position].x;
  let frameY = spriteAnimations16[cell3State].loc[position].y;
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
let cell4State = "noMove";
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
    spriteAnimations17[cell4State].loc.length;
  let frameX = spriteAnimations17[cell4State].loc[position].x;
  let frameY = spriteAnimations17[cell4State].loc[position].y;
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
let cell5State = "noMove";
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
    spriteAnimations18[cell5State].loc.length;
  let frameX = spriteAnimations18[cell5State].loc[position].x;
  let frameY = spriteAnimations18[cell5State].loc[position].y;
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
let cell6State = "noMove";
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
    spriteAnimations19[cell6State].loc.length;
  let frameX = spriteAnimations19[cell6State].loc[position].x;
  let frameY = spriteAnimations19[cell6State].loc[position].y;
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
let cell7State = "noMove";
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
    spriteAnimations20[cell7State].loc.length;
  let frameX = spriteAnimations20[cell7State].loc[position].x;
  let frameY = spriteAnimations20[cell7State].loc[position].y;
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
    spriteAnimations12[nbr8State].loc.length;
  let frameX = nbr8Width * position;
  let frameY = spriteAnimations12[nbr8State].loc[position].y;
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
    spriteAnimations11[nbr7State].loc.length;
  let frameX = nbr7Width * position;
  let frameY = spriteAnimations11[nbr7State].loc[position].y;
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
    spriteAnimations10[nbr6State].loc.length;
  let frameX = nbr6Width * position;
  let frameY = spriteAnimations10[nbr6State].loc[position].y;
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
    spriteAnimations9[nbr5State].loc.length;
  let frameX = nbr5Width * position;
  let frameY = spriteAnimations9[nbr5State].loc[position].y;
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
    spriteAnimations8[nbr4State].loc.length;
  let frameX = nbr4Width * position;
  let frameY = spriteAnimations8[nbr4State].loc[position].y;
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
    spriteAnimations7[nbr3State].loc.length;
  let frameX = nbr3Width * position;
  let frameY = spriteAnimations7[nbr3State].loc[position].y;
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
    spriteAnimations6[nbr2State].loc.length;
  let frameX = nbr2Width * position;
  let frameY = spriteAnimations6[nbr2State].loc[position].y;
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
    spriteAnimations5[nbr1State].loc.length;
  let frameX = nbr1Width * position;
  let frameY = spriteAnimations5[nbr1State].loc[position].y;
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
    spriteAnimations[dogState].loc.length;
  let frameX = dogWidth * position;
  let frameY = spriteAnimations[dogState].loc[position].y;
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

const toggleScreen = (id, toggle) => {
  let element = document.getElementById(id);
  let display = toggle ? (id === "canvas" ? "block" : "flex") : "none";
  element.style.display = display;
};

function refreshPage() {
  window.location.reload();
}

window.refreshPage = refreshPage;

function playerEnters() {
  player.speed = 3;
  player.setDirection("d");
  setTimeout(() => {
    player.speed = 5;
    player.unsetDirection("d");
    controlsEnabled = true;
  }, 1500);
}

function dogFast() {
  setTimeout(() => {
    settings.dogSpeed = 5;
  }, 1200);
}

function endScene() {
  controlsEnabled = false;
  setTimeout(() => {
    gameOverWin();
    stopCountUpTimer();
    window.allowOffScreen = false;
  }, 5000);
}

// Adjusted isMobile logic and added mobileLandscape

let endSceneStarted = false;

const startGame = () => {
  gameStarted = true;
  removeContainerTopPadding();
  scoreUI.style.display = "flex";

  if (!hasTriggeredEvent) {
    hasTriggeredEvent = true;
    setTimeout(() => {
      animation120(); // plays explosion animation
      triggeredEvent = true;
      lastSpot.alive = true;
      wallTopState = "chopped";
      cell7State = "gone";
      setTimeout(() => {
        cell7Img.src = `SpaceChaserSprites/CellDoors/cellDoorA7FinalForm.png`;
        wallTopState = "full";
        cell7State = "noMove";
        dogFast();
      }, 1200); // swap image half a second later
    }, 3000); // wait 3 seconds after game starts
  }
  window.allowOffScreen = true; // at the start of your game
  toggleScreen("start-screen", false);
  toggleScreen("musicButton", true);
  toggleScreen("game-over-screen", false);
  toggleScreen("canvas", true);
  toggleScreen("ui-overlay", !(isMobile || isMobileLandscape));
  toggleScreen("movement", !(isMobile || isMobileLandscape));
  toggleScreen("escapedCount", !(isMobile || isMobileLandscape));
  toggleScreen("carryCount", !(isMobile || isMobileLandscape));
  toggleScreen("timer", !(isMobile || isMobileLandscape));

  play();
  gameOn = true;
  gameOver = false;
  startCountUpTimer(timer);

  showInitialCellDoors();
  gameInterval;
};

const gameOverWin = () => {
  toggleScreen("musicButton", false);
  stopGameLoop();
  toggleScreen("start-screen", false);
  toggleScreen("game-over-screen-win", true);
  toggleScreen("canvas", false);
  toggleScreen("top-left", false);
  toggleScreen("top-right", false);
  toggleScreen("btm-left", false);
  toggleScreen("btm-right", false);
  toggleScreenCon("urScoreCon3", false);
  toggleScreenCon("urScoreCon2", false);
  toggleScreenCon("status", false);
  toggleScreenCon("status2", false);
  pause();
  gameOn = false;
  gameOver = true;
  hideAllCellDoors();
};

const gameOverLoose = () => {
  stopGameLoop();
  toggleScreen("musicButton", false);
  gameOn = false;
  gameOver = true;
  stopCountUpTimer();
  pauseCountUpTimer();
  toggleScreen("start-screen", false);
  toggleScreen("game-over-screen", true);
  toggleScreen("canvas", false);
  toggleScreen("top-left", false);
  toggleScreen("btm-right", false);
  pause();
  hideAllCellDoors();
};

// Function to hide all cell door overlays
function hideAllCellDoors() {
  for (let i = 1; i <= 10; i++) cellDoorVisible[i] = false;
}

// places ogres at random spots in the horizontal direction
// const randomPlaceShrekX = (max) => {
//     // we can use math random and canvas dimensions for this
//     return Math.floor(Math.random() * max)
// }
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

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////c
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////o
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
const player = new Dad(-80, 230, "lightsteelblue", 40, 70);
const dog = new Dog(600, 40, "green", 25, 35, true);
const dogSpot2 = new CellDoorZ(596, 126, "green", 10, 10);
const neighborOne = new Neighbor(200, 20, "blue", 60, 65);
const neighborTwo = new Neighbor(300, 20, "green", 50, 75);
const neighborThree = new Neighbor(450, 20, "yellow", 45, 60);
const neighborFour = new Neighbor(700, 20, "cyan", 65, 85);
const neighborFive = new Neighbor(100, 560, "red", 45, 45);
const neighborSix = new Neighbor(350, 560, "brown", 60, 65);
const neighborSeven = new Neighbor(500, 570, "grey", 55, 70);
const neighborEight = new Neighbor(700, 580, "black", 50, 50);
const neighborNine = new Neighbor(930, 200, "purple", 270, 70);
const n1Spot = new CellSpot(160, 30, "#bada55", 32, 48, false);
const n2Spot = new CellSpot(300, 30, "#bada55", 32, 48);
const n3Spot = new CellSpot(450, 40, "#bada55", 32, 48);
const n4Spot = new CellSpot(700, 40, "#bada55", 32, 48);
const n5Spot = new CellSpot(30, 450, "#bada55", 32, 48);
const n6Spot = new CellSpot(250, 450, "#bada55", 32, 48);
const n7Spot = new CellSpot(450, 500, "#bada55", 32, 48);
const n8Spot = new CellSpot(700, 470, "#bada55", 32, 48);
const n9Spot = new CellSpot(795, 200, "#bada55", 10, 10);
const waitSpot = new CellSpot(990, 200, "#bada55", 10, 10);
const cellDoorZ1 = new CellDoorZ(140, 175, "green", 56, 10);
const cellDoorZ2 = new CellDoorZ(288, 175, "brown", 56, 10);
const cellDoorZ3 = new CellDoorZ(440, 175, "brown", 56, 10);
const cellDoorZ4 = new CellDoorZ(710, 175, "brown", 56, 10);
const cellDoorZ5 = new CellDoorZ(140, 401, "brown", 56, 10);
const cellDoorZ6 = new CellDoorZ(288, 401, "brown", 56, 10);
const cellDoorZ7 = new CellDoorZ(440, 401, "brown", 56, 10);
const cellDoorZ8 = new CellDoorZ(708, 401, "brown", 56, 10);
const cellDoorZ9 = new CellDoorZ(770, 201, "lightRed", 56, 100);
const brokenSwitchSpot = new CellDoorZ(5, 160, "white", 50, 50, "brokenSwitch");
const rukusSwitchSpot = new CellDoorZ(
  750,
  260,
  "orange",
  50,
  50,
  "brokenSwitch"
);
const secondSpot1 = new CellDoorZ(140, 255, "green", 10, 10);
const secondSpot2 = new CellDoorZ(288, 255, "green", 10, 10);
const secondSpot3 = new CellDoorZ(440, 255, "green", 10, 10);
const secondSpot4 = new CellDoorZ(710, 255, "green", 10, 10);
const lastSpot = new CellDoorZ(-190, 300, "pink", 10, 10);
const dogSit = new Dog(750, 260, "white", 10, 10);
const redBull = new PowerUps(60, 280, "blue", 40, 40);
const slowDownClock = new PowerUps(600, 450, "darkBlue", 40, 40);
const guardMovingProgressBar = new ProgressBar(-131, 0, "yellow", 800, 600);
const rukusMovingProgressBar = new ProgressBar(131, 0, "yellow", 800, 600);

player.speed = 5;

let carryState = { carrying: false };
let playerCarrying = []; // the neighbor being carried, or null if none

// Define an array of all neighbors for easier iteration
const neighbors = [
  neighborOne,
  neighborTwo,
  neighborThree,
  neighborFour,
  neighborFive,
  neighborSix,
  neighborSeven,
  neighborEight,
  neighborNine,
];

const neighborSpots = [
  n1Spot,
  n2Spot,
  n3Spot,
  n4Spot,
  n5Spot,
  n6Spot,
  n7Spot,
  n8Spot,
  n9Spot,
];
neighbors.forEach((neighbor, idx) => {
  const spot = neighborSpots[idx];

  neighbor.assignedCell = neighborSpots[idx];
  neighborSpots[idx].occupied = true;
});

const cellToCellZ = new Map([
  [n1Spot, cellDoorZ1],
  [n2Spot, cellDoorZ2],
  [n3Spot, cellDoorZ3],
  [n4Spot, cellDoorZ4],
  [n5Spot, cellDoorZ5],
  [n6Spot, cellDoorZ6],
  [n7Spot, cellDoorZ7],
  [n8Spot, cellDoorZ8],
  [n9Spot, cellDoorZ9],
]);

const secondSpotMap = new Map([
  [n1Spot, secondSpot1],
  [n2Spot, secondSpot2],
  [n3Spot, secondSpot3],
  [n4Spot, secondSpot4],
  [n5Spot, secondSpot1],
  [n6Spot, secondSpot2],
  [n7Spot, secondSpot3],
  [n8Spot, secondSpot4],
  [n9Spot, secondSpot4],
]);

// Reset all neighbors' state in a loop
const homeCellMap = new Map([
  [neighborOne, n1Spot],
  [neighborTwo, n2Spot],
  [neighborThree, n3Spot],
  [neighborFour, n4Spot],
  [neighborFive, n5Spot],
  [neighborSix, n6Spot],
  [neighborSeven, n7Spot],
  [neighborEight, n8Spot],
  [neighborNine, n9Spot],
]);

neighbors.forEach((neighbor) => {
  neighbor.returnedToCell = false;
  neighbor.isCaught = false;
  neighbor.assignedCell = null;
  neighbor.madeItToFirst = false;
  neighbor.madeItToSecond = false;
  neighbor.madeItToLastSpot = false;

  // Set and occupy home cell
  neighbor.homeCell = homeCellMap.get(neighbor);
  neighbor.assignedCell = neighbor.homeCell;
  neighbor.homeCell.occupied = true;
});

const cellSpots = [
  n1Spot,
  n2Spot,
  n3Spot,
  n4Spot,
  n5Spot,
  n6Spot,
  n7Spot,
  n8Spot,
  n9Spot,
];

guardMovingProgressBar.updatePosition = function (entity) {
  const diffX = guardMovingProgressBar.x;
  if (settings.guardProgress >= 437) {
    settings.lastDoorAlarmAnimationState = "closed";
    brokenSwitchAnimationState = "noMove";
    lastSpot.alive = true;
  }
  if (diffX < 0 && entity.color === "lightsteelblue") {
    settings.guardProgress += 1;
    guardMovingProgressBar.x += 0.3;
  } else if (entity.color === "green") {
    if (settings.guardProgress <= 0) {
      settings.lastDoorAlarmAnimationState = "open";
      brokenSwitchAnimationState = "move";
      lastSpot.alive = false;
    } else {
      settings.guardProgress -= 2;
      if (sceneEnded) {
        guardMovingProgressBar.x -= 0.6;
      }
    }
  }
};
rukusMovingProgressBar.updatePosition = function () {
  const diffX = rukusMovingProgressBar.x;
  if (settings.rukusProgress === 431) {
    cellDoorZ9.alive = true;
    brokenSwitch2AnimationState = "move";
    settings.rukusProgress = 0;
  }
  if (diffX > 0) {
    settings.rukusProgress += 1;
    rukusMovingProgressBar.x -= 0.3;
  }
};

dog.updatePosition = function (spotNum) {
  const diffX = spotNum.x - dog.x;
  const diffY = spotNum.y - dog.y;
  if (diffY === 0 && diffX === 0) {
    settings.stopped = true;
  } else {
    if (gameOn && settings.stopped == false) {
      if (diffX > 0) (dog.x += settings.dogSpeed), (dogState = "rightMove");
      else (dog.x -= settings.dogSpeed), (dogState = "leftMove");

      if (diffY > 0) dog.y += settings.dogSpeed;
      else dog.y -= settings.dogSpeed;
    }
  }
};

neighborOne.updatePosition = function (spotNum) {
  const diffX = spotNum.x - neighborOne.x;
  const diffY = spotNum.y - neighborOne.y;
  const cellSpot = neighborOne.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  if (diffX > 0) {
    neighborOne.x += settings.neighborSpeed;
  } else if (diffX < 0) {
    neighborOne.x -= settings.neighborSpeed;
  }
  if (diffX === 0 && diffY === 0) {
    nbr1State = "downMove";
  } else if (diffY > 0) {
    neighborOne.y += settings.neighborSpeed;
    nbr1State = "downMove";
  } else if (diffY < 0) {
    neighborOne.y -= settings.neighborSpeed;
    if (!neighborOne.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      nbr1State = "upMove";
    }
  } else if (neighborOne.madeItToSecond && neighborOne.madeItToFirst) {
    // fallback to downMove just in case
    nbr1State = "downMove";
  }
};

neighborTwo.updatePosition = function (spotNum) {
  const diffX = spotNum.x - neighborTwo.x;
  const diffY = spotNum.y - neighborTwo.y;
  const cellSpot = neighborTwo.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  if (diffX > 0) {
    neighborTwo.x += settings.neighborSpeed;
  } else if (diffX < 0) {
    neighborTwo.x -= settings.neighborSpeed;
  }

  if (neighborTwo.madeItToSecond && neighborTwo.madeItToFirst) {
    nbr2State = "downMove";
  } else if (diffX === 0 && diffY === 0) {
    nbr2State = "downMove";
  } else if (diffY > 0) {
    neighborTwo.y += settings.neighborSpeed;
    nbr2State = "downMove";
  } else if (diffY < 0) {
    neighborTwo.y -= settings.neighborSpeed;
    if (!neighborTwo.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      nbr2State = "upMove";
    }
  } else if (neighborTwo.madeItToSecond && neighborTwo.madeItToFirst) {
    nbr2State = "downMove";
  }
};

neighborThree.updatePosition = function (spotNum) {
  const diffX = spotNum.x - neighborThree.x;
  const diffY = spotNum.y - neighborThree.y;
  const cellSpot = neighborThree.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  if (diffX > 0) {
    neighborThree.x += settings.neighborSpeed;
  } else if (diffX < 0) {
    neighborThree.x -= settings.neighborSpeed;
  }

  if (
    (neighborThree.madeItToSecond && neighborThree.madeItToFirst) ||
    (neighborThree.assignedCell && neighborThree.assignedCell.alive)
  ) {
    nbr3State = "downMove";
  } else if (diffX === 0 && diffY === 0) {
    nbr3State = "downMove";
  } else if (diffY > 0) {
    neighborThree.y += settings.neighborSpeed;
    nbr3State = "downMove";
  } else if (diffY < 0) {
    neighborThree.y -= settings.neighborSpeed;
    if (!neighborThree.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      nbr3State = "upMove";
    }
  } else if (neighborThree.madeItToSecond && neighborThree.madeItToFirst) {
    nbr3State = "downMove";
  }
};

neighborFour.updatePosition = function (spotNum) {
  const diffX = spotNum.x - neighborFour.x;
  const diffY = spotNum.y - neighborFour.y;
  const cellSpot = neighborFour.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  if (diffX > 0) {
    neighborFour.x += settings.neighborSpeed;
  } else if (diffX < 0) {
    neighborFour.x -= settings.neighborSpeed;
  }

  if (
    (neighborFour.madeItToSecond && neighborFour.madeItToFirst) ||
    (neighborFour.assignedCell && neighborFour.assignedCell.alive)
  ) {
    nbr4State = "downMove";
  } else if (diffX === 0 && diffY === 0) {
    nbr4State = "downMove";
  } else if (diffY > 0) {
    neighborFour.y += settings.neighborSpeed;
    nbr4State = "downMove";
  } else if (diffY < 0) {
    neighborFour.y -= settings.neighborSpeed;
    if (!neighborFour.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      nbr4State = "upMove";
    }
  } else if (neighborFour.madeItToSecond && neighborFour.madeItToFirst) {
    nbr4State = "downMove";
  }
};

neighborFive.updatePosition = function (spotNum) {
  const diffX = spotNum.x - neighborFive.x;
  const diffY = spotNum.y - neighborFive.y;
  const cellSpot = neighborFive.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  if (diffX > 0) {
    neighborFive.x += settings.neighborSpeed;
  } else if (diffX < 0) {
    neighborFive.x -= settings.neighborSpeed;
  }

  if (
    (neighborFive.madeItToSecond && neighborFive.madeItToFirst) ||
    (neighborFive.assignedCell && neighborFive.assignedCell.alive)
  ) {
    nbr5State = "downMove";
  } else if (diffX === 0 && diffY === 0) {
    nbr5State = "downMove";
  } else if (diffY > 0) {
    neighborFive.y += settings.neighborSpeed;
    nbr5State = "downMove";
  } else if (diffY < 0) {
    neighborFive.y -= settings.neighborSpeed;
    if (!neighborFive.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      nbr5State = "upMove";
    }
  } else if (neighborFive.madeItToSecond && neighborFive.madeItToFirst) {
    nbr5State = "downMove";
  }
};

neighborSix.updatePosition = function (spotNum) {
  const diffX = spotNum.x - neighborSix.x;
  const diffY = spotNum.y - neighborSix.y;
  const cellSpot = neighborSix.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  if (diffX > 0) {
    neighborSix.x += settings.neighborSpeed;
  } else if (diffX < 0) {
    neighborSix.x -= settings.neighborSpeed;
  }

  if (
    (neighborSix.madeItToSecond && neighborSix.madeItToFirst) ||
    (neighborSix.assignedCell && neighborSix.assignedCell.alive)
  ) {
    nbr6State = "downMove";
  } else if (diffX === 0 && diffY === 0) {
    nbr6State = "downMove";
  } else if (diffY > 0) {
    neighborSix.y += settings.neighborSpeed;
    nbr6State = "downMove";
  } else if (diffY < 0) {
    neighborSix.y -= settings.neighborSpeed;
    if (!neighborSix.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      nbr6State = "upMove";
    }
  } else if (neighborSix.madeItToSecond && neighborSix.madeItToFirst) {
    nbr6State = "downMove";
  }
};

neighborSeven.updatePosition = function (spotNum) {
  const diffX = spotNum.x - neighborSeven.x;
  const diffY = spotNum.y - neighborSeven.y;
  const cellSpot = neighborSeven.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  if (diffX > 0) {
    neighborSeven.x += settings.neighborSpeed;
  } else if (diffX < 0) {
    neighborSeven.x -= settings.neighborSpeed;
  }

  if (
    (neighborSeven.madeItToSecond && neighborSeven.madeItToFirst) ||
    (neighborSeven.assignedCell && neighborSeven.assignedCell.alive)
  ) {
    nbr7State = "downMove";
  } else if (diffX === 0 && diffY === 0) {
    nbr7State = "downMove";
  } else if (diffY > 0) {
    neighborSeven.y += settings.neighborSpeed;
    nbr7State = "downMove";
  } else if (diffY < 0) {
    neighborSeven.y -= settings.neighborSpeed;
    if (!neighborSeven.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      nbr7State = "upMove";
    }
  } else if (neighborSeven.madeItToSecond && neighborSeven.madeItToFirst) {
    nbr7State = "downMove";
  }
};

neighborEight.updatePosition = function (spotNum) {
  const diffX = spotNum.x - neighborEight.x;
  const diffY = spotNum.y - neighborEight.y;
  const cellSpot = neighborEight.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  if (diffX > 0) {
    neighborEight.x += settings.neighborSpeed;
  } else if (diffX < 0) {
    neighborEight.x -= settings.neighborSpeed;
  }

  if (
    (neighborEight.madeItToSecond && neighborEight.madeItToFirst) ||
    (neighborEight.assignedCell && neighborEight.assignedCell.alive)
  ) {
    nbr8State = "downMove";
  } else if (diffX === 0 && diffY === 0) {
    nbr8State = "downMove";
  } else if (diffY > 0) {
    neighborEight.y += settings.neighborSpeed;
    nbr8State = "downMove";
  } else if (diffY < 0) {
    neighborEight.y -= settings.neighborSpeed;
    if (!neighborEight.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      nbr8State = "upMove";
    }
  } else if (neighborEight.madeItToSecond && neighborEight.madeItToFirst) {
    nbr8State = "downMove";
  }
};

neighborNine.updatePosition = function (spotNum) {
  const diffX = spotNum.x - neighborNine.x;
  const diffY = spotNum.y - neighborNine.y;
  const cellSpot = neighborNine.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  if (diffX > 0) {
    neighborNine.x += 1;
  } else if (diffX < 0) {
    neighborNine.x -= 1;
  }

  if (
    (neighborNine.madeItToSecond && neighborNine.madeItToFirst) ||
    (neighborNine.assignedCell && neighborNine.assignedCell.alive)
  ) {
  } else if (diffY > 0) {
    neighborNine.y += 1;
  } else if (diffY < 0) {
    neighborNine.y -= 1;
  }
};

// function that changes the player's direction
//
document.addEventListener("keydown", (e) => {
  if (controlsEnabled) {
    player.setDirection(e.key);
  }
});

// function that stops player from going in specific direction
document.addEventListener("keyup", (e) => {
  if (controlsEnabled && ["w", "a", "s", "d"].includes(e.key)) {
    player.unsetDirection(e.key);
  }
});

document.addEventListener("touchmove", (e) => {
  if (!controlsEnabled) return;
  player.unsetDirection("s");
  player.unsetDirection("a");
  player.unsetDirection("d");
  player.unsetDirection("w");
  if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    upButton
  ) {
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    downButton
  ) {
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    (leftButton || leftArrowL)
  ) {
    player.setDirection("a");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    (rightButton || rightArrowL)
  ) {
    player.setDirection("d");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topLeftButton
  ) {
    player.setDirection("a");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topLeftArrow
  ) {
    player.setDirection("a");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomLeftButton
  ) {
    player.setDirection("a");
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomLeftArrow
  ) {
    player.setDirection("a");
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topRightButton
  ) {
    player.setDirection("d");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topRightArrow
  ) {
    player.setDirection("d");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomRightButton
  ) {
    player.setDirection("s");
    player.setDirection("d");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomRightArrow
  ) {
    player.setDirection("s");
    player.setDirection("d");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    upButtonL
  ) {
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    downButtonL
  ) {
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    leftButtonL
  ) {
    player.setDirection("a");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    rightButtonL
  ) {
    player.setDirection("d");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topLeftButtonL
  ) {
    player.setDirection("a");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topLeftArrowL
  ) {
    player.setDirection("a");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomLeftButtonL
  ) {
    player.setDirection("a");
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomLeftArrowL
  ) {
    player.setDirection("a");
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topRightButtonL
  ) {
    player.setDirection("d");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topRightArrowL
  ) {
    player.setDirection("d");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomRightButtonL
  ) {
    player.setDirection("s");
    player.setDirection("d");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomRightArrowL
  ) {
    player.setDirection("s");
    player.setDirection("d");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const boxDiv = document.getElementById("boxDiv");
  if (boxDiv) {
    boxDiv.addEventListener("contextmenu", (e) => e.preventDefault());
  }
});
// Null-safe event listeners for touch controls
if (controlsEnabled) {
  if (upButton) {
    upButton.addEventListener("touchstart", (e) => {
      player.setDirection("w");
    });
  }
  if (downButton) {
    downButton.addEventListener("touchstart", (e) => {
      player.setDirection("s");
    });
  }
  if (leftButton) {
    leftButton.addEventListener("touchstart", (e) => {
      player.setDirection("a");
    });
  }
  if (rightButton) {
    rightButton.addEventListener("touchstart", (e) => {
      player.setDirection("d");
    });
  }
  if (upButtonL) {
    upButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("w");
    });
  }
  if (downButtonL) {
    downButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("s");
    });
  }
  if (leftButtonL) {
    leftButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("a");
    });
  }
  if (rightButtonL) {
    rightButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("d");
    });
  }
  if (topRightButton) {
    topRightButton.addEventListener("touchstart", (e) => {
      player.setDirection("d");
      player.setDirection("w");
    });
  }
  if (topRightButtonL) {
    topRightButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("d");
      player.setDirection("w");
    });
  }
  if (bottomRightButton) {
    bottomRightButton.addEventListener("touchstart", (e) => {
      player.setDirection("d");
      player.setDirection("s");
    });
  }
  if (bottomRightButtonL) {
    bottomRightButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("d");
      player.setDirection("s");
    });
  }
  if (bottomLeftButton) {
    bottomLeftButton.addEventListener("touchstart", (e) => {
      player.setDirection("a");
      player.setDirection("s");
    });
  }
  if (bottomLeftButtonL) {
    bottomLeftButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("a");
      player.setDirection("s");
    });
  }
  if (topLeftButton) {
    topLeftButton.addEventListener("touchstart", (e) => {
      player.setDirection("a");
      player.setDirection("w");
    });
  }
  if (topLeftButtonL) {
    topLeftButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("a");
      player.setDirection("w");
    });
  }
}
document.addEventListener("touchend", (e) => {
  if (!controlsEnabled) return;
  player.unsetDirection("w");
  player.unsetDirection("a");
  player.unsetDirection("s");
  player.unsetDirection("d");
});

function detectHitPlayerToSpot(neighbor, spot) {

  if (
    cellSpots.includes(spot) &&
    player.x < spot.x + spot.width &&
    player.x + player.width > spot.x &&
    player.y < spot.y + spot.height &&
    player.y + player.height > spot.y
  ) {
    neighbor.isCaught = false;
    neighbor.madeItToFirst = false;
    neighbor.madeItToSecond = false;
    neighbor.x = spot.x;
    neighbor.y = spot.y;
    neighbor.assignedCell = spot;
    spot.occupied = true;
    carryState.carrying = false;
    // remove neighbor from array
    playerCarrying = playerCarrying.filter((n) => n !== neighbor);
  }
}

const detectHitPlayerRukus = () => {
  if (
    dog.x < player.x + player.width &&
    dog.x + dog.width > player.x &&
    dog.y < player.y + player.height &&
    dog.y + dog.height > player.y
  ) {
    endSceneStarted = true;
    endScene();
  }
};

const detectHitPlayer = (thing) => {
  if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y
  ) {
    if (thing.color === "white") {
      guardMovingProgressBar.updatePosition(player);
    } else if (thing.color === "orange" && cellDoorZ9.alive) {
      thing.alive = false;
      rukusMovingProgressBar.x = 131;
      brokenSwitch2AnimationState = "noMove";
    } else {
      if (thing.color !== "orange") {
        score++;
        thing.alive = false;
      }

      if (score == 14) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (score == 13) {
        redBull.alive = true;
        redLit();
      }
      if (score == 12) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (score == 11) {
        redBull.alive = true;
        redLit();
      }
      if (score == 10) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (score == 9) {
        redBull.alive = true;
        redLit();
      }
      if (score == 8) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (score == 7) {
        redBull.alive = true;
        redLit();
      }
      if (score == 6) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (score == 5) {
        redBull.alive = true;
        redLit();
      }
      if (score == 4) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (score == 3) {
        redLit();
        redBull.alive = true;
      }
    }
  }
};

const detectHitPlayerRed = (thing) => {
  if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y
  ) {
    thing.alive = false;
    redNotLit();
    settings.guardWearingBoots = true;
    if (settings.bootsColor === "blue") {
      settings.guardBootsColor = "blue";
    } else if (settings.bootsColor === "red") {
      settings.guardBootsColor = "red";
    } else if (settings.bootsColor === "green") {
      settings.guardBootsColor = "green";
    } else if (settings.bootsColor === "yellow") {
      settings.guardBootsColor = "yellow";
    } else if (settings.bootsColor === "purple") {
      settings.guardBootsColor = "purple";
    } else if (settings.bootsColor === "rainbow") {
      settings.guardBootsColor = "rainbow";
    }
  }
};

function clockNotLit() {
  settings.clockState = "noMove";
}
const detectHitPlayerClock = (thing) => {
  if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y
  ) {
    thing.alive = false;
    clockNotLit();
    settings.guardWearingGloves = true;
    if (settings.glovesColor === "blue") {
      settings.guardGlovesColor = "blue";
    } else if (settings.glovesColor === "red") {
      settings.guardGlovesColor = "red";
    } else if (settings.glovesColor === "green") {
      settings.guardGlovesColor = "green";
    } else if (settings.glovesColor === "yellow") {
      settings.guardGlovesColor = "yellow";
    } else if (settings.glovesColor === "purple") {
      settings.guardGlovesColor = "purple";
    } else if (settings.glovesColor === "rainbow") {
      settings.guardGlovesColor = "rainbow";
    }
  }
};

let sceneEnded = false;

const detectHitDog = (thing) => {
  // we're basically using one big if statement to cover all our bases
  // that means judging the player and ogre's x, y, width and height values
  if (
    dog.x < thing.x + thing.width && // is the dog to the left
    dog.x + dog.width > thing.x && // and is the dog to the right
    dog.y < thing.y + thing.height && // and is the dog bellow
    dog.y + dog.height > thing.y // and is the dog above
    // only allow if thing is not alive
  ) {
    // console.log(settings.guardProgress, "settings.guardProgress")
    if (thing.color === "orange" && !cellDoorZ9.alive) {
      rukusMovingProgressBar.updatePosition();
    } else if (thing.color === "white" && lastSpot.alive) {
      guardMovingProgressBar.updatePosition(dog);
      // rukusMovingProgressBar.x = 131
      if (settings.guardProgress === 0) {
        lastSpot.alive = false;
        brokenSwitchAnimationState = "move";
        settings.lastDoorAlarmAnimationState = "open";
        sceneEnded = true;
        playerEnters();
        exitSignState = "move";
      }
    } else {
      thing.alive = true;
    }
  }
};

function cleanupEscapedNeighbors() {
  const allNeighbors = [
    neighborOne,
    neighborTwo,
    neighborThree,
    neighborFour,
    neighborFive,
    neighborSeven,
    neighborEight,
    neighborNine,
  ];

  for (const neighbor of allNeighbors) {
    if (neighbor.madeItToFirst && neighbor.assignedCell) {
      neighbor.assignedCell.occupied = false;
    }
  }
}

const escapedNeighbors = new Set();
const ESCAPE_X_THRESHOLD = -40; // or whatever your "last spot" x is
const detectHitNeighbor = (neighbor, thing) => {
  const hit =
    neighbor.x < thing.x + thing.width &&
    neighbor.x + neighbor.width > thing.x &&
    neighbor.y < thing.y + thing.height &&
    neighbor.y + neighbor.height > thing.y;
  if (
    hit &&
    thing === cellToCellZ.get(neighbor.assignedCell) &&
    !neighbor.madeItToFirst
  ) {
    neighbor.madeItToFirst = true;
    neighbor.updatePosition(secondSpotMap.get(neighbor.assignedCell));
  } else if (
    hit &&
    thing === secondSpotMap.get(neighbor.assignedCell) &&
    !neighbor.madeItToSecond
  ) {
    neighbor.madeItToSecond = true;
    neighbor.updatePosition(lastSpot);
  }
};

function detectHitPlayerNeighbor(neighbor) {

  if (
    player.x < neighbor.x + neighbor.width &&
    player.x + player.width > neighbor.x &&
    player.y < neighbor.y + neighbor.height &&
    player.y + player.height > neighbor.y &&
    (!carryState.carrying || settings.guardWearingGloves)
  ) {
    if (
      settings.guardGlovesColor === "blue" &&
      playerCarrying.length <= 1 &&
      settings.guardWearingGloves
    ) {
      neighbor.isCaught = true;
      playerCarrying.push(neighbor);
      carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (!settings.guardWearingGloves && !playerCarrying.length) {
      playerCarrying.push(neighbor);
      neighbor.isCaught = true;
      carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (
      settings.guardGlovesColor === "red" &&
      playerCarrying.length <= 2
    ) {

      playerCarrying.push(neighbor);
      neighbor.isCaught = true;
      carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (
      settings.guardGlovesColor === "yellow" &&
      playerCarrying.length <= 3
    ) {

      playerCarrying.push(neighbor);
      neighbor.isCaught = true;
      carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (
      settings.guardGlovesColor === "green" &&
      playerCarrying.length <= 4
    ) {

      playerCarrying.push(neighbor);
      neighbor.isCaught = true;
      carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (
      settings.guardGlovesColor === "purple" &&
      playerCarrying.length <= 5
    ) {

      neighbor.isCaught = true;
      playerCarrying.push(neighbor);
      carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (
      settings.guardGlovesColor === "rainbow" &&
      playerCarrying.length <= 6
    ) {

      playerCarrying.push(neighbor);
      neighbor.isCaught = true;
      carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    }
  }
}

let triggeredEvent = false;

function getZSortedEntities() {
  // Helper to wrap animation functions as entities with a draw method and y
  function animEntity(fn, y) {
    return { fn, y };
  }
  // Compose z-ordered array: prisoners 1-4, cell doors 6-10, dad, cell doors 1-5, prisoners 5-8, dog
  // Use .y of relevant objects for sorting; static overlays (walls/doors) use fixed Y (0)
  const arr = [
    animEntity(animation5, neighborOne.y - neighborOne.height + 25),
    animEntity(animation6, neighborTwo.y - neighborTwo.height + 25),
    animEntity(animation7, neighborThree.y - neighborThree.height + 25),
    animEntity(animation8, neighborFour.y - neighborFour.height + 25), // prisoners back
    animEntity(animation115, 5), // glow spots

    animEntity(animation24, 106), // wall top overlay (static, always on top or bottom as needed)
    animEntity(animation88, 106),
    animEntity(animation89, 140), //brokenswitch
    animEntity(animation118, 300), // brokenswitch2

    animEntity(animation92, 106),
    animEntity(animation93, 120), //lastDoor
    animEntity(animation95, 286),

    // Cell doors 6-10 overlays (Y = 175)
    animEntity(animation19, 100), // cellDoorA6 overlay
    animEntity(animation20, 100), // cellDoorA7 overlay
    animEntity(animation21, 100), // cellDoorA8 overlay
    animEntity(animation22, 100), // cellDoorA9 overlay
    animEntity(animation23, 100), // cellDoorA10 overlay
    // Event trigger logic moved out of array; see below

    animEntity(animation2, player.y), // Dad (player)

    // animEntity(drawExplosionEventAnimation, 999),
    // Cell doors 1-5 overlays (Y = 401)
    animEntity(animation14, 340), // cellDoorA1 overlay
    animEntity(animation15, 340), // cellDoorA2 overlay
    animEntity(animation16, 340), // cellDoorA3 overlay
    animEntity(animation17, 340), // cellDoorA4 overlay
    animEntity(animation18, 340), // cellDoorA5 overlay

    animEntity(animation25, 340), // wall bottom overlay

    animEntity(animation9, neighborFive.y - neighborFive.height - 19),
    animEntity(animation10, neighborSix.y - neighborSix.height - 19),
    animEntity(animation11, neighborSeven.y - neighborSeven.height - 19),
    animEntity(animation12, neighborEight.y - neighborEight.height - 19),
    animEntity(animation117, neighborNine.y),
    //
    // prisoners front
    animEntity(animation3, 370), // redbull overlay
    animEntity(animation4, 670), // chill pill overlay
    animEntity(animation, dog.y - dog.height - 15), // Dog

    animEntity(animation99, 600), // rukus gauge
    animEntity(animation100, 600), // guard gauge

    animEntity(animation97, 600), // guard bar
    animEntity(animation111, 600), //rukus bar
    animEntity(animation112, 600), // background end caps

    animEntity(animation110, 600), // gauge end caps
    animEntity(animation116, player.y), // gauge end caps
  ];

  // Sort by Y position ascending (lowest Y first, i.e., "farther back" first)
  arr.sort((a, b) => a.y - b.y);
  return arr;
}

function startLoop() {
  function frame() {
    gameLoop(ctx, 60);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
startLoop();
//-----------------------------------------------------------------
const stopGameLoop = () => {
  clearInterval(gameInterval);
};
const gameInterval = setInterval(() => gameLoop(ctx), 60);
gameInterval;

// At the bottom of index.js
window.startGame = startGame;

// Export required variables and functions for gameLoop.js
export function redLit() {
  settings.redBullState = "onlyMove";
  settings.playerImageState = "bootsMove";
}

export function redNotLit() {
  settings.redBullState = "noMove";
}

let currentTime = 0;
let countUpInterval = null;

function startCountUpTimer(displayElement) {
  currentTime = 0; // reset on new start
  countUpInterval = setInterval(() => {
    currentTime++;
    displayElement.textContent = formatTime(currentTime);
    if (scoreBox4) {
      scoreBox4.textContent = formatTime(currentTime);
    }
  }, 1000);
}

function stopCountUpTimer() {
  clearInterval(countUpInterval);
  // console.log(`Final Time: ${formatTime(currentTime)}`);
  return currentTime;
}

// Pause the count-up timer without resetting the current time
function pauseCountUpTimer() {
  if (countUpInterval) {
    clearInterval(countUpInterval);
    countUpInterval = null; // Ensure interval is cleared fully
    // console.log("Count-up timer paused at:", formatTime(currentTime));
  }
}

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function clockLit() {
  settings.clockState = "onlyMove";
}

export {
  formatTime,
  detectHitPlayerToSpot,
  startCountUpTimer,
  stopCountUpTimer,
  currentTime,
  game,
  score,
  movement,
  escapedCount,
  escapedCountNum,
  carryCount,
  timer,
  scoreH2,
  pause,
  play,
  urScore,
  urScore2,
  urScore3,
  urScore4,
  redBull,
  redLife,
  slowDownClock,
  message,
  message2,
  message3,
  cellSpots,
  dog,
  dogSit,
  clockLit,
  player,
  neighbors,
  cellToCellZ,
  secondSpotMap,
  lastSpot,
  redBullImg,
  carryState,
  detectHitPlayer,
  detectHitDog,
  detectHitNeighbor,
  detectHitPlayerNeighbor,
  detectHitPlayerRed,
  detectHitPlayerClock,
  cleanupEscapedNeighbors,
  getZSortedEntities,
  gameOverWin,
  animation3,
  animation4,
  detectHitPlayerRukus,
  cellDoorZ1,
  cellDoorZ2,
  cellDoorZ3,
  cellDoorZ4,
  cellDoorZ5,
  cellDoorZ6,
  cellDoorZ7,
  cellDoorZ8,
  cellDoorZ9,
  neighborOne,
  neighborTwo,
  neighborThree,
  neighborFour,
  neighborFive,
  neighborSix,
  neighborSeven,
  neighborEight,
  neighborNine,
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
  dogSpot2,
  secondSpot1,
  secondSpot2,
  secondSpot3,
  endSceneStarted,
  scoreBox1,
  scoreBox2,
  scoreBox3,
  scoreBox4,
  secondSpot4,
  controlsEnabled,
  triggeredEvent,
  playerCarrying,
  clockImg,
  playerImg,
  playerGlovesImg,
  guardMovingProgressBar,
  brokenSwitchSpot,
  gameOverLoose,
  pauseCountUpTimer,
  rukusSwitchSpot,
  ESCAPE_X_THRESHOLD,
  escapedNeighbors,
  refreshPage,
};
