// Returns all renderable entities sorted by their .y property (for z-sorting)
function getZSortedEntities() {
  const entities = [
    player,
    dog,
    neighborOne,
    neighborTwo,
    neighborThree,
    neighborFour,
    neighborFive,
    pooSpot1,
    pooSpot2,
    pooSpot3,
    pooSpot4,
    pooSpot5,
    pooSpot6,
    pooSpot7,
    pooSpot8
  ];
  return entities.sort((a, b) => a.y - b.y);
}
// Show only cellDoor4 and cellDoor7 at game start
let gameStarted = false;
function showInitialCellDoors() {
  // Hide all cell doors first
  if (cellDoor1) cellDoor1.style.display = 'none';
  if (cellDoor2) cellDoor2.style.display = 'none';
  if (cellDoor3) cellDoor3.style.display = 'none';
  if (cellDoor4) cellDoor4.style.display = 'block';
  if (cellDoor5) cellDoor5.style.display = 'none';
  if (cellDoor6) cellDoor6.style.display = 'none';
  if (cellDoor7) cellDoor7.style.display = 'block';
  if (cellDoor8) cellDoor8.style.display = 'none';
  if (cellDoor9) cellDoor9.style.display = 'none';
  if (cellDoor10) cellDoor10.style.display = 'none';
}
const game = document.getElementById('canvas')
// Cell Door overlay DOM reference and visibility state tracker
const cellDoor1 = document.getElementById('cellDoor1');
const cellDoor2 = document.getElementById('cellDoor2');
const cellDoor3 = document.getElementById('cellDoor3');
const cellDoor4 = document.getElementById('cellDoor4');
const cellDoor5 = document.getElementById('cellDoor5');
const cellDoor6 = document.getElementById('cellDoor6');
const cellDoor7 = document.getElementById('cellDoor7');
const cellDoor8 = document.getElementById('cellDoor8');
const cellDoor9 = document.getElementById('cellDoor9');
const cellDoor10 = document.getElementById('cellDoor10');

let lastVisibleDoors = [false, false, false, false, false, false, false, false, false, false, false];
// Cell doors are visible unless their corresponding pooSpot is alive
function updateCellDoor() {
  if (!gameStarted || gameOver) return;
  const checks = [
    { spot: pooSpot1, door: cellDoor10, index: 10 },
    { spot: pooSpot2, door: cellDoor9, index: 9 },
    { spot: pooSpot3, door: cellDoor8, index: 8 },
    { spot: pooSpot4, door: cellDoor6, index: 7 },
    { spot: pooSpot5, door: cellDoor1, index: 6 },
    { spot: pooSpot6, door: cellDoor2, index: 4 },
    { spot: pooSpot7, door: cellDoor3, index: 3 },
    { spot: pooSpot8, door: cellDoor5, index: 2 },
  ];

  for (const { spot, door, index } of checks) {
    if (spot.alive) {
      door.style.display = 'none';
      lastVisibleDoors[index] = false;
    } else {
      door.style.display = 'block';
      lastVisibleDoors[index] = true;
    }
  }
}
const movement = document.getElementById('movement')
const message = document.getElementById('status')
const message3 = document.getElementById('status3')
const message2 = document.getElementById('status2')
const gOScreen = document.getElementById('game-over-screen')
const scoreH2 = document.getElementById('score-h2') 
const urScore = document.getElementById('urScore') 
const urScore3 = document.getElementById('urScore3') 
const urScoreCon3 = document.getElementById('urScoreCon3')
const urScoreCon2 = document.getElementById('urScoreCon2') 
const urScore4 = document.getElementById('urScore4') 
const urScore2 = document.getElementById('urScore2')
const upButton = document.getElementById('upButton')
const downButton = document.getElementById('downButton')
const leftButton = document.getElementById('leftButton')
const rightButton = document.getElementById('rightButton')
const topRightButton = document.getElementById('topRightButton')
const bottomRightButton = document.getElementById('bottomRightButton')
const topLeftButton = document.getElementById('topLeftButton')
const bottomLeftButton = document.getElementById('bottomLeftButton')
const topRightArrow = document.getElementById('topRightArrow')
const bottomRightArrow = document.getElementById('bottomRightArrow')
const topLeftArrow = document.getElementById('topLeftArrow')
const bottomLeftArrow = document.getElementById('bottomLeftArrow')
const upButtonL = document.getElementById('upButtonL')
const downButtonL = document.getElementById('downButtonL')
const leftButtonL = document.getElementById('leftButtonL')
const rightButtonL = document.getElementById('rightButtonL')
const topRightButtonL = document.getElementById('topRightButtonL')
const bottomRightButtonL = document.getElementById('bottomRightButtonL')
const topLeftButtonL = document.getElementById('topLeftButtonL')
const bottomLeftButtonL = document.getElementById('bottomLeftButtonL')
const topRightArrowL = document.getElementById('topRightArrowL')
const bottomRightArrowL = document.getElementById('bottomRightArrowL')
const topLeftArrowL = document.getElementById('topLeftArrowL')
const bottomLeftArrowL = document.getElementById('bottomLeftArrowL')
const music = document.getElementById('music')


function play() {
    music.play();
    music.volume = 0.009;
    }

function pause() {
    music.pause();
    }



const ctx = game.getContext('2d')
const cWidth = game.width = 800
const cHeight = game.height = 600
let score = 2
let dogSpeed = 10
let neighborSpeed = .1
let redLife = 0
let gameOn = false
let gameOver = false
// player.speed = 8
// const cWidth = innerWidth
// const cHeight = innerHeight

const dogImg = new Image();
const dogWidth = 64;
const dogHeight = 64;
let gameFrame = 0;
const staggerFrames = 1000;
const spriteAnimations= [];
dogState = 'leftMove';
// dogImg.src = 'poopickerdogfinal9.png';
dogImg.src = 'SpaceChaserSprites/alienRukussmall.png';

const playerImg = new Image();
const playerWidth = 89;
const playerHeight = 89;
let gameFrame2 = 0;
const staggerFrames2 = 10000;
const spriteAnimations2= [];
playerState = 'rightMove';
// playerImg.src = 'poopickerdadthisone9.png';
playerImg.src = 'SpaceChaserSprites/guardRunningSmallFinal.png';


const redBullImg = new Image();
const redBullWidth = 89;
const redBullHeight = 89;
let gameFrame3 = 0;
const staggerFrames3 = 400;
const spriteAnimations3= [];
redBullState = 'noMove';
redBullImg.src = `poopickerredbullfinal9.png`;

const clockImg = new Image();
const clockWidth = 240;
const clockHeight = 240;
let gameFrame4 = 0;
const staggerFrames4 = 1000;
const spriteAnimations4= [];
clockState = 'noMove';
clockImg.src = `poopickerpeoplepillfinal9.png`;


const nbr1Img = new Image();
const nbr1Width = 75;
const nbr1Height = 75;
let gameFrame5 = 0;
const staggerFrames5 = 10000;
const spriteAnimations5= [];
nbr1State = 'noMove';
nbr1Img.src = `SpaceChaserSprites/alienPrisoner113.png`;

const nbr2Img = new Image();
const nbr2Width = 105;
const nbr2Height = 105;
let gameFrame6 = 0;
const staggerFrames6 = 10000;
const spriteAnimations6= [];
nbr2State = 'noMove';
nbr2Img.src = `SpaceChaserSprites/alienPrisoner231.png`;

const nbr3Img = new Image();
const nbr3Width = 260;
const nbr3Height = 260;
let gameFrame7 = 0;
const staggerFrames7 = 10000;
const spriteAnimations7= [];
nbr3State = 'noMove';
nbr3Img.src = `SpaceChaserSprites/alienPrisoner121.png`;

const nbr4Img = new Image();
const nbr4Width = 190;
const nbr4Height = 190;
let gameFrame8 = 0;
const staggerFrames8 = 10000;
const spriteAnimations8= [];
nbr4State = 'noMove';
nbr4Img.src = `SpaceChaserSprites/alienPrisoner104.png`;

const nbr5Img = new Image();
const nbr5Width = 100;
const nbr5Height = 100;
let gameFrame9 = 0;
const staggerFrames9 = 10000;
const spriteAnimations9= [];
nbr5State = 'noMove';
nbr5Img.src = `SpaceChaserSprites/alienPrisoner87.png`;

const nbr6Img = new Image();
const nbr6Width = 90;
const nbr6Height = 90;
let gameFrame10 = 0;
const staggerFrames10 = 10000;
const spriteAnimations10= [];
nbr6State = 'noMove';
nbr6Img.src = `SpaceChaserSprites/alienPrisoner808.png`;

const nbr7Img = new Image();
const nbr7Width = 110;
const nbr7Height = 110;
let gameFrame11 = 0;
const staggerFrames11 = 10000;
const spriteAnimations11= [];
nbr7State = 'noMove';
nbr7Img.src = `SpaceChaserSprites/alienPrisoner2123.png`;

const nbr8Img = new Image();
const nbr8Width = 170;
const nbr8Height = 170;
let gameFrame12 = 0;
const staggerFrames12 = 10000;
const spriteAnimations12= [];
nbr8State = 'noMove';
nbr8Img.src = `SpaceChaserSprites/alienPrisoner987.png`;


const pooImg = new Image();
const pooWidth = 178;
const pooHeight = 178;
let gameFrame13 = 0;
const staggerFrames13 = 10000;
const spriteAnimations13= [];
pooState = 'noMove';
pooImg.src = `poopickerpeoplepoop9.png`;


//----------------------------------------------------------------------------------------------------
const animationStates13 = [
    {
        name: 'move',
        frames: 4,
    },
    {
        name: 'noMove',
        frames: 1,
    }
];

animationStates13.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * pooWidth;
        let positionY = index * pooHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations13[state.name] = frames;
});

function animation13(){
    
    
    let position = Math.floor(gameFrame13/staggerFrames13) % spriteAnimations13[pooState].loc.length;
    let frameX = pooWidth * position;
    let frameY = spriteAnimations13[pooState].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation13)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    if(pooSpot1.alive){
    ctx.drawImage(pooImg, frameX, frameY, pooWidth, pooHeight, pooSpot1.x - 39, pooSpot1.y - 40 , 90, 90)
    }
    if(pooSpot2.alive){
    ctx.drawImage(pooImg, frameX, frameY, pooWidth, pooHeight, pooSpot2.x - 39, pooSpot2.y - 40 , 90, 90)
    }
    if(pooSpot3.alive){
    ctx.drawImage(pooImg, frameX, frameY, pooWidth, pooHeight, pooSpot3.x - 39, pooSpot3.y - 40 , 90, 90)
    }
    if(pooSpot4.alive){
    ctx.drawImage(pooImg, frameX, frameY, pooWidth, pooHeight, pooSpot4.x - 39, pooSpot4.y - 40 , 90, 90)
    }
    if(pooSpot5.alive){
    ctx.drawImage(pooImg, frameX, frameY, pooWidth, pooHeight, pooSpot5.x - 39, pooSpot5.y - 40 , 90, 90)
    }
    if(pooSpot6.alive){
    ctx.drawImage(pooImg, frameX, frameY, pooWidth, pooHeight, pooSpot6.x - 39, pooSpot6.y - 40 , 90, 90)
    }
    if(pooSpot7.alive){
    ctx.drawImage(pooImg, frameX, frameY, pooWidth, pooHeight, pooSpot7.x - 39, pooSpot7.y - 40 , 90, 90)
    }
    if(pooSpot8.alive){
    ctx.drawImage(pooImg, frameX, frameY, pooWidth, pooHeight, pooSpot8.x - 39, pooSpot8.y - 40 , 90, 90)
    }
    // ctx.drawImage(pooImg, frameX, frameY, pooWidth, pooHeight, pooSpot2.x - 35, pooSpot2.y - 115, 90, 90)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame13++;
    
};

//----------------------------------------------------------------------------------------------------
const animationStates12 = [
    {
        name: 'downMove',
        frames: 4,
    },
    {
        name: 'upMove',
        frames: 4,
    },
    {
        name: 'noMove',
        frames: 1,
    }
    

];

animationStates12.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * nbr8Width;
        let positionY = index * nbr8Height;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations12[state.name] = frames;
});

function animation12(){
    
    
    let position = Math.floor(gameFrame12/staggerFrames12) % spriteAnimations12[nbr8State].loc.length;
    let frameX = nbr8Width * position;
    let frameY = spriteAnimations12[nbr8State].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation12)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(nbr8Img, frameX, frameY, nbr8Width, nbr8Height, neighborEight.x - 35, neighborEight.y - 115, 123, 123)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame12++;
    
};



//----------------------------------------------------------------------------------------------------
const animationStates11 = [
    {
        name: 'downMove',
        frames: 5,
    },
    {
        name: 'upMove',
        frames: 5,
    },
    {
        name: 'noMove',
        frames: 1,
    }
    

];

animationStates11.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * nbr7Width;
        let positionY = index * nbr7Height;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations11[state.name] = frames;
});

function animation11(){
    
    
    let position = Math.floor(gameFrame11/staggerFrames11) % spriteAnimations11[nbr7State].loc.length;
    let frameX = nbr7Width * position;
    let frameY = spriteAnimations11[nbr7State].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation11)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(nbr7Img, frameX, frameY, nbr7Width, nbr7Height, neighborSeven.x - 35, neighborSeven.y - 75, 85, 85)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame11++;
    
};


//----------------------------------------------------------------------------------------------------
const animationStates10 = [
    {
        name: 'downMove',
        frames: 4,
    },
    {
        name: 'upMove',
        frames: 4,
    },
    {
        name: 'noMove',
        frames: 1,
    }
    

];

animationStates10.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * nbr6Width;
        let positionY = index * nbr6Height;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations10[state.name] = frames;
});

function animation10(){
    
    
    let position = Math.floor(gameFrame10/staggerFrames10) % spriteAnimations10[nbr6State].loc.length;
    let frameX = nbr6Width * position;
    let frameY = spriteAnimations10[nbr6State].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation10)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(nbr6Img, frameX, frameY, nbr6Width, nbr6Height, neighborSix.x - 35, neighborSix.y - 69, 75, 75)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame10++;
    
};

//-------------------------------------------------------------------------------------------

const animationStates9 = [
    {
        name: 'downMove',
        frames: 4,
    },
    {
        name: 'upMove',
        frames: 4,
    },
    {
        name: 'noMove',
        frames: 1,
    }
    

];

animationStates9.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * nbr5Width;
        let positionY = index * nbr5Height;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations9[state.name] = frames;
});

function animation9(){
    
    
    let position = Math.floor(gameFrame9/staggerFrames9) % spriteAnimations9[nbr5State].loc.length;
    let frameX = nbr5Width * position;
    let frameY = spriteAnimations9[nbr5State].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation9)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(nbr5Img, frameX, frameY, nbr5Width, nbr5Height, neighborFive.x - 35, neighborFive.y - 79, 85, 85)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame9++;
    
};

//------------------------------------------------------------------------------------------
const animationStates8 = [
    {
        name: 'downMove',
        frames: 4,
    },
    {
        name: 'upMove',
        frames: 4,
    },
    {
        name: 'noMove',
        frames: 1,
    }
    

];

animationStates8.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * nbr4Width;
        let positionY = index * nbr4Height;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations8[state.name] = frames;
});

function animation8(){
    
    
    let position = Math.floor(gameFrame8/staggerFrames8) % spriteAnimations8[nbr4State].loc.length;
    let frameX = nbr4Width * position;
    let frameY = spriteAnimations8[nbr4State].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation8)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(nbr4Img, frameX, frameY, nbr4Width, nbr4Height, neighborFour.x - 35, neighborFour.y - 45, 100, 100)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame8++;
    
};

//---------------------------------------------------------------------
const animationStates7 = [
    {
        name: 'downMove',
        frames: 8,
    },
    {
        name: 'upMove',
        frames: 8,
    },
    {
        name: 'noMove',
        frames: 1,
    }
    

];

animationStates7.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * nbr3Width;
        let positionY = index * nbr3Height;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations7[state.name] = frames;
});

function animation7(){
    
    
    let position = Math.floor(gameFrame7/staggerFrames7) % spriteAnimations7[nbr3State].loc.length;
    let frameX = nbr3Width * position;
    let frameY = spriteAnimations7[nbr3State].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation7)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(nbr3Img, frameX, frameY, nbr3Width, nbr3Height, neighborThree.x - 28, neighborThree.y - 35, 89, 89)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame7++;
    
};

//------------------------------------------------------------------------

const animationStates6 = [
    {
        name: 'downMove',
        frames: 4,
    },
    {
        name: 'upMove',
        frames: 4,
    },
    {
        name: 'noMove',
        frames: 1,
    }
    

];

animationStates6.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * nbr2Width;
        let positionY = index * nbr2Height;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations6[state.name] = frames;
});

function animation6(){
    
    
    let position = Math.floor(gameFrame6/staggerFrames6) % spriteAnimations6[nbr2State].loc.length;
    let frameX = nbr2Width * position;
    let frameY = spriteAnimations6[nbr2State].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation6)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(nbr2Img, frameX, frameY, nbr2Width, nbr2Height, neighborTwo.x - 28, neighborTwo.y - 25, 80, 80)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame6++;
    
};
//--------------------------------------------------------------

const animationStates5 = [
    {
        name: 'downMove',
        frames: 4,
    },
    {
        name: 'upMove',
        frames: 4,
    },
    {
        name: 'noMove',
        frames: 1,
    }
    

];

animationStates5.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * nbr1Width;
        let positionY = index * nbr1Height;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations5[state.name] = frames;
});

function animation5(){
    
    
    let position = Math.floor(gameFrame5/staggerFrames5) % spriteAnimations5[nbr1State].loc.length;
    let frameX = nbr1Width * position;
    let frameY = spriteAnimations5[nbr1State].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation5)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(nbr1Img, frameX, frameY, nbr1Width, nbr1Height, neighborOne.x - 25, neighborOne.y - 25, 80, 80)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame5++;
    
};
//------------------------------------------------------------

const animationStates4 = [
    {
        name: 'onlyMove',
        frames: 4,
    },
    {
        name: 'noMove',
        frames: 1,
    }

];

animationStates4.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * clockWidth;
        let positionY = index * clockHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations4[state.name] = frames;
});

function animation4(){
    
    
    let position = Math.floor(gameFrame4/staggerFrames4) % spriteAnimations4[clockState].loc.length;
    let frameX = clockWidth * position;
    let frameY = spriteAnimations4[clockState].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation4)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(clockImg, frameX, frameY, clockWidth, clockHeight, slowDownClock.x - 56, slowDownClock.y - 63, 120, 120)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame4++;
    
}
// -----------------------------------------------------------

const animationStates3 = [
    {
        name: 'onlyMove',
        frames: 7,
    },
    {
        name: 'noMove',
        frames: 1,
    }

];

animationStates3.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * redBullWidth;
        let positionY = index * redBullHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations3[state.name] = frames;
});

function animation3(){
    
    
    let position = Math.floor(gameFrame3/staggerFrames3) % spriteAnimations3[redBullState].loc.length;
    let frameX = redBullWidth * position;
    let frameY = spriteAnimations3[redBullState].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation3)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(redBullImg, frameX, frameY, redBullWidth, redBullHeight, redBull.x - 60, redBull.y - 50, 120, 120)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame3++;
    
};

// -----------------------------------------------------------

const animationStates = [
    {
        name: 'rightMove',
        frames: 8,
    },
    {
        name: 'leftMove',
        frames: 8,
    },
    {
        name: 'sit',
        frames: 1,
    }
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * dogWidth;
        let positionY = index * dogHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});

function animation(){
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[dogState].loc.length;
    let frameX = dogWidth * position;
    let frameY = spriteAnimations[dogState].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(dogImg, frameX, frameY, dogWidth, dogHeight, dog.x - 15, dog.y - 19, 50, 50)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame++;
}
// -------------------------------------------------------------
const animationStates2 = [
    {
        name: 'leftMove',
        frames: 8,
    },
    {
        name: 'rightMove',
        frames: 8,
    }

];

animationStates2.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * playerWidth;
        let positionY = index * playerHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations2[state.name] = frames;
});

function animation2(){
    let position = Math.floor(gameFrame2/staggerFrames2) % spriteAnimations2[playerState].loc.length;
    let frameX = playerWidth * position;
    let frameY = spriteAnimations2[playerState].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    requestAnimationFrame(animation2)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(playerImg, frameX, frameY, playerWidth, playerHeight, (player.x -24), player.y - 10, 80, 80)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }
    gameFrame2++;
}

// --------------------------------------------------------

function drankOne() {
    if(redLife == 3){
    player.speed = 13;
    } else if (redLife == 2){
        player.speed = 9
    }else if (redLife == 1){
        player.speed = 13
    }
}

const toggleScreen = (id, toggle) => {
    let element = document.getElementById(id);
    let display = ( toggle ) ? 'flex' : 'none';
    element.style.display = display;
}

const toggleScreenCon = (id, toggle) => {
    let element = document.getElementById(id);
    let display = ( toggle ) ? 'block' : 'none';
    element.style.display = display;
}

const toggleButtons = (id, toggle) => {
    let element = document.getElementById(id);
    let display = ( toggle ) ? 'block' : 'none';
    element.style.display = display;
}

window.addEventListener("resize", windowResize)

function windowResize() {
    // console.log(gameOn, ' is game on?')
    if(gameOn == true){
        if(window.innerWidth <= 500) {
            toggleScreenCon('urScoreCon2', true);
            toggleScreenCon('urScoreCon3', false);
            toggleScreenCon('status', true);
            toggleScreenCon('status2', false);
            
        } else {
            toggleScreenCon('urScoreCon3', true); 
            toggleScreenCon('urScoreCon2', false);
            toggleScreenCon('status', false);
            toggleScreenCon('status2', true);
        }
    } else {
        toggleScreenCon('urScoreCon3', false); 
        toggleScreenCon('urScoreCon2', false);
        toggleScreenCon('status', false);
        toggleScreenCon('status2', false);
        // window.location.reload()
    }
    // if(player.score <= 3){
        
    // }
}

function refreshPage() {
    window.location.reload()
}

const startGame = () => {
    console.log('Start Game')
    gameStarted = true;
    toggleScreen('start-screen', false);
    toggleScreen('game-over-screen', false);
    toggleScreen('canvas', true);
    toggleScreen('top-left', true);
    toggleScreen('top-right', true);
    toggleScreen('btm-left', true);
    toggleScreen('btm-right', true);
    play();
    gameOn = true;
    gameOver = false

    if(window.innerWidth <= 500) {
        toggleScreenCon('urScoreCon2', true);
        toggleScreenCon('status2', false);
        toggleScreenCon('status', true);
        toggleScreenCon('urScoreCon3', false)
    } else {
        toggleScreenCon('urScoreCon3', true); 
        toggleScreenCon('urScoreCon2', false);
        toggleScreenCon('status2', true);
        toggleScreenCon('status', false);
    }

    showInitialCellDoors();
    gameInterval
}

const gameOverWin = () => {
    if(score == 102){
        stopGameLoop()
        toggleScreen('start-screen', false);
        toggleScreen('game-over-screen-win', true);
        toggleScreen('canvas', false);
        toggleScreen('top-left', false);
        toggleScreen('top-right', false);
        toggleScreen('btm-left', false);
        toggleScreen('btm-right', false);
        toggleScreenCon('urScoreCon3', false);
        toggleScreenCon('urScoreCon2', false);
        toggleScreenCon('status', false);
        toggleScreenCon('status2', false);
        pause();
        gameOn = false
        gameOver = true
        hideAllCellDoors();
        // toggleButtons('buttsHolder', false);
    }
}

const gameOverLoose = () => {
        stopGameLoop()
        toggleScreen('start-screen', false);
        toggleScreen('game-over-screen', true);
        toggleScreen('canvas', false);
        toggleScreen('top-left', false);
        toggleScreen('top-right', false);
        toggleScreen('btm-left', false);
        toggleScreen('btm-right', false);
        toggleScreenCon('urScoreCon3', false);
        toggleScreenCon('urScoreCon2', false);
        toggleScreenCon('status', false);
        toggleScreenCon('status2', false);
        pause();
        gameOn = false
        gameOver = true
        hideAllCellDoors();
}

// Function to hide all cell door elements
function hideAllCellDoors() {
  for (let i = 1; i <= 10; i++) {
    const door = document.getElementById(`cellDoor${i}`);
    if (door) door.style.display = 'none';
  }
}

//------------------------------------------------------------------------------

class Neighbor {
    constructor(x, y, color, width, height, alive) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = alive,
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

class PooSpot {
    constructor(x, y, color, width, height, alive) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = alive,
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

class PowerUps {
    constructor(x, y, color, width, height, alive) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = alive,
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

class Dog {
    constructor(x, y, color, width, height, alive) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = alive,
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

class Dad {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        // we need two additional properties in order to make our hero move around a little smoother.
        this.speed = 7.5,
        // because we're going to rework our movement handler, we need directions, set to be different values that we can update with a keypress
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        },
        // we need two key based functions here that will change our hero's movement direction
        // this time, we'll only use WASD keys(purely for the sake of time)
        // setDirection will be tied to a keyDown event
        this.setDirection = function (key) {
            // console.log('this is the key that was pressed', key)
            if (key.toLowerCase() == 'w') { this.direction.up = true }
            if (key.toLowerCase() == 'a') { this.direction.left = true, playerState = 'leftMove'}
            if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true, playerState = 'rightMove' }
        },
        // unsetDirection will be tied to a keyUp event
        this.unsetDirection = function (key) {
            // console.log('this is the key that was released', key)
            if (key.toLowerCase() == 'w') { this.direction.up = false }
            if (key.toLowerCase() == 'a') { this.direction.left = false }
            if (key.toLowerCase() == 's') { this.direction.down = false }
            if (key.toLowerCase() == 'd') { this.direction.right = false }
        },
        // we're also adding a movePlayer function that is tied to our directions
        this.movePlayer = function () {
            // movePlayer, sends our guy flying in whatever direction is true
            if (this.direction.up) {
                this.y -= this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                if (this.y <= 100) {
                    this.y = 100
                }
            }
            if (this.direction.left) {
                this.x -= this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                if (this.x <= 0) {
                    this.x = 0
                }
            }
            if (this.direction.down) {
                this.y += this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                // for down, and right, we need the entire character for our detection of the wall, as well as the canvas width and height
                if (this.y + this.height >= game.height - 100) {
                    this.y = game.height - this.height - 100
                }
            }
            if (this.direction.right) {
                this.x += this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                // for down, and right, we need the entire character for our detection of the wall, as well as the canvas width and height
                if (this.x + this.width >= game.width) {
                    this.x = game.width - this.width
                }
            }
        },
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

// places ogres at random spots in the horizontal direction
// const randomPlaceShrekX = (max) => {
//     // we can use math random and canvas dimensions for this
//     return Math.floor(Math.random() * max)
// }

const player = new Dad(110, 200, 'lightsteelblue', 20, 70)
const dog = new Dog(40, 205, dogImg , 20, 20, true)
const neighborOne = new Neighbor(200, 100, '#bada55', 32, 48)
const neighborTwo = new Neighbor(300, 100, 'red', 32, 48)
const neighborThree = new Neighbor(450, 100, 'red', 32, 48)
const neighborFour = new Neighbor(700, 100, 'red', 32, 48)
const neighborFive = new Neighbor(100, 500, 'red', 32, 48)
const neighborSix = new Neighbor(350, 500, 'red', 32, 48)
const neighborSeven = new Neighbor(500, 500, 'red', 32, 48)
const neighborEight = new Neighbor(700, 500, 'red', 32, 48)
const n1Spot = new Neighbor(100, 100, '#bada55', 32, 48)
const n2Spot = new Neighbor(300, 100, '#bada55', 32, 48)
const n3Spot = new Neighbor(500, 100, '#bada55', 32, 48)
const n4Spot = new Neighbor(700, 100, '#bada55', 32, 48)
const n5Spot = new Neighbor(100, 500, '#bada55', 32, 48)
const n6Spot = new Neighbor(350, 500, '#bada55', 32, 48)
const n7Spot = new Neighbor(500, 500, '#bada55', 32, 48)
const n8Spot = new Neighbor(700, 500, '#bada55', 32, 48)
const pooSpot1 = new PooSpot(140, 175, 'green', 56, 10)
const pooSpot2 = new PooSpot(288, 175, 'brown', 56, 10)
const pooSpot3 = new PooSpot(440, 175, 'brown', 56, 10)
const pooSpot4 = new PooSpot(710, 175, 'brown', 56, 10)
const pooSpot5 = new PooSpot(140, 401, 'brown', 56, 10)
const pooSpot6 = new PooSpot(288, 401, 'brown', 56, 10)
const pooSpot7 = new PooSpot(440, 401, 'brown', 56, 10)
const pooSpot8 = new PooSpot(708, 401, 'brown', 56, 10)
const dogSit = new Dog(20, 20, 'white', 10, 10)
const redBull = new PowerUps(20, 120, 'blue', 8, 18, true)
const slowDownClock = new PowerUps(20, 450, 'orange', 8, 8, true)

//randomPlaceShrekX(game.width)

dog.updatePosition = function (spotNum) {
    const diffX = spotNum.x - dog.x;
    const diffY = spotNum.y - dog.y;

    if(gameOn){
      if(diffX > 0)
          dog.x += dogSpeed,
          dogState = 'rightMove';
      else 
          dog.x -= dogSpeed,
          dogState = 'leftMove';
    
      if(diffY > 0)
          dog.y += dogSpeed;
      else
          dog.y -= dogSpeed;
     }
}

dog.updatePosition2 = function (spotNum) {
    const diffX = spotNum.x - dog.x;
    const diffY = spotNum.y - dog.y;
    if(diffX !== 0 || diffY !== 0){
      if(diffX > 0 )
          dog.x += 10,
          dogState = 'rightMove';
      else 
          dog.x -= 10,
          dogState = 'leftMove';
      if(diffY > 0)
          dog.y += 9;
      else
          dog.y -= 9;
 } else {
    dog.x = 20
    dog.y = 20
    dogState = 'sit'
 }
}

neighborOne.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborOne.x;
    const diffY = spotNum.y - neighborOne.y;

    if(diffX > 0)
        neighborOne.x += neighborSpeed;
    else 
        neighborOne.x -= neighborSpeed;
    if(diffY > 0)
        neighborOne.y += neighborSpeed,
        nbr1State = 'downMove';
    else
        neighborOne.y -= neighborSpeed,
        nbr1State= 'upMove';
}

neighborTwo.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborTwo.x;
    const diffY = spotNum.y - neighborTwo.y;

    if(diffX > 0)
        neighborTwo.x += neighborSpeed;
    else 
        neighborTwo.x -= neighborSpeed;
    if(diffY > 0)
        neighborTwo.y += neighborSpeed,
        nbr2State = 'downMove';
    else
        neighborTwo.y -= neighborSpeed,
        nbr2State = 'upMove';
}

neighborThree.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborThree.x;
    const diffY = spotNum.y - neighborThree.y;

    if(diffX > 0)
        neighborThree.x += neighborSpeed;
    else 
        neighborThree.x -= neighborSpeed;
    if(diffY > 0)
        neighborThree.y += neighborSpeed,
        nbr3State = 'downMove';
    else
        neighborThree.y -= neighborSpeed,
        nbr3State = 'upMove';
}

neighborFour.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborFour.x;
    const diffY = spotNum.y - neighborFour.y;

    if(diffX > 0)
        neighborFour.x += neighborSpeed;
    else 
        neighborFour.x -= neighborSpeed;
    if(diffY > 0)
        neighborFour.y += neighborSpeed,
        nbr4State = 'downMove';
    else
        neighborFour.y -= neighborSpeed,
        nbr4State = 'upMove';
}

neighborFive.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborFive.x;
    const diffY = spotNum.y - neighborFive.y;

    if(diffX > 0)
        neighborFive.x += neighborSpeed;
    else 
        neighborFive.x -= neighborSpeed;
    if(diffY > 0)
        neighborFive.y += neighborSpeed,
        nbr5State = 'downMove';
    else
        neighborFive.y -= neighborSpeed,
        nbr5State = 'upMove';
}

neighborSix.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborSix.x;
    const diffY = spotNum.y - neighborSix.y;

    if(diffX > 0)
        neighborSix.x += neighborSpeed;
    else 
        neighborSix.x -= neighborSpeed;
    if(diffY > 0)
        neighborSix.y += neighborSpeed,
        nbr6State = 'downMove';
    else
        neighborSix.y -= neighborSpeed,
        nbr6State = 'upMove';
}

neighborSeven.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborSeven.x;
    const diffY = spotNum.y - neighborSeven.y;

    if(diffX > 0)
        neighborSeven.x += neighborSpeed;
    else 
        neighborSeven.x -= neighborSpeed;
    if(diffY > 0)
        neighborSeven.y += neighborSpeed,
        nbr7State= 'downMove';
    else
        neighborSeven.y -= neighborSpeed,
        nbr7State= 'upMove';
}

neighborEight.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborEight.x;
    const diffY = spotNum.y - neighborEight.y;

    if(diffX > 0)
        neighborEight.x += neighborSpeed;
    else 
        neighborEight.x -= neighborSpeed;
    if(diffY > 0)
        neighborEight.y += neighborSpeed,
        nbr8State = 'downMove';
    else
        neighborEight.y -= neighborSpeed,
        nbr8State = 'upMove';
}

// function that changes the player's direction
document.addEventListener('keydown', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection(e.key)
})
// function that stops player from going in specific direction
document.addEventListener('keyup', (e) => {
    // when a key is pressed, call the setDirection method
    if (['w', 'a', 's', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})

document.addEventListener('touchmove', (e) => {
    player.unsetDirection('s')
    player.unsetDirection('a')
    player.unsetDirection('d')
    player.unsetDirection('w')
    if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == upButton){
        player.setDirection('w')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == downButton){
        player.setDirection('s')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == leftButton){
        player.setDirection('a')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == rightButton){
        player.setDirection('d')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == topLeftButton){
        player.setDirection('a')
        player.setDirection('w')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == topLeftArrow ){
        player.setDirection('a')
        player.setDirection('w')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == bottomLeftButton ){
        player.setDirection('a')
        player.setDirection('s')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == bottomLeftArrow ){
        player.setDirection('a')
        player.setDirection('s')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == topRightButton){
        player.setDirection('d')
        player.setDirection('w')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == topRightArrow ){
        player.setDirection('d')
        player.setDirection('w')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == bottomRightButton ){
        player.setDirection('s')
        player.setDirection('d')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == bottomRightArrow ){
        player.setDirection('s')
        player.setDirection('d')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == upButtonL){
        player.setDirection('w')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == downButtonL){
        player.setDirection('s')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == leftButtonL){
        player.setDirection('a')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == rightButtonL){
        player.setDirection('d')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == topLeftButtonL){
        player.setDirection('a')
        player.setDirection('w')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == topLeftArrowL ){
        player.setDirection('a')
        player.setDirection('w')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == bottomLeftButtonL ){
        player.setDirection('a')
        player.setDirection('s')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == bottomLeftArrowL ){
        player.setDirection('a')
        player.setDirection('s')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == topRightButtonL){
        player.setDirection('d')
        player.setDirection('w')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == topRightArrowL ){
        player.setDirection('d')
        player.setDirection('w')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == bottomRightButtonL ){
        player.setDirection('s')
        player.setDirection('d')
    } else if(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == bottomRightArrowL ){
        player.setDirection('s')
        player.setDirection('d')
    }

})

upButton.addEventListener('touchstart', (e) => {

    player.setDirection('w')
    // e.touches[0].clientX += .01
    // e.touches[0].clienty += .05
    console.log(e, 'this event')

})

downButton.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('s')
})

leftButton.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('a')
})

rightButton.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('d')
})

upButtonL.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    // player.setDirection('w')

    player.setDirection('w')
})

downButtonL.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('s')
})

leftButtonL.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('a')
})

rightButtonL.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('d')
})


document.addEventListener('touchend', (e) => {
    // when a key is pressed, call the setDirection method
    player.unsetDirection('w')
    player.unsetDirection('a')
    player.unsetDirection('s')
    player.unsetDirection('d')
})

topRightButton.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('d')
    player.setDirection('w')
})

topRightButtonL.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('d')
    player.setDirection('w')
})

bottomRightButton.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('d')
    player.setDirection('s')
})

bottomRightButtonL.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('d')
    player.setDirection('s')
})

bottomLeftButton.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('a')
    player.setDirection('s')
})

bottomLeftButtonL.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('a')
    player.setDirection('s')
})

topLeftButton.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('a')
    player.setDirection('w')
})

topLeftButtonL.addEventListener('touchstart', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection('a')
    player.setDirection('w')
})

const detectHitPlayer = (thing) => {
    if(player.x < thing.x + thing.width 
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            thing.alive = false
            score ++
            // pooSpotNotLit()
        }

}

const detectHitPlayerRed = (thing) => {
    if(player.x < thing.x + thing.width 
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            thing.alive = false
            redLife += 1 
            message.textContent = `YOU DRANK A REDBULL!!! Holy Crap! You're Fly'n!`
            message2.textContent = `YOU DRANK A REDBULL!!! Holy Crap! You're Fly'n!`
            message3.textContent = `YOU DRANK A REDBULL!!! Holy Crap! You're Fly'n!`
            console.log(redLife, 'redlife')
            redNotLit()
            drankOne()
        }


}

const detectHitPlayerClock = (thing) => {
    if(player.x < thing.x + thing.width 
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            thing.alive = false
            redLife += 1 
            message.textContent = `You Took A Chill Pill! everything is chill... chill...`
            message2.textContent = `You Took A Chill Pill! everything is chill... chill...`
            message3.textContent = `You Took A Chill Pill! everything is chill... chill...`
            dogSpeed = 3
            neighborSpeed = .005
            player.speed = 5
            clockNotLit()
            dogSlow()
            drankOne()
        }

}

const detectHitDog = (thing) => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, width and height values
    
    
        if(    dog.x < thing.x + thing.width // is the dog to the left
            && dog.x + dog.width > thing.x  // and is the dog to the right
            && dog.y < thing.y + thing.height // and is the dog bellow
            && dog.y + dog.height > thing.y // and is the dog above
                                            // only allow if thing is not alive
        ){ thing.alive = true
         pooSpotLit()}
    
}

const detectHitNeighborOne = (thing) => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, width and height values
    if(neighborOne.x < thing.x + thing.width 
        && neighborOne.x + neighborOne.width > thing.x
        && neighborOne.y < thing.y + thing.height
        && neighborOne.y + neighborOne.height > thing.y) {
            thing.alive = false
            gameOverLoose()
            message.textContent = `You're Neighbor Stepped in Poo! You Loose!`
        }
}

const detectHitNeighborTwo = (thing) => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, width and height values
    if(neighborTwo.x < thing.x + thing.width 
        && neighborTwo.x + neighborTwo.width > thing.x
        && neighborTwo.y < thing.y + thing.height
        && neighborTwo.y + neighborTwo.height > thing.y) {
            thing.alive = false
            gameOverLoose()
            message.textContent = `You're Neighbor Stepped in Poo! You Loose!`
        }
}

const detectHitNeighborThree = (thing) => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, width and height values
    if(neighborThree.x < thing.x + thing.width 
        && neighborThree.x + neighborThree.width > thing.x
        && neighborThree.y < thing.y + thing.height
        && neighborThree.y + neighborThree.height > thing.y) {
            thing.alive = false
            gameOverLoose()
            message.textContent = `You're Neighbor Stepped in Poo! You Loose!`
        }
}

const detectHitNeighborFour = (thing) => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, width and height values
    if(neighborFour.x < thing.x + thing.width 
        && neighborFour.x + neighborFour.width > thing.x
        && neighborFour.y < thing.y + thing.height
        && neighborFour.y + neighborFour.height > thing.y) {
            thing.alive = false
            gameOverLoose()
            message.textContent = `You're Neighbor Stepped in Poo! You Loose!`
        }
}

const detectHitNeighborFive = (thing) => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, width and height values
    if(neighborFive.x < thing.x + thing.width 
        && neighborFive.x + neighborFive.width > thing.x
        && neighborFive.y < thing.y + thing.height
        && neighborFive.y + neighborFive.height > thing.y) {
            thing.alive = false
            gameOverLoose()
            message.textContent = `You're Neighbor Stepped in Poo! You Loose!`
        }
}

const detectHitNeighborSix = (thing) => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, width and height values
    if(neighborSix.x < thing.x + thing.width 
        && neighborSix.x + neighborSix.width > thing.x
        && neighborSix.y < thing.y + thing.height
        && neighborSix.y + neighborSix.height > thing.y) {
            thing.alive = false
            gameOverLoose()
            message.textContent = `You're Neighbor Stepped in Poo! You Loose!`
        }
}

const detectHitNeighborSeven = (thing) => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, width and height values
    if(neighborSeven.x < thing.x + thing.width 
        && neighborSeven.x + neighborSeven.width > thing.x
        && neighborSeven.y < thing.y + thing.height
        && neighborSeven.y + neighborSeven.height > thing.y) {
            thing.alive = false
            gameOverLoose()
            message.textContent = `You're Neighbor Stepped in Poo! You Loose!`
        }
}

const detectHitNeighborEight = (thing) => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, width and height values
    if(
        neighborEight.x < thing.x + thing.width 
        && neighborEight.x + neighborEight.width > thing.x
        && neighborEight.y < thing.y + thing.height
        && neighborEight.y + neighborEight.height > thing.y) {
            thing.alive = false
            gameOverLoose()
            message.textContent = `You're Neighbor Stepped in Poo! You Loose!`
        }
}

function redLit() {
    redBullState = 'onlyMove'
}

function redNotLit() {
    redBullState = 'noMove'
}

function clockLit() {
    clockState = 'onlyMove'
}

function clockNotLit() {
    clockState = 'noMove'
}

function dogFast() {
    dogSpeed == 12
    neighborSpeed == 2
}

function dogSlow() {
    dogSpeed == 3;
}

function nbr1NotLit() {
    nbr1State = 'noMove'
}

function nbr2NotLit() {
    nbr2State = 'noMove'
}

function nbr3NotLit() {
    nbr3State = 'noMove'
}

function nbr4NotLit() {
    nbr4State = 'noMove'
}

function nbr5NotLit() {
    nbr5State = 'noMove'
}

function nbr6NotLit() {
    nbr6State = 'noMove'
}

function nbr7NotLit() {
    nbr7State = 'noMove'
}

function nbr8NotLit() {
    nbr8State = 'noMove'
}

function pooSpotLit() {
    pooState = 'move'
}

function pooSpotNotLit() {
    pooState = 'noMove'
}
// ---------------------------------------------------------------
const gameLoop = () => {
    // make sure you don't have any console.logs in here
    // console.log('frame running')
    ctx.clearRect(0, 0, game.width, game.height)
    scoreH2.innerText= `Poo Count:${score - 2}`
    urScore.innerText=`You picked up ${score - 2} poos!`
    urScore2.innerText=`You picked up ${score - 2} poos!
    That's Alot of Shit!`
    urScore3.innerText=`You picked up ${score - 2} poos!`
    urScore4.innerText=`You picked up ${score - 2} poos!`

    if(score > 82){
        movement.textContent = `You're On Your Own`
    } else if(score > 57){
        movement.textContent = `Poos Until Next Power Up: ${82 - score}`
    } else if(score > 22) {
        movement.textContent = `Poos Until Next Power Up: ${57 - score}`
    } else if(score <= 22){
        movement.textContent = `Poos Until Next Power Up: ${22 - score}`
    }

//-----------------------------------------------------------------
    if(pooSpot1.alive){
        detectHitPlayer(pooSpot1)
    } 
    if(pooSpot2.alive){
        detectHitPlayer(pooSpot2)
    }
    if(pooSpot3.alive){
        detectHitPlayer(pooSpot3)
    }
    if(pooSpot4.alive){
        detectHitPlayer(pooSpot4)
    }
    if(pooSpot5.alive){
        detectHitPlayer(pooSpot5)
    }
    if(pooSpot6.alive){
        detectHitPlayer(pooSpot6)
    }
    if(pooSpot7.alive){
        detectHitPlayer(pooSpot7)
    }
    if(pooSpot8.alive){
        detectHitPlayer(pooSpot8)
    }
    
    // if(pooSpot1.alive && pooSpot2.alive && pooSpot3.alive && pooSpot4.alive && pooSpot5.alive && pooSpot6.alive && pooSpot7.alive && pooSpot8.alive && dog.x !== 20 && dog.y !==20) {
    //     // dog.updatePosition(dogSit)
    //     dog.updatePosition2(dogSit)
    // }

    if (!pooSpot4.alive && (score% 2) == 0) {
        detectHitDog(pooSpot4)
        dog.updatePosition(pooSpot4)
    } else if (!pooSpot2.alive && (score% 2) == 1) {
        dog.updatePosition(pooSpot2)
        detectHitDog(pooSpot2)
    }   else if (!pooSpot3.alive && (score% 2) == 0) {
        dog.updatePosition(pooSpot3)
        detectHitDog(pooSpot3)
    }   else if (!pooSpot1.alive && (score% 2) == 1) {
        dog.updatePosition(pooSpot1)
        detectHitDog(pooSpot1)
    }   else if (!pooSpot5.alive && (score% 2) == 0) {
        dog.updatePosition(pooSpot5)
        detectHitDog(pooSpot5)
    }   else if (!pooSpot6.alive && (score% 2) == 1) {
        dog.updatePosition(pooSpot6)
        detectHitDog(pooSpot6)
    }   else if (!pooSpot7.alive && (score% 2) == 0) {
        dog.updatePosition(pooSpot7)
        detectHitDog(pooSpot7)
    }   else if (!pooSpot8.alive && (score% 2) == 1) {
        dog.updatePosition(pooSpot8)
        detectHitDog(pooSpot8)
    } else { 
        dog.updatePosition2(dogSit)
    }
    
   
    if(pooSpot1.alive){
        // pooSpot1.render()
        neighborOne.updatePosition(pooSpot1)
        detectHitNeighborOne(pooSpot1)
        // pooSpotLit()
     
    } else {
        neighborOne.updatePosition(n1Spot)
    }

    if(pooSpot2.alive){
        // pooSpot2.render()
        neighborTwo.updatePosition(pooSpot2)
        detectHitNeighborTwo(pooSpot2)
    }  else {
        neighborTwo.updatePosition(n2Spot)
    }

    if(pooSpot3.alive){
        // pooSpot3.render()
        neighborThree.updatePosition(pooSpot3)
        detectHitNeighborThree(pooSpot3)
    }  else {
        neighborThree.updatePosition(n3Spot)
    }

    if(pooSpot4.alive){
        // pooSpot4.render()
        neighborFour.updatePosition(pooSpot4)
        detectHitNeighborFour(pooSpot4)
    }  else {
        neighborFour.updatePosition(n4Spot)
    }

    if(pooSpot5.alive){
        // pooSpot5.render()
        neighborFive.updatePosition(pooSpot5)
        detectHitNeighborFive(pooSpot5)
    }  else {
        neighborFive.updatePosition(n5Spot)
    }

    if(pooSpot6.alive){
        // pooSpot6.render()
        neighborSix.updatePosition(pooSpot6)
        detectHitNeighborSix(pooSpot6)
    }  else {
        neighborSix.updatePosition(n6Spot)
    }

    if(pooSpot7.alive){
        // pooSpot7.render()
        neighborSeven.updatePosition(pooSpot7)
        detectHitNeighborSeven(pooSpot7)
    }  else {
        neighborSeven.updatePosition(n7Spot)
    }

    if(pooSpot8.alive){
        // pooSpot8.render()
        neighborEight.updatePosition(pooSpot8)
        detectHitNeighborEight(pooSpot8)
    }  else {
        neighborEight.updatePosition(n8Spot)
    }
    //------------------------------------------------------------
    if(score >= 101){
        dogSpeed = .3
        message.textContent = `Dude.`
        message2.textContent = `Dude.`
        message3.textContent = `Dude.`
        neighborSpeed = 3
    } else if(score >= 100){
        dogSpeed = .7
        neighborSpeed = 3
        message.textContent = `Oh come on now....`
        message2.textContent = `Oh come on now....`
        message3.textContent = `Oh come on now....`
    } else if(score >= 99){
        dogSpeed = 1.1
        neighborSpeed = 2
        message.textContent = `Any Day Now...`
        message2.textContent = `Any Day Now...`
        message3.textContent = `Any Day Now...`
    } else if(score >= 97){
        dogSpeed = 2
        neighborSpeed = 1
        message.textContent = `Looks Like He's Almost Done!`
        message2.textContent = `Looks Like He's Almost Done!`
        message3.textContent = `Looks Like He's Almost Done!`
    } else if(score >= 72){
        neighborSpeed = .3
        dogSpeed = 21

    } else if(score == 61){
        dogFast()
        neighborSpeed = .15
   
    } else if(score >= 12){
        neighborSpeed = .12
        dogSpeed = 18    
    }

    if(score == 72){
        message.textContent = `Ok Seriously, He's Gotta Be Done Soon Right?`
        message2.textContent = `Ok Seriously, He's Gotta Be Done Soon Right?`
    }

    if(score == 64){
        message.textContent = `Reality Check! Nothing Is Chill!!!`
        message2.textContent = `Reality Check! Nothing Is Chill!!!`
        message3.textContent = `Reality Check! Nothing Is Chill!!!`
    }

    if(score == 71){
        message.textContent = `*nice*`
        message2.textContent = `*nice*`
        message3.textContent = `*nice*`
    }
//-------------------------------------------------------------------------------------------
    if(!redBull.alive){
        redNotLit()
    }

    if(score >= 22 && redLife == 0 && redBull.alive){
        // redBull.render()
        detectHitPlayerRed(redBull)
        redLit();
    }

    if(score == 82 && redLife == 2){
        redBull.alive = true;
       }

    if(score >= 82 && redBull.alive){
        // redBull.render()
        redLit();
        detectHitPlayerRed(redBull)  
    } 
    
    if(score >= 57 && slowDownClock.alive && redLife == 1){
        // slowDownClock.render()
        clockLit()
        detectHitPlayerClock(slowDownClock)
        
    }

    // if(!slowDownClock.alive && score <= 61){
    //     dogSpeed = 3
    //     neighborSpeed = .005
    //     clockNotLit()
    // } 
//-----------------------------------------------------------------


    if(neighborOne.y < 103){
        nbr1NotLit()
    }
    if(neighborTwo.y < 103){
        nbr2NotLit()
    }
    if(neighborThree.y < 103){
        nbr3NotLit()
    }
    if(neighborFour.y < 103){
        nbr4NotLit()
    }
    if(neighborFive.y > 496){
        nbr5NotLit()
    }
    if(neighborSix.y > 496){
        nbr6NotLit()
    }
    if(neighborSeven.y > 496){
        nbr7NotLit()
    } 
    if(neighborEight.y > 496){
        nbr8NotLit()
    }
    player.movePlayer()
    animation()
    animation2()
    animation3()
    animation4()
    animation5()
    animation6()
    animation7()
    animation8()
    animation9()
    animation10()
    animation11()
    animation12()
    // animation13()
    // Update cell door overlay visibility at end of game loop
    updateCellDoor();
    gameOverWin()
    // Render all entities using z-sorting based on their .y value
    const sortedEntities = getZSortedEntities();
    for (const entity of sortedEntities) {
      entity.render();
    }

}
//-----------------------------------------------------------------
const stopGameLoop = () => {
    clearInterval(gameInterval)
}
const gameInterval = setInterval(gameLoop, 60)
gameInterval

