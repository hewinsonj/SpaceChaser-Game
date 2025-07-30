import { gameState, cellDoorVisible, ctx, rukusMovingProgressBar } from "../gameState/gameState.js";
import { settings } from "../settings/settings.js";



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
const staggerFrames92 = 60;
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

function animation92(ctx, globalFrame) {
  const currentAnimation = spriteAnimations92[gameState.rukusSwitchAnimationState];
  if (!currentAnimation) return;
  const position = Math.floor(globalFrame / staggerFrames92) % currentAnimation.loc.length;
  const frameX = currentAnimation.loc[position].x;
  const frameY = currentAnimation.loc[position].y;
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
}

const exitSignImg = new Image();
const exitSignWidth = 800;
const exitSignHeight = 600;
const staggerFrames88 = 30;
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

gameState.exitSignState = "noMove"

function animation88(ctx, globalFrame) {
  const currentAnimation = spriteAnimations88[gameState.exitSignState];
  if (!currentAnimation) return;
  const position = Math.floor(globalFrame / staggerFrames88) % currentAnimation.loc.length;
  const frameX = currentAnimation.loc[position].x;
  const frameY = currentAnimation.loc[position].y;
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
}

const brokenSwitchAnimationImg = new Image();
const brokenSwitchAnimationWidth = 800;
const brokenSwitchAnimationHeight = 600;
const staggerFrames89 = 30;
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

gameState.brokenSwitchAnimationState = "noMove"
function animation89(ctx, globalFrame) {
  const currentAnimation = spriteAnimations89[gameState.brokenSwitchAnimationState];
  const position = Math.floor(globalFrame / staggerFrames89) % currentAnimation.loc.length;
  const frameX = currentAnimation.loc[position].x;
  const frameY = currentAnimation.loc[position].y;
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
}

const brokenSwitch2AnimationImg = new Image();
const brokenSwitch2AnimationWidth = 800;
const brokenSwitch2AnimationHeight = 600;
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

function animation118(ctx, globalFrame) {
  const currentAnimation = spriteAnimations118[gameState.brokenSwitch2AnimationState];
  const position = Math.floor(globalFrame / staggerFrames118) % currentAnimation.loc.length;
  const frameX = currentAnimation.loc[position].x;
  const frameY = currentAnimation.loc[position].y;
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
}

const lastDoorAlarmAnimationImg = new Image();
const lastDoorAlarmAnimationWidth = 800;
const lastDoorAlarmAnimationHeight = 600;
const staggerFrames93 = 30;
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

function animation93(ctx, globalFrame) {
  const currentAnimation = spriteAnimations93[settings.lastDoorAlarmAnimationState];

  if (!currentAnimation) {
    return;
  }

  const position =
    Math.floor(globalFrame / staggerFrames93) %
    currentAnimation.loc.length;

  const frameX = currentAnimation.loc[position].x;
  const frameY = currentAnimation.loc[position].y;

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
}

const bigDoorAlarmAnimationImg = new Image();
const bigDoorAlarmAnimationWidth = 800;
const bigDoorAlarmAnimationHeight = 600;
const staggerFrames95 = 30;
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

settings.bigDoorAlarmAnimationState = "closedLights";


function animation95(ctx, globalFrame) {
  const currentAnimation = spriteAnimations95[settings.bigDoorAlarmAnimationState];

  

  const position = Math.floor(globalFrame / staggerFrames95) % currentAnimation.loc.length;
  
  if (!currentAnimation) {
    return;
  }
  const frameX = currentAnimation.loc[position].x;
  const frameY = currentAnimation.loc[position].y;

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
}

const rukusBarImg = new Image();
const rukusBarWidth = 800;
const rukusBarHeight = 600;
const staggerFrames99 = 30;
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

function animation99(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames99) %
    spriteAnimations99[gameState.rukusBarState].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}

const guardProgressBarEndCapImg = new Image();
const guardProgressBarEndCapWidth = 800;
const guardProgressBarEndCapHeight = 600;
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

function animation110(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames110) %
    spriteAnimations110[gameState.guardProgressBarEndCapState].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}

const rukusMovingProgressBarImg = new Image();
const rukusMovingProgressBarWidth = 800;
const rukusMovingProgressBarHeight = 600;
const staggerFrames111 = 30;
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

gameState.rukusMovingProgressBarState = "move"
function animation111(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames111) %
    spriteAnimations111[gameState.rukusMovingProgressBarState].loc.length;
  let frameX = rukusMovingProgressBarWidth * position;
  let frameY = 0;
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
}

const guardBarImg = new Image();
const guardBarWidth = 800;
const guardBarHeight = 600;
const staggerFrames100 = 30;
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

function animation100(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames100) %
    spriteAnimations100[gameState.guardBarState].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}


const explosionImg = new Image();
const explosionWidth = 800;
const explosionHeight = 600;
const staggerFrames120 = 50;
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

function animation120(ctx, globalFrame) {
  const totalFrames = spriteAnimations120[gameState.explosionState].loc.length;
  const position = Math.floor(globalFrame / staggerFrames120) % totalFrames;

  const { x, y } = spriteAnimations120[gameState.explosionState].loc[position];

  ctx.drawImage(
    explosionImg,
    x,
    y,
    explosionWidth,
    explosionHeight,
    0,
    0,
    explosionWidth,
    explosionHeight
  );
}


// ------------------------------------------------------
const cell1Img = new Image();
const cell1Width = 800;
const cell1Height = 600;
const staggerFrames14 = 30;
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

function animation14(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames14) %
    spriteAnimations14[gameState.cell1State].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}

const backgroundEndCapImg = new Image();
const backgroundEndCapWidth = 1536;
const backgroundEndCapHeight = 1024;
const staggerFrames112 = 30;
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

function animation112(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames112) %
    spriteAnimations112[gameState.backgroundEndCapState].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}

// --------------------------------------------------------------------------
// Wall Top Animation (cellWallTopA1.png)
const wallTopImg = new Image();
const wallTopWidth = 800;
const wallTopHeight = 600;
const staggerFrames24 = 30;
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

function animation24(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames24) %
    spriteAnimations24[gameState.wallTopState].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}

// --------------------------------------------------------------------------
// Wall Bottom Animation (cellWallBottomA1.png)
const wallBottomImg = new Image();
const wallBottomWidth = 800;
const wallBottomHeight = 600;
const staggerFrames25 = 30;
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

function animation25(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames25) %
    spriteAnimations25[gameState.wallBottomState].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}

const cell2Img = new Image();
const cell2Width = 800;
const cell2Height = 600;
const staggerFrames15 = 30;
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
function animation15(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames15) %
    spriteAnimations15[gameState.cell2State].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}

const cell3Img = new Image();
const cell3Width = 800;
const cell3Height = 600;
const staggerFrames16 = 30;
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
function animation16(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames16) %
    spriteAnimations16[gameState.cell3State].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}

const cell4Img = new Image();
const cell4Width = 800;
const cell4Height = 600;
const staggerFrames17 = 30;
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
function animation17(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames17) %
    spriteAnimations17[gameState.cell4State].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}

const cell5Img = new Image();
const cell5Width = 800;
const cell5Height = 600;
const staggerFrames18 = 30;
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
function animation18(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames18) %
    spriteAnimations18[gameState.cell5State].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}

const cell6Img = new Image();
const cell6Width = 800;
const cell6Height = 600;
const staggerFrames19 = 30;
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
function animation19(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames19) %
    spriteAnimations19[gameState.cell6State].loc.length;
  let frameX = 0;
  let frameY = 0;
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
}

const cell7Img = new Image();
const cell7Width = 800;
const cell7Height = 600;
const staggerFrames20 = 30;
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
function animation20(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames20) %
    spriteAnimations20[gameState.cell7State].loc.length;
  let frameX = 0;
  let frameY = 0
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
}

const cell8Img = new Image();
const cell8Width = 800;
const cell8Height = 600;
const staggerFrames21 = 30;
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
function animation21(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames21) %
    spriteAnimations21[cell8State].loc.length;
  let frameX = 0
  let frameY = 0
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
}

const cell9Img = new Image();
const cell9Width = 800;
const cell9Height = 600;
const staggerFrames22 = 30;
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
function animation22(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames22) %
    spriteAnimations22[cell9State].loc.length;
  let frameX = 0
  let frameY = 0
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
}

const cell10Img = new Image();
const cell10Width = 800;
const cell10Height = 600;
const staggerFrames23 = 30;
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
function animation23(ctx, globalFrame) {
  let position =
    Math.floor(globalFrame / staggerFrames23) %
    spriteAnimations23[cell10State].loc.length;
  let frameX = 0
  let frameY = 0
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
}



export {
    staggerFrames120,
    spriteAnimations120,
    setWallTopState,
    setCell7State,
    setRukusSwitchAnimationState,
    setBrokenSwitchAnimationState,
    setBrokenSwitch2AnimationState,
    setExitSignState,
    animation14,
    animation15,
    animation16,
    animation17,
    animation18,
    animation19,
    animation20,
    animation21,
    animation22,
    animation23,
    animation24,
    animation25,
    animation88,
    animation89,
    animation92,
    animation93,
    animation95,
    animation99,
    animation100,
    animation110,
    animation111,
    animation112,
    animation118,
    animation120,
    cell7Img,
};