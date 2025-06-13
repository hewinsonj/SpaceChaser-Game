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

// Sync cell door visibility to pooSpot.alive state every frame
function syncCellDoorVisibility() {
  // Map: [cellDoor index] = !pooSpotX.alive
  cellDoorVisible[10] = !pooSpot1.alive;
  cellDoorVisible[9] = !pooSpot2.alive;
  cellDoorVisible[8] = !pooSpot3.alive;
  cellDoorVisible[6] = !pooSpot4.alive;
  cellDoorVisible[1] = !pooSpot5.alive;
  cellDoorVisible[2] = !pooSpot6.alive;
  cellDoorVisible[3] = !pooSpot7.alive;
  cellDoorVisible[5] = !pooSpot8.alive;
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

const movement = document.getElementById("movement");
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
let dogSpeed = 10;
let neighborSpeed = 0.8;
let redLife = 0;
let gameOn = false;
let gameOver = false;

// player.speed = 8
// const cWidth = innerWidth
// const cHeight = innerHeight

const dogImg = new Image();
const dogWidth = 64;
const dogHeight = 64;
let gameFrame = 0;
const staggerFrames = 1000;
const spriteAnimations = [];
dogState = "leftMove";
// dogImg.src = 'poopickerdogfinal9.png';
dogImg.src = "SpaceChaserSprites/alienRukussmall.png";

const playerImg = new Image();
const playerWidth = 89;
const playerHeight = 89;
let gameFrame2 = 0;
const staggerFrames2 = 10000;
const spriteAnimations2 = [];
playerState = "rightMove";
// playerImg.src = 'poopickerdadthisone9.png';
playerImg.src = "SpaceChaserSprites/guardRunningSmallFinal.png";

const redBullImg = new Image();
const redBullWidth = 89;
const redBullHeight = 89;
let gameFrame3 = 0;
const staggerFrames3 = 400;
const spriteAnimations3 = [];
redBullState = "noMove";
redBullImg.src = `poopickerredbullfinal9.png`;

const clockImg = new Image();
const clockWidth = 240;
const clockHeight = 240;
let gameFrame4 = 0;
const staggerFrames4 = 1000;
const spriteAnimations4 = [];
clockState = "noMove";
clockImg.src = `poopickerpeoplepillfinal9.png`;

const nbr1Img = new Image();
const nbr1Width = 75;
const nbr1Height = 75;
let gameFrame5 = 0;
const staggerFrames5 = 10000;
const spriteAnimations5 = [];
nbr1State = "noMove";
nbr1Img.src = `SpaceChaserSprites/alienPrisoner113.png`;

const nbr2Img = new Image();
const nbr2Width = 105;
const nbr2Height = 105;
let gameFrame6 = 0;
const staggerFrames6 = 10000;
const spriteAnimations6 = [];
nbr2State = "noMove";
nbr2Img.src = `SpaceChaserSprites/alienPrisoner231.png`;

const nbr3Img = new Image();
const nbr3Width = 260;
const nbr3Height = 260;
let gameFrame7 = 0;
const staggerFrames7 = 10000;
const spriteAnimations7 = [];
nbr3State = "noMove";
nbr3Img.src = `SpaceChaserSprites/alienPrisoner121.png`;

const nbr4Img = new Image();
const nbr4Width = 190;
const nbr4Height = 190;
let gameFrame8 = 0;
const staggerFrames8 = 10000;
const spriteAnimations8 = [];
nbr4State = "noMove";
nbr4Img.src = `SpaceChaserSprites/alienPrisoner104.png`;

const nbr5Img = new Image();
const nbr5Width = 100;
const nbr5Height = 100;
let gameFrame9 = 0;
const staggerFrames9 = 10000;
const spriteAnimations9 = [];
nbr5State = "noMove";
nbr5Img.src = `SpaceChaserSprites/alienPrisoner87.png`;

const nbr6Img = new Image();
const nbr6Width = 90;
const nbr6Height = 90;
let gameFrame10 = 0;
const staggerFrames10 = 10000;
const spriteAnimations10 = [];
nbr6State = "noMove";
nbr6Img.src = `SpaceChaserSprites/alienPrisoner808.png`;

const nbr7Img = new Image();
const nbr7Width = 110;
const nbr7Height = 110;
let gameFrame11 = 0;
const staggerFrames11 = 10000;
const spriteAnimations11 = [];
nbr7State = "noMove";
nbr7Img.src = `SpaceChaserSprites/alienPrisoner2123.png`;

const nbr8Img = new Image();
const nbr8Width = 170;
const nbr8Height = 170;
let gameFrame12 = 0;
const staggerFrames12 = 10000;
const spriteAnimations12 = [];
nbr8State = "noMove";
nbr8Img.src = `SpaceChaserSprites/alienPrisoner987.png`;

const pooImg = new Image();
const pooWidth = 178;
const pooHeight = 178;
let gameFrame13 = 0;
const staggerFrames13 = 10000;
const spriteAnimations13 = [];
pooState = "noMove";
pooImg.src = `poopickerpeoplepoop9.png`;

// ------------------------------------------------------
const cell1Img = new Image();
const cell1Width = 800;
const cell1Height = 600;
let gameFrame14 = 0;
const staggerFrames14 = 10000;
const spriteAnimations14 = [];
cell1State = "noMove";
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

// --------------------------------------------------------------------------
// Wall Top Animation (cellWallTopA1.png)
const wallTopImg = new Image();
const wallTopWidth = 800;
const wallTopHeight = 600;
let gameFrame24 = 0;
const staggerFrames24 = 10000;
const spriteAnimations24 = [];
wallTopState = "noMove";
wallTopImg.src = "SpaceChaserSprites/cellDoors/cellWallTopB1.png";

const animationStates24 = [
  {
    name: "noMove",
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
wallBottomState = "noMove";
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

// Duplicate for cellDoorA2.png through cellDoorA10.png, variables cell2Img ... cell10Img, functions animation15 ... animation23
const cell2Img = new Image();
const cell2Width = 800;
const cell2Height = 600;
let gameFrame15 = 0;
const staggerFrames15 = 10000;
const spriteAnimations15 = [];
cell2State = "noMove";
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
cell3State = "noMove";
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
cell4State = "noMove";
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
cell5State = "noMove";
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
cell6State = "noMove";
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
const staggerFrames20 = 10000;
const spriteAnimations20 = [];
cell7State = "noMove";
cell7Img.src = `SpaceChaserSprites/cellDoors/cellDoorA7.png`;

const animationStates20 = [
  {
    name: "noMove",
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
cell8State = "noMove";
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
cell9State = "noMove";
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
cell10State = "noMove";
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
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation12);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    nbr8Img,
    frameX,
    frameY,
    nbr8Width,
    nbr8Height,
    neighborEight.x - 35,
    neighborEight.y - 115,
    123,
    123
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

  gameFrame12++;
}

//----------------------------------------------------------------------------------------------------
const animationStates13 = [
  {
    name: "move",
    frames: 4,
  },
  {
    name: "noMove",
    frames: 1,
  },
];

animationStates13.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * pooWidth;
    let positionY = index * pooHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations13[state.name] = frames;
});

function animation13() {
  let position =
    Math.floor(gameFrame13 / staggerFrames13) %
    spriteAnimations13[pooState].loc.length;
  let frameX = pooWidth * position;
  let frameY = spriteAnimations13[pooState].loc[position].y;
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation13);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  if (pooSpot1.alive) {
    ctx.drawImage(
      pooImg,
      frameX,
      frameY,
      pooWidth,
      pooHeight,
      pooSpot1.x - 39,
      pooSpot1.y - 40,
      90,
      90
    );
  }
  if (pooSpot2.alive) {
    ctx.drawImage(
      pooImg,
      frameX,
      frameY,
      pooWidth,
      pooHeight,
      pooSpot2.x - 39,
      pooSpot2.y - 40,
      90,
      90
    );
  }
  if (pooSpot3.alive) {
    ctx.drawImage(
      pooImg,
      frameX,
      frameY,
      pooWidth,
      pooHeight,
      pooSpot3.x - 39,
      pooSpot3.y - 40,
      90,
      90
    );
  }
  if (pooSpot4.alive) {
    ctx.drawImage(
      pooImg,
      frameX,
      frameY,
      pooWidth,
      pooHeight,
      pooSpot4.x - 39,
      pooSpot4.y - 40,
      90,
      90
    );
  }
  if (pooSpot5.alive) {
    ctx.drawImage(
      pooImg,
      frameX,
      frameY,
      pooWidth,
      pooHeight,
      pooSpot5.x - 39,
      pooSpot5.y - 40,
      90,
      90
    );
  }
  if (pooSpot6.alive) {
    ctx.drawImage(
      pooImg,
      frameX,
      frameY,
      pooWidth,
      pooHeight,
      pooSpot6.x - 39,
      pooSpot6.y - 40,
      90,
      90
    );
  }
  if (pooSpot7.alive) {
    ctx.drawImage(
      pooImg,
      frameX,
      frameY,
      pooWidth,
      pooHeight,
      pooSpot7.x - 39,
      pooSpot7.y - 40,
      90,
      90
    );
  }
  if (pooSpot8.alive) {
    ctx.drawImage(
      pooImg,
      frameX,
      frameY,
      pooWidth,
      pooHeight,
      pooSpot8.x - 39,
      pooSpot8.y - 40,
      90,
      90
    );
  }
  // ctx.drawImage(pooImg, frameX, frameY, pooWidth, pooHeight, pooSpot2.x - 35, pooSpot2.y - 115, 90, 90)
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

  gameFrame13++;
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

function animation12() {
  let position =
    Math.floor(gameFrame12 / staggerFrames12) %
    spriteAnimations12[nbr8State].loc.length;
  let frameX = nbr8Width * position;
  let frameY = spriteAnimations12[nbr8State].loc[position].y;
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation12);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    nbr8Img,
    frameX,
    frameY,
    nbr8Width,
    nbr8Height,
    neighborEight.x - 55,
    neighborEight.y - 55,
    123,
    123
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

  gameFrame12++;
}

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
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation11);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    nbr7Img,
    frameX,
    frameY,
    nbr7Width,
    nbr7Height,
    neighborSeven.x - 35,
    neighborSeven.y - 75,
    85,
    85
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

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
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation10);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    nbr6Img,
    frameX,
    frameY,
    nbr6Width,
    nbr6Height,
    neighborSix.x - 35,
    neighborSix.y - 69,
    75,
    75
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

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
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation9);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    nbr5Img,
    frameX,
    frameY,
    nbr5Width,
    nbr5Height,
    neighborFive.x ,
    neighborFive.y ,
    85,
    85
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

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
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation8);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    nbr4Img,
    frameX,
    frameY,
    nbr4Width,
    nbr4Height,
    neighborFour.x - 35,
    neighborFour.y - 45,
    100,
    100
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

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
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation7);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    nbr3Img,
    frameX,
    frameY,
    nbr3Width,
    nbr3Height,
    neighborThree.x - 28,
    neighborThree.y - 35,
    89,
    89
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

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
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation6);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    nbr2Img,
    frameX,
    frameY,
    nbr2Width,
    nbr2Height,
    neighborTwo.x - 28,
    neighborTwo.y - 25,
    80,
    80
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

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
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation5);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    nbr1Img,
    frameX,
    frameY,
    nbr1Width,
    nbr1Height,
    neighborOne.x - 25,
    neighborOne.y - 25,
    80,
    80
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

  gameFrame5++;
}
//------------------------------------------------------------

const animationStates4 = [
  {
    name: "onlyMove",
    frames: 4,
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
    spriteAnimations4[clockState].loc.length;
  let frameX = clockWidth * position;
  let frameY = spriteAnimations4[clockState].loc[position].y;
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation4);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    clockImg,
    frameX,
    frameY,
    clockWidth,
    clockHeight,
    slowDownClock.x - 56,
    slowDownClock.y - 63,
    120,
    120
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

  gameFrame4++;
}
// -----------------------------------------------------------

const animationStates3 = [
  {
    name: "onlyMove",
    frames: 7,
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
    spriteAnimations3[redBullState].loc.length;
  let frameX = redBullWidth * position;
  let frameY = spriteAnimations3[redBullState].loc[position].y;
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation3);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    redBullImg,
    frameX,
    frameY,
    redBullWidth,
    redBullHeight,
    redBull.x - 60,
    redBull.y - 50,
    120,
    120
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

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
  // ctx.fillRect(20, 20, 100, 100)
  // ctx.clearRect(0, 0, cWidth, cHeight)
  requestAnimationFrame(animation);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(
    dogImg,
    frameX,
    frameY,
    dogWidth,
    dogHeight,
    dog.x - 15,
    dog.y - 19,
    50,
    50
  );
  // if(gameFrame % staggerFrames == 0){
  // if(frameX < 9) frameX++;
  // else frameX = 0;
  // }

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
    spriteAnimations2[playerState].loc.length;
  let frameX = playerWidth * position;
  let frameY = spriteAnimations2[playerState].loc[position].y;
  requestAnimationFrame(animation2);
  ctx.drawImage(
    playerImg,
    frameX,
    frameY,
    playerWidth,
    playerHeight,
    player.x - 24,
    player.y - 10,
    80,
    80
  );
  gameFrame2++;
}

// --------------------------------------------------------

function drankOne() {
  if (redLife == 3) {
    player.speed = 13;
  } else if (redLife == 2) {
    player.speed = 9;
  } else if (redLife == 1) {
    player.speed = 13;
  }
}

const toggleScreen = (id, toggle) => {
  let element = document.getElementById(id);
  let display = toggle ? "flex" : "none";
  element.style.display = display;
};

const toggleScreenCon = (id, toggle) => {
  let element = document.getElementById(id);
  let display = toggle ? "block" : "none";
  element.style.display = display;
};

const toggleButtons = (id, toggle) => {
  let element = document.getElementById(id);
  let display = toggle ? "block" : "none";
  element.style.display = display;
};

window.addEventListener("resize", windowResize);

function windowResize() {
  // console.log(gameOn, ' is game on?')
  if (gameOn == true) {
    if (window.innerWidth <= 500) {
      toggleScreenCon("urScoreCon2", true);
      toggleScreenCon("urScoreCon3", false);
      toggleScreenCon("status", true);
      toggleScreenCon("status2", false);
    } else {
      toggleScreenCon("urScoreCon3", true);
      toggleScreenCon("urScoreCon2", false);
      toggleScreenCon("status", false);
      toggleScreenCon("status2", true);
    }
  } else {
    toggleScreenCon("urScoreCon3", false);
    toggleScreenCon("urScoreCon2", false);
    toggleScreenCon("status", false);
    toggleScreenCon("status2", false);
    // window.location.reload()
  }
  // if(player.score <= 3){

  // }
}

function refreshPage() {
  window.location.reload();
}

const startGame = () => {
  console.log("Start Game");
  gameStarted = true;
  toggleScreen("start-screen", false);
  toggleScreen("game-over-screen", false);
  toggleScreen("canvas", true);
  toggleScreen("top-left", true);
  toggleScreen("top-right", true);
  toggleScreen("btm-left", true);
  toggleScreen("btm-right", true);
  play();
  gameOn = true;
  gameOver = false;

  if (window.innerWidth <= 500) {
    toggleScreenCon("urScoreCon2", true);
    toggleScreenCon("status2", false);
    toggleScreenCon("status", true);
    toggleScreenCon("urScoreCon3", false);
  } else {
    toggleScreenCon("urScoreCon3", true);
    toggleScreenCon("urScoreCon2", false);
    toggleScreenCon("status2", true);
    toggleScreenCon("status", false);
  }

  showInitialCellDoors();
  gameInterval;
};

const gameOverWin = () => {
  if (score == 102) {
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
    // toggleButtons('buttsHolder', false);
  }
};

const gameOverLoose = () => {
  stopGameLoop();
  toggleScreen("start-screen", false);
  toggleScreen("game-over-screen", true);
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

// Function to hide all cell door overlays
function hideAllCellDoors() {
  for (let i = 1; i <= 10; i++) cellDoorVisible[i] = false;
}

//------------------------------------------------------------------------------

class Neighbor {
  constructor(x, y, color, width, height, alive) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.alive = alive),
      (this.zLayer = 0),
      // Overwrite render to skip hitbox rendering unless debugging
      (this.render = function (ctx) {
        // Skip hitbox rendering unless debugging
      });
  }
}

class PooSpot {
  constructor(x, y, color, width, height, alive) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.alive = alive),
      (this.render = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      });
  }
}

class PowerUps {
  constructor(x, y, color, width, height, alive) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.alive = alive),
      (this.render = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      });
  }
}

class Dog {
  constructor(x, y, color, width, height, alive) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.alive = alive),
      (this.zLayer = 0),
      (this.render = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      });
  }
}

class Dad {
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
        // console.log('this is the key that was pressed', key)
        if (key.toLowerCase() == "w") {
          this.direction.up = true;
        }
        if (key.toLowerCase() == "a") {
          (this.direction.left = true), (playerState = "leftMove");
        }
        if (key.toLowerCase() == "s") {
          this.direction.down = true;
        }
        if (key.toLowerCase() == "d") {
          (this.direction.right = true), (playerState = "rightMove");
        }
      }),
      // unsetDirection will be tied to a keyUp event
      (this.unsetDirection = function (key) {
        // console.log('this is the key that was released', key)
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
        // movePlayer, sends our guy flying in whatever direction is true
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
        // Skip hitbox rendering unless debugging
      });
  }
}

// places ogres at random spots in the horizontal direction
// const randomPlaceShrekX = (max) => {
//     // we can use math random and canvas dimensions for this
//     return Math.floor(Math.random() * max)
// }

const player = new Dad(110, 200, "lightsteelblue", 20, 70);
const dog = new Dog(40, 205, dogImg, 20, 20, true);
const neighborOne = new Neighbor(200, 20, "#bada55", 32, 48);
const neighborTwo = new Neighbor(300, 20, "red", 32, 48);
const neighborThree = new Neighbor(450, 20, "red", 32, 48);
const neighborFour = new Neighbor(700, 20, "red", 32, 48);
const neighborFive = new Neighbor(100, 560, "red", 32, 48);
const neighborSix = new Neighbor(350, 560, "red", 32, 48);
const neighborSeven = new Neighbor(500, 570, "red", 32, 48);
const neighborEight = new Neighbor(700, 580, "red", 32, 48);
const n1Spot = new Neighbor(200, 40, "#bada55", 32, 48);
const n2Spot = new Neighbor(300, 40, "#bada55", 32, 48);
const n3Spot = new Neighbor(450, 40, "#bada55", 32, 48);
const n4Spot = new Neighbor(700, 40, "#bada55", 32, 48);
const n5Spot = new Neighbor(100, 550, "#bada55", 32, 48);
const n6Spot = new Neighbor(350, 550, "#bada55", 32, 48);
const n7Spot = new Neighbor(500, 560, "#bada55", 32, 48);
const n8Spot = new Neighbor(700, 570, "#bada55", 32, 48);
const pooSpot1 = new PooSpot(140, 175, "green", 56, 10);
const pooSpot2 = new PooSpot(288, 175, "brown", 56, 10);
const pooSpot3 = new PooSpot(440, 175, "brown", 56, 10);
const pooSpot4 = new PooSpot(710, 175, "brown", 56, 10);
const pooSpot5 = new PooSpot(140, 401, "brown", 56, 10);
const pooSpot6 = new PooSpot(288, 401, "brown", 56, 10);
const pooSpot7 = new PooSpot(440, 401, "brown", 56, 10);
const pooSpot8 = new PooSpot(708, 401, "brown", 56, 10);

const secondSpot1 = new PooSpot(140, 255, "green", 10, 10);
const secondSpot2 = new PooSpot(288, 255, "green", 10, 10);
const secondSpot3 = new PooSpot(440, 255, "green", 10, 10);
const secondSpot4 = new PooSpot(710, 255, "green", 10, 10);
const lastSpot = new PooSpot(10, 260, "green", 0, 12);

const dogSit = new Dog(20, 20, "white", 10, 10);
const redBull = new PowerUps(20, 120, "blue", 8, 18, true);
const slowDownClock = new PowerUps(20, 450, "orange", 8, 8, true);

let playerCarrying = null; // the neighbor being carried, or null if none

neighborOne.assignedCell = n1Spot;
n1Spot.occupied = true;
neighborOne.madeItToFirst = true;
neighborOne.madeItToSecond = true;

neighborTwo.assignedCell = n2Spot;
n2Spot.occupied = true;
neighborTwo.madeItToFirst = true;
neighborTwo.madeItToSecond = true;

neighborThree.assignedCell = n3Spot;
n3Spot.occupied = true;
neighborThree.madeItToFirst = true;
neighborThree.madeItToSecond = true;

neighborFour.assignedCell = n4Spot;
n4Spot.occupied = true;
neighborFour.madeItToFirst = true;
neighborFour.madeItToSecond = true;

neighborFive.assignedCell = n5Spot;
n5Spot.occupied = true;
neighborFive.madeItToFirst = true;
neighborFive.madeItToSecond = true;

neighborSix.assignedCell = n6Spot;
n6Spot.occupied = true;
neighborSix.madeItToFirst = true;
neighborSix.madeItToSecond = true;

neighborSeven.assignedCell = n7Spot;
n7Spot.occupied = true;
neighborSeven.madeItToFirst = true;
neighborSeven.madeItToSecond = true;

neighborEight.assignedCell = n8Spot;
n8Spot.occupied = true;
neighborEight.madeItToFirst = true;
neighborEight.madeItToSecond = true;


const cellToPooMap = new Map([
    [n1Spot, pooSpot1],
    [n2Spot, pooSpot2],
    [n3Spot, pooSpot3],
    [n4Spot, pooSpot4],
    [n5Spot, pooSpot5],
    [n6Spot, pooSpot6],
    [n7Spot, pooSpot7],
    [n8Spot, pooSpot8],
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
]);

neighborOne.returnedToCell = false;
neighborTwo.returnedToCell = false;
neighborThree.returnedToCell = false;
neighborFour.returnedToCell = false;
neighborFive.returnedToCell = false;
neighborSix.returnedToCell = false;
neighborSeven.returnedToCell = false;
neighborEight.returnedToCell = false;



neighborOne.isCaught = false;
neighborTwo.isCaught = false;
neighborThree.isCaught = false;
neighborFour.isCaught = false;
neighborFive.isCaught = false;
neighborSix.isCaught = false;
neighborSeven.isCaught = false;
neighborEight.isCaught = false;

 // where they were returned to
neighborOne.assignedCell = null;
neighborTwo.assignedCell = null;
neighborThree.assignedCell = null;
neighborFour.assignedCell = null;
neighborFive.assignedCell = null;
neighborSix.assignedCell = null;
neighborSeven.assignedCell = null;
neighborEight.assignedCell = null;


neighborOne.madeItToFirst = false;
neighborOne.madeItToSecond = false;
neighborTwo.madeItToFirst = false;
neighborTwo.madeItToSecond = false;
neighborThree.madeItToFirst = false;
neighborThree.madeItToSecond = false;
neighborFour.madeItToFirst = false;
neighborFour.madeItToSecond = false;
neighborFive.madeItToFirst = false;
neighborFive.madeItToSecond = false;
neighborSix.madeItToFirst = false;
neighborSix.madeItToSecond = false;
neighborSeven.madeItToFirst = false;
neighborSeven.madeItToSecond = false;
neighborEight.madeItToFirst = false;
neighborEight.madeItToSecond = false;

//randomPlaceShrekX(game.width)

const cellSpots = [n1Spot, n2Spot, n3Spot, n4Spot, n5Spot, n6Spot, n7Spot, n8Spot];
cellSpots.forEach((spot) => {
  spot.occupied = false;
});

dog.updatePosition = function (spotNum) {
  const diffX = spotNum.x - dog.x;
  const diffY = spotNum.y - dog.y;

  if (gameOn) {
    if (diffX > 0) (dog.x += dogSpeed), (dogState = "rightMove");
    else (dog.x -= dogSpeed), (dogState = "leftMove");

    if (diffY > 0) dog.y += dogSpeed;
    else dog.y -= dogSpeed;
  }
};

dog.updatePosition2 = function (spotNum) {
  const diffX = spotNum.x - dog.x;
  const diffY = spotNum.y - dog.y;
  if (diffX !== 0 || diffY !== 0) {
    if (diffX > 0) (dog.x += 10), (dogState = "rightMove");
    else (dog.x -= 10), (dogState = "leftMove");
    if (diffY > 0) dog.y += 9;
    else dog.y -= 9;
  } else {
    dog.x = 20;
    dog.y = 20;
    dogState = "sit";
  }
};

neighborOne.updatePosition = function (spotNum) {
    // 🚨 NeighborOne movement block running
    // Insert assignedPoo definition just before movement logic
    const diffX = spotNum.x - neighborOne.x;
    const diffY = spotNum.y - neighborOne.y;

    if (diffX > 0) {
      neighborOne.x += neighborSpeed;
    } else if (diffX < 0) {
      neighborOne.x -= neighborSpeed;
    }

    if (neighborOne.madeItToSecond || (diffX === 0 && diffY === 0)) {
      nbr1State = "downMove";
    } else if (diffY > 0) {
      neighborOne.y += neighborSpeed;
      nbr1State = "downMove";
    } else if (diffY < 0) {
      neighborOne.y -= neighborSpeed;
      nbr1State = "upMove";
    } else {
      // fallback to downMove just in case
      nbr1State = "downMove";
    }
  };



  neighborTwo.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborTwo.x;
    const diffY = spotNum.y - neighborTwo.y;
  
    if (diffX > 0) {
      neighborTwo.x += neighborSpeed;
    } else if (diffX < 0) {
      neighborTwo.x -= neighborSpeed;
    }
  
    if (neighborTwo.madeItToSecond || (diffX === 0 && diffY === 0)) {
      nbr2State = "downMove";
    } else if (diffY > 0) {
      neighborTwo.y += neighborSpeed;
      nbr2State = "downMove";
    } else if (diffY < 0) {
      neighborTwo.y -= neighborSpeed;
      nbr2State = "upMove";
    } else {
      nbr2State = "downMove";
    }
  };

  neighborThree.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborThree.x;
    const diffY = spotNum.y - neighborThree.y;
  
    if (diffX > 0) {
      neighborThree.x += neighborSpeed;
    } else if (diffX < 0) {
      neighborThree.x -= neighborSpeed;
    }
  
    if (neighborThree.madeItToSecond || (diffX === 0 && diffY === 0)) {
      nbr3State = "downMove";
    } else if (diffY > 0) {
      neighborThree.y += neighborSpeed;
      nbr3State = "downMove";
    } else if (diffY < 0) {
      neighborThree.y -= neighborSpeed;
      nbr3State = "upMove";
    } else {
      nbr3State = "downMove";
    }
  };
  neighborFour.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborFour.x;
    const diffY = spotNum.y - neighborFour.y;
  
    if (diffX > 0) {
      neighborFour.x += neighborSpeed;
    } else if (diffX < 0) {
      neighborFour.x -= neighborSpeed;
    }
  
    if (neighborFour.madeItToSecond || (diffX === 0 && diffY === 0)) {
      nbr4State = "downMove";
    } else if (diffY > 0) {
      neighborFour.y += neighborSpeed;
      nbr4State = "downMove";
    } else if (diffY < 0) {
      neighborFour.y -= neighborSpeed;
      nbr4State = "upMove";
    } else {
      nbr4State = "downMove";
    }
  };

  neighborFive.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborFive.x;
    const diffY = spotNum.y - neighborFive.y;
  
    if (diffX > 0) {
      neighborFive.x += neighborSpeed;
    } else if (diffX < 0) {
      neighborFive.x -= neighborSpeed;
    }
  
    if (neighborFive.madeItToSecond || (diffX === 0 && diffY === 0)) {
      nbr5State = "downMove";
    } else if (diffY > 0) {
      neighborFive.y += neighborSpeed;
      nbr5State = "downMove";
    } else if (diffY < 0) {
      neighborFive.y -= neighborSpeed;
      nbr5State = "upMove";
    } else {
      nbr5State = "downMove";
    }
  };

  neighborSix.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborSix.x;
    const diffY = spotNum.y - neighborSix.y;
  
    if (diffX > 0) {
      neighborSix.x += neighborSpeed;
    } else if (diffX < 0) {
      neighborSix.x -= neighborSpeed;
    }
  
    if (neighborSix.madeItToSecond || (diffX === 0 && diffY === 0)) {
      nbr6State = "downMove";
    } else if (diffY > 0) {
      neighborSix.y += neighborSpeed;
      nbr6State = "downMove";
    } else if (diffY < 0) {
      neighborSix.y -= neighborSpeed;
      nbr6State = "upMove";
    } else {
      nbr6State = "downMove";
    }
  };

  neighborSeven.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborSeven.x;
    const diffY = spotNum.y - neighborSeven.y;
  
    if (diffX > 0) {
      neighborSeven.x += neighborSpeed;
    } else if (diffX < 0) {
      neighborSeven.x -= neighborSpeed;
    }
  
    if (neighborSeven.madeItToSecond || (diffX === 0 && diffY === 0)) {
      nbr7State = "downMove";
    } else if (diffY > 0) {
      neighborSeven.y += neighborSpeed;
      nbr7State = "downMove";
    } else if (diffY < 0) {
      neighborSeven.y -= neighborSpeed;
      nbr7State = "upMove";
    } else {
      nbr7State = "downMove";
    }
  };

  neighborEight.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborEight.x;
    const diffY = spotNum.y - neighborEight.y;
  
    if (diffX > 0) {
      neighborEight.x += neighborSpeed;
    } else if (diffX < 0) {
      neighborEight.x -= neighborSpeed;
    }
  
    if (neighborEight.madeItToSecond || (diffX === 0 && diffY === 0)) {
      nbr8State = "downMove";
    } else if (diffY > 0) {
      neighborEight.y += neighborSpeed;
      nbr8State = "downMove";
    } else if (diffY < 0) {
      neighborEight.y -= neighborSpeed;
      nbr8State = "upMove";
    } else {
      nbr8State = "downMove";
    }
  };

// function that changes the player's direction
document.addEventListener("keydown", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection(e.key);
});
// function that stops player from going in specific direction
document.addEventListener("keyup", (e) => {
  // when a key is pressed, call the setDirection method
  if (["w", "a", "s", "d"].includes(e.key)) {
    player.unsetDirection(e.key);
  }
});

document.addEventListener("touchmove", (e) => {
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
    leftButton
  ) {
    player.setDirection("a");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    rightButton
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

upButton.addEventListener("touchstart", (e) => {
  player.setDirection("w");
  // e.touches[0].clientX += .01
  // e.touches[0].clienty += .05
  console.log(e, "this event");
});

downButton.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("s");
});

leftButton.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("a");
});

rightButton.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("d");
});

upButtonL.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  // player.setDirection('w')

  player.setDirection("w");
});

downButtonL.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("s");
});

leftButtonL.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("a");
});

rightButtonL.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("d");
});

document.addEventListener("touchend", (e) => {
  // when a key is pressed, call the setDirection method
  player.unsetDirection("w");
  player.unsetDirection("a");
  player.unsetDirection("s");
  player.unsetDirection("d");
});

topRightButton.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("d");
  player.setDirection("w");
});

topRightButtonL.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("d");
  player.setDirection("w");
});

bottomRightButton.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("d");
  player.setDirection("s");
});

bottomRightButtonL.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("d");
  player.setDirection("s");
});

bottomLeftButton.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("a");
  player.setDirection("s");
});

bottomLeftButtonL.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("a");
  player.setDirection("s");
});

topLeftButton.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("a");
  player.setDirection("w");
});

topLeftButtonL.addEventListener("touchstart", (e) => {
  // when a key is pressed, call the setDirection method
  player.setDirection("a");
  player.setDirection("w");
});


function detectHitPlayerToSpot(neighbor, spot) {
    if (
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
      playerCarrying = null;
    }
  }

const detectHitPlayer = (thing) => {
  if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y
  ) {
    thing.alive = false;
    score++;
    // pooSpotNotLit()
  }
};

// function detectHitPlayerNeighbor(neighbor) {
//     return (
//       player.x < neighbor.x + neighbor.width &&
//       player.x + player.width > neighbor.x &&
//       player.y < neighbor.y + neighbor.height &&
//       player.y + player.height > neighbor.y
//     );
//   }

const detectHitPlayerRed = (thing) => {
  if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y
  ) {
    thing.alive = false;
    redLife += 1;
    message.textContent = `YOU DRANK A REDBULL!!! Holy Crap! You're Fly'n!`;
    message2.textContent = `YOU DRANK A REDBULL!!! Holy Crap! You're Fly'n!`;
    message3.textContent = `YOU DRANK A REDBULL!!! Holy Crap! You're Fly'n!`;
    console.log(redLife, "redlife");
    redNotLit();
    drankOne();
  }
};

const detectHitPlayerClock = (thing) => {
  if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y
  ) {
    thing.alive = false;
    redLife += 1;
    message.textContent = `You Took A Chill Pill! everything is chill... chill...`;
    message2.textContent = `You Took A Chill Pill! everything is chill... chill...`;
    message3.textContent = `You Took A Chill Pill! everything is chill... chill...`;
    dogSpeed = 3;
    neighborSpeed = 0.005;
    player.speed = 5;
    clockNotLit();
    dogSlow();
    drankOne();
  }
};

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
    thing.alive = true;
    pooSpotLit();
  }
};


function cleanupEscapedNeighbors() {
    const allNeighbors = [neighborOne, neighborTwo, neighborThree, neighborFour, neighborFive, neighborSeven, neighborEight];
  
    for (const neighbor of allNeighbors) {
      if (neighbor.madeItToSecond && neighbor.assignedCell) {
        console.log(`💨 ${neighbor.name || "Neighbor"} has escaped. Clearing cell.`);
        neighbor.assignedCell.occupied = false;
        // neighbor.assignedCell = null;
      }
    }
  }

const detectHitNeighborOne = (thing) => {
    // Always define assignedPoo and secondSpot inside this function
    const cellSpot = neighborOne.assignedCell;
    const assignedPoo = cellToPooMap.get(cellSpot);
    const secondSpot = secondSpotMap.get(cellSpot);
    const hit = (
      neighborOne.x < thing.x + thing.width &&
      neighborOne.x + neighborOne.width > thing.x &&
      neighborOne.y < thing.y + thing.height &&
      neighborOne.y + neighborOne.height > thing.y
    );
    if (hit && thing === assignedPoo && !neighborOne.madeItToFirst) {
      neighborOne.updatePosition(secondSpot);
      neighborOne.madeItToFirst = true;
    } else if (hit && thing === secondSpot && !neighborOne.madeItToSecond) {
      neighborOne.updatePosition(lastSpot);
      neighborOne.madeItToSecond = true;
    } else {
        neighborOne.updatePosition(lastSpot);
      }
  };

  const detectHitNeighborTwo = (thing) => {
    const hit = (
      neighborTwo.x < thing.x + thing.width &&
      neighborTwo.x + neighborTwo.width > thing.x &&
      neighborTwo.y < thing.y + thing.height &&
      neighborTwo.y + neighborTwo.height > thing.y
    );
  
    if (hit && thing === pooSpot2 && !neighborTwo.madeItToFirst) {
      neighborTwo.madeItToFirst = true;
    } else if (hit && thing === secondSpot2 && !neighborTwo.madeItToSecond) {
      neighborTwo.madeItToSecond = true;
    }
  };
  
  const detectHitNeighborThree = (thing) => {
    const hit = (
      neighborThree.x < thing.x + thing.width &&
      neighborThree.x + neighborThree.width > thing.x &&
      neighborThree.y < thing.y + thing.height &&
      neighborThree.y + neighborThree.height > thing.y
    );
  
    if (hit && thing === pooSpot3 && !neighborThree.madeItToFirst) {
      neighborThree.madeItToFirst = true;
    } else if (hit && thing === secondSpot3 && !neighborThree.madeItToSecond) {
      neighborThree.madeItToSecond = true;
    }
  };
  
  const detectHitNeighborFour = (thing) => {
    const hit = (
      neighborFour.x < thing.x + thing.width &&
      neighborFour.x + neighborFour.width > thing.x &&
      neighborFour.y < thing.y + thing.height &&
      neighborFour.y + neighborFour.height > thing.y
    );
  
    if (hit && thing === pooSpot4 && !neighborFour.madeItToFirst) {
      neighborFour.madeItToFirst = true;
    } else if (hit && thing === secondSpot4 && !neighborFour.madeItToSecond) {
      neighborFour.madeItToSecond = true;
    }
  };
  
  const detectHitNeighborFive = (thing) => {
    const hit = (
      neighborFive.x < thing.x + thing.width &&
      neighborFive.x + neighborFive.width > thing.x &&
      neighborFive.y < thing.y + thing.height &&
      neighborFive.y + neighborFive.height > thing.y
    );
  
    if (hit && thing === pooSpot5 && !neighborFive.madeItToFirst) {
      neighborFive.madeItToFirst = true;
    } else if (hit && thing === secondSpot1 && !neighborFive.madeItToSecond) {
      neighborFive.madeItToSecond = true;
    }
  };
  
  const detectHitNeighborSix = (thing) => {
    const hit = (
      neighborSix.x < thing.x + thing.width &&
      neighborSix.x + neighborSix.width > thing.x &&
      neighborSix.y < thing.y + thing.height &&
      neighborSix.y + neighborSix.height > thing.y
    );
  
    if (hit && thing === pooSpot6 && !neighborSix.madeItToFirst) {
      neighborSix.madeItToFirst = true;
    } else if (hit && thing === secondSpot2 && !neighborSix.madeItToSecond) {
      neighborSix.madeItToSecond = true;
    }
  };
  
  const detectHitNeighborSeven = (thing) => {
    const hit = (
      neighborSeven.x < thing.x + thing.width &&
      neighborSeven.x + neighborSeven.width > thing.x &&
      neighborSeven.y < thing.y + thing.height &&
      neighborSeven.y + neighborSeven.height > thing.y
    );
  
    if (hit && thing === pooSpot7 && !neighborSeven.madeItToFirst) {
      neighborSeven.madeItToFirst = true;
    } else if (hit && thing === secondSpot3 && !neighborSeven.madeItToSecond) {
      neighborSeven.madeItToSecond = true;
    }
  };
  
  const detectHitNeighborEight = (thing) => {
    const hit = (
      neighborEight.x < thing.x + thing.width &&
      neighborEight.x + neighborEight.width > thing.x &&
      neighborEight.y < thing.y + thing.height &&
      neighborEight.y + neighborEight.height > thing.y
    );
  
    if (hit && thing === pooSpot8 && !neighborEight.madeItToFirst) {
      neighborEight.madeItToFirst = true;
    } else if (hit && thing === secondSpot4 && !neighborEight.madeItToSecond) {
      neighborEight.madeItToSecond = true;
    }
  };

function redLit() {
  redBullState = "onlyMove";
}

function redNotLit() {
  redBullState = "noMove";
}

function clockLit() {
  clockState = "onlyMove";
}

function clockNotLit() {
  clockState = "noMove";
}

function dogFast() {
  dogSpeed == 12;
  neighborSpeed == 2;
}

function dogSlow() {
  dogSpeed == 3;
}

function nbr1NotLit() {
  nbr1State = "noMove";
}

function nbr2NotLit() {
  nbr2State = "noMove";
}

function nbr3NotLit() {
  nbr3State = "noMove";
}

function nbr4NotLit() {
  nbr4State = "noMove";
}

function nbr5NotLit() {
  nbr5State = "noMove";
}

function nbr6NotLit() {
  nbr6State = "noMove";
}

function nbr7NotLit() {
  nbr7State = "noMove";
}

function nbr8NotLit() {
  nbr8State = "noMove";
}

function pooSpotLit() {
  pooState = "move";
}

function pooSpotNotLit() {
  pooState = "noMove";
}
// ---------------------------------------------------------------
// Return array of entities in z-depth order for rendering (sorted by Y position)
// Each entity is an object: { fn, y }

function detectHitPlayerNeighbor(neighbor) {
    if (
      player.x < neighbor.x + neighbor.width &&
      player.x + player.width > neighbor.x &&
      player.y < neighbor.y + neighbor.height &&
      player.y + player.height > neighbor.y
    ) {
      console.log('🎯 Player caught neighbor!');
      neighbor.isCaught = true;
      playerCarrying = neighbor;
    }
  }

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

    animEntity(animation24, 106), // wall top overlay (static, always on top or bottom as needed)

    // Cell doors 6-10 overlays (Y = 175)
    animEntity(animation19, 119), // cellDoorA6 overlay
    animEntity(animation20, 119), // cellDoorA7 overlay
    animEntity(animation21, 119), // cellDoorA8 overlay
    animEntity(animation22, 119), // cellDoorA9 overlay
    animEntity(animation23, 119), // cellDoorA10 overlay

    animEntity(animation2, player.y), // Dad (player)

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
    animEntity(animation12, neighborEight.y - neighborEight.height - 19), // prisoners front

    animEntity(animation, dog.y), // Dog
  ];
  // Sort by Y position ascending (lowest Y first, i.e., "farther back" first)
  arr.sort((a, b) => a.y - b.y);
  return arr;
}


neighborOne.homeCell = n1Spot;
neighborOne.assignedCell = neighborOne.homeCell;
neighborOne.assignedCell.occupied = true;

const gameLoop = () => {
  // make sure you don't have any console.logs in here
  // console.log('frame running')
  // Sync cell door overlays with pooSpot state
  syncCellDoorVisibility();

  ctx.clearRect(0, 0, game.width, game.height);
  scoreH2.innerText = `Poo Count:${score - 2}`;
  urScore.innerText = `You picked up ${score - 2} poos!`;
  urScore2.innerText = `You picked up ${score - 2} poos!
    That's Alot of Shit!`;
  urScore3.innerText = `You picked up ${score - 2} poos!`;
  urScore4.innerText = `You picked up ${score - 2} poos!`;

  if (score > 82) {
    movement.textContent = `You're On Your Own`;
  } else if (score > 57) {
    movement.textContent = `Poos Until Next Power Up: ${82 - score}`;
  } else if (score > 22) {
    movement.textContent = `Poos Until Next Power Up: ${57 - score}`;
  } else if (score <= 22) {
    movement.textContent = `Poos Until Next Power Up: ${22 - score}`;
  }

  //-----------------------------------------------------------------
  if (pooSpot1.alive) {
    detectHitPlayer(pooSpot1);
  }
  if (pooSpot2.alive) {
    detectHitPlayer(pooSpot2);
  }
  if (pooSpot3.alive) {
    detectHitPlayer(pooSpot3);
  }
  if (pooSpot4.alive) {
    detectHitPlayer(pooSpot4);
  }
  if (pooSpot5.alive) {
    detectHitPlayer(pooSpot5);
  }
  if (pooSpot6.alive) {
    detectHitPlayer(pooSpot6);
  }
  if (pooSpot7.alive) {
    detectHitPlayer(pooSpot7);
  }
  if (pooSpot8.alive) {
    detectHitPlayer(pooSpot8);
  }

// LoosePrisoner location

  if (!pooSpot4.alive && score % 2 == 0) {
    detectHitDog(pooSpot4);
    dog.updatePosition(pooSpot4);
  } else if (!pooSpot2.alive && score % 2 == 1) {
    dog.updatePosition(pooSpot2);
    detectHitDog(pooSpot2);
  } else if (!pooSpot3.alive && score % 2 == 0) {
    dog.updatePosition(pooSpot3);
    detectHitDog(pooSpot3);
  } else if (!pooSpot1.alive && score % 2 == 1) {
    dog.updatePosition(pooSpot1);
    detectHitDog(pooSpot1);
  } else if (!pooSpot5.alive && score % 2 == 0) {
    dog.updatePosition(pooSpot5);
    detectHitDog(pooSpot5);
  } else if (!pooSpot6.alive && score % 2 == 1) {
    dog.updatePosition(pooSpot6);
    detectHitDog(pooSpot6);
  } else if (!pooSpot7.alive && score % 2 == 0) {
    dog.updatePosition(pooSpot7);
    detectHitDog(pooSpot7);
  } else if (!pooSpot8.alive && score % 2 == 1) {
    dog.updatePosition(pooSpot8);
    detectHitDog(pooSpot8);
  } else {
    dog.updatePosition2(dogSit);
  }

// Cache assigned cell and related spots
const cellSpot = neighborOne.assignedCell;
const assignedPoo = cellToPooMap.get(cellSpot);
const secondSpot = secondSpotMap.get(cellSpot);

// // Escape cleanup: If poo is alive and neighbor is not caught, free the cell
// if (assignedPoo && assignedPoo.alive && !neighborOne.isCaught) {
//   cellSpot.occupied = false;
//   neighborOne.assignedCell = null;
// }

if (assignedPoo && assignedPoo.alive) {
    if (!neighborOne.madeItToFirst && !neighborOne.isCaught) {
      console.log('→ Moving to assignedPoo');
      neighborOne.updatePosition(assignedPoo);
      detectHitNeighborOne(assignedPoo); // 🔁 move here
    } else if (
      neighborOne.madeItToFirst &&
      !neighborOne.madeItToSecond &&
      !neighborOne.isCaught
    ) {
      neighborOne.updatePosition(secondSpot);
      detectHitNeighborOne(secondSpot); // 🔁 move here
    } else if (
      neighborOne.madeItToSecond &&
      !neighborOne.isCaught
    ) {
      console.log('→ Moving to lastSpot');
      neighborOne.updatePosition(lastSpot);
    }
  } else if (cellSpot && !neighborOne.madeItToSecond) {
    console.log('→ Moving to assignedCell');
    neighborOne.updatePosition(cellSpot);
  } else {
    neighborOne.updatePosition(n1Spot);
  }
// -----------------------------------------
 if (neighborOne.madeItToFirst && !neighborOne.isCaught) {
    detectHitPlayerNeighbor(neighborOne)
   }

  if (pooSpot2.alive) {
    if (
      !neighborTwo.madeItToFirst &&
      !neighborTwo.isCaught &&
      !neighborTwo.assignedCell
    ) {
      neighborTwo.updatePosition(pooSpot2);
    } else if (neighborTwo.assignedCell) {
      neighborTwo.updatePosition(neighborTwo.assignedCell);
    }
    detectHitNeighborTwo(pooSpot2);
  } else {
    neighborTwo.updatePosition(n2Spot);
  }
  
  if (pooSpot3.alive) {
    if (
      !neighborThree.madeItToFirst &&
      !neighborThree.isCaught &&
      !neighborThree.assignedCell
    ) {
      neighborThree.updatePosition(pooSpot3);
    } else if (neighborThree.assignedCell) {
      neighborThree.updatePosition(neighborThree.assignedCell);
    }
    detectHitNeighborThree(pooSpot3);
  } else {
    neighborThree.updatePosition(n3Spot);
  }
  
  if (pooSpot4.alive) {
    if (
      !neighborFour.madeItToFirst &&
      !neighborFour.isCaught &&
      !neighborFour.assignedCell
    ) {
      neighborFour.updatePosition(pooSpot4);
    } else if (neighborFour.assignedCell) {
      neighborFour.updatePosition(neighborFour.assignedCell);
    }
    detectHitNeighborFour(pooSpot4);
  } else {
    neighborFour.updatePosition(n4Spot);
  }
  
  if (pooSpot5.alive) {
    if (
      !neighborFive.madeItToFirst &&
      !neighborFive.isCaught &&
      !neighborFive.assignedCell
    ) {
      neighborFive.updatePosition(pooSpot5);
    } else if (neighborFive.assignedCell) {
      neighborFive.updatePosition(neighborFive.assignedCell);
    }
    detectHitNeighborFive(pooSpot5);
  } else {
    neighborFive.updatePosition(n5Spot);
  }
  
  if (pooSpot6.alive) {
    if (
      !neighborSix.madeItToFirst &&
      !neighborSix.isCaught &&
      !neighborSix.assignedCell
    ) {
      neighborSix.updatePosition(pooSpot6);
    } else if (neighborSix.assignedCell) {
      neighborSix.updatePosition(neighborSix.assignedCell);
    }
    detectHitNeighborSix(pooSpot6);
  } else {
    neighborSix.updatePosition(n6Spot);
  }
  
  if (pooSpot7.alive) {
    if (
      !neighborSeven.madeItToFirst &&
      !neighborSeven.isCaught &&
      !neighborSeven.assignedCell
    ) {
      neighborSeven.updatePosition(pooSpot7);
    } else if (neighborSeven.assignedCell) {
      neighborSeven.updatePosition(neighborSeven.assignedCell);
    }
    detectHitNeighborSeven(pooSpot7);
  } else {
    neighborSeven.updatePosition(n7Spot);
  }
  
  if (pooSpot8.alive) {
    if (
      !neighborEight.madeItToFirst &&
      !neighborEight.isCaught &&
      !neighborEight.assignedCell
    ) {
      neighborEight.updatePosition(pooSpot8);
    } else if (neighborEight.assignedCell) {
      neighborEight.updatePosition(neighborEight.assignedCell);
    }
    detectHitNeighborEight(pooSpot8);
  } else {
    neighborEight.updatePosition(n8Spot);
  }
  //------------------------------------------------------------
  if (score >= 101) {
    dogSpeed = 0.3;
    message.textContent = `Dude.`;
    message2.textContent = `Dude.`;
    message3.textContent = `Dude.`;
    neighborSpeed = 3;
  } else if (score >= 100) {
    dogSpeed = 0.7;
    neighborSpeed = 3;
    message.textContent = `Oh come on now....`;
    message2.textContent = `Oh come on now....`;
    message3.textContent = `Oh come on now....`;
  } else if (score >= 99) {
    dogSpeed = 1.1;
    neighborSpeed = 2;
    message.textContent = `Any Day Now...`;
    message2.textContent = `Any Day Now...`;
    message3.textContent = `Any Day Now...`;
  } else if (score >= 97) {
    dogSpeed = 2;
    neighborSpeed = 1;
    message.textContent = `Looks Like He's Almost Done!`;
    message2.textContent = `Looks Like He's Almost Done!`;
    message3.textContent = `Looks Like He's Almost Done!`;
  } else if (score >= 72) {
    neighborSpeed = 0.3;
    dogSpeed = 21;
  } else if (score == 61) {
    dogFast();
    neighborSpeed = 0.15;
  } else if (score >= 12) {
    neighborSpeed = 0.12;
    dogSpeed = 18;
  }

  if (score == 72) {
    message.textContent = `Ok Seriously, He's Gotta Be Done Soon Right?`;
    message2.textContent = `Ok Seriously, He's Gotta Be Done Soon Right?`;
  }

  if (score == 64) {
    message.textContent = `Reality Check! Nothing Is Chill!!!`;
    message2.textContent = `Reality Check! Nothing Is Chill!!!`;
    message3.textContent = `Reality Check! Nothing Is Chill!!!`;
  }

  if (score == 71) {
    message.textContent = `*nice*`;
    message2.textContent = `*nice*`;
    message3.textContent = `*nice*`;
  }
  //-------------------------------------------------------------------------------------------
  if (!redBull.alive) {
    redNotLit();
  }

  if (score >= 22 && redLife == 0 && redBull.alive) {
    // redBull.render()
    detectHitPlayerRed(redBull);
    redLit();
  }

  if (score == 82 && redLife == 2) {
    redBull.alive = true;
  }

  if (score >= 82 && redBull.alive) {
    // redBull.render()
    redLit();
    detectHitPlayerRed(redBull);
  }

  if (score >= 57 && slowDownClock.alive && redLife == 1) {
    // slowDownClock.render()
    clockLit();
    detectHitPlayerClock(slowDownClock);
  }

  if (!playerCarrying && neighborOne.madeItToFirst) {
    detectHitPlayerNeighbor(neighborOne);
  }
  
  if (!playerCarrying && neighborTwo.madeItToFirst) {
    detectHitPlayerNeighbor(neighborTwo);
  }
  
  if (!playerCarrying && neighborThree.madeItToFirst) {
    detectHitPlayerNeighbor(neighborThree);
  }
  
  if (!playerCarrying && neighborFour.madeItToFirst) {
    detectHitPlayerNeighbor(neighborFour);
  }
  
  if (!playerCarrying && neighborFive.madeItToFirst) {
    detectHitPlayerNeighbor(neighborFive);
  }
  
  if (!playerCarrying && neighborSix.madeItToFirst) {
    detectHitPlayerNeighbor(neighborSix);
  }
  
  if (!playerCarrying && neighborSeven.madeItToFirst) {
    detectHitPlayerNeighbor(neighborSeven);
  }
  
  if (!playerCarrying && neighborEight.madeItToFirst) {
    detectHitPlayerNeighbor(neighborEight);
  }

  if (neighborOne.isCaught) {
    neighborOne.x = player.x - 5;
    neighborOne.y = player.y - 5;
    for (const spot of cellSpots) {
        if (!spot.occupied) {
          detectHitPlayerToSpot(neighborOne, spot);
        }
      }
  }
  
  if (neighborTwo.isCaught) {
    neighborTwo.x = player.x - 5;
    neighborTwo.y = player.y - 5;
    for (const spot of cellSpots) {
        if (!spot.occupied) {
          detectHitPlayerToSpot(neighborTwo, spot);
        }
      }
  }
  if (neighborThree.isCaught) {
    neighborThree.x = player.x - 5;
    neighborThree.y = player.y - 5;
    for (const spot of cellSpots) {
        if (!spot.occupied) {
          detectHitPlayerToSpot(neighborThree, spot);
        }
      }
  }
  
  if (neighborFour.isCaught) {
    neighborFour.x = player.x - 5;
    neighborFour.y = player.y - 5;
    for (const spot of cellSpots) {
        if (!spot.occupied) {
          detectHitPlayerToSpot(neighborFour, spot);
        }
      }
  }
  if (neighborFive.isCaught) {
    neighborFive.x = player.x - 5;
    neighborFive.y = player.y - 5;
    for (const spot of cellSpots) {
        if (!spot.occupied) {
          detectHitPlayerToSpot(neighborFive, spot);
        }
      }
  }
  
  if (neighborSix.isCaught) {
    neighborSix.x = player.x - 5;
    neighborSix.y = player.y - 5;
    for (const spot of cellSpots) {
        if (!spot.occupied) {
          detectHitPlayerToSpot(neighborSix, spot);
        }
      }
  }
  if (neighborSeven.isCaught) {
    neighborSeven.x = player.x - 5;
    neighborSeven.y = player.y - 5;
    for (const spot of cellSpots) {
        if (!spot.occupied) {
          detectHitPlayerToSpot(neighborSeven, spot);
        }
      }
  }
  
  if (neighborEight.isCaught) {
    neighborEight.x = player.x - 5;
    neighborEight.y = player.y - 5;
    for (const spot of cellSpots) {
        if (!spot.occupied) {
          detectHitPlayerToSpot(neighborEight, spot);
        }
      }
  }




//   secondSpot1.render();
//   secondSpot2.render();
//   secondSpot3.render();
//   secondSpot4.render();
//   lastSpot.render();
cleanupEscapedNeighbors()
  player.movePlayer();
  // Only call animation3() and animation4() (RedBull and Clock) directly here.
  // All other animations/draws are handled in z-sorted entity loop below.
  animation3();
  animation4();

  // Draw all entities in z-sorted order, calling each entity's fn()
  const zEntities = getZSortedEntities();
  zEntities.forEach((e) => e.fn());

  // At this point, the player and all cell doors have been drawn in z-order.
  // No further draw calls overwrite the canvas after this loop.
  gameOverWin();
};
//-----------------------------------------------------------------
const stopGameLoop = () => {
  clearInterval(gameInterval);
};
const gameInterval = setInterval(gameLoop, 60);
gameInterval;
