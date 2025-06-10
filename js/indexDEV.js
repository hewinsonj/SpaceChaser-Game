// Helper function for updating game state based on score
function updateGameState(score) {
    if(score >= 101){
        dogSpeed = .3;
        neighborSpeed = 3;
        message.textContent = `Dude.`;
        message2.textContent = `Dude.`;
        message3.textContent = `Dude.`;
    } else if(score >= 100){
        dogSpeed = .7;
        neighborSpeed = 3;
        message.textContent = `Oh come on now....`;
        message2.textContent = `Oh come on now....`;
        message3.textContent = `Oh come on now....`;
    } else if(score >= 99){
        dogSpeed = 1.1;
        neighborSpeed = 2;
        message.textContent = `Any Day Now...`;
        message2.textContent = `Any Day Now...`;
        message3.textContent = `Any Day Now...`;
    } else if(score >= 97){
        dogSpeed = 2;
        neighborSpeed = 1;
        message.textContent = `Looks Like He's Almost Done!`;
        message2.textContent = `Looks Like He's Almost Done!`;
        message3.textContent = `Looks Like He's Almost Done!`;
    } else if(score >= 72){
        neighborSpeed = .3;
        dogSpeed = 21;
    } else if(score == 61){
        dogFast();
        neighborSpeed = .15;
    } else if(score >= 12){
        neighborSpeed = .12;
        dogSpeed = 18;
    }

    if(score == 72){
        message.textContent = `Ok Seriously, He's Gotta Be Done Soon Right?`;
        message2.textContent = `Ok Seriously, He's Gotta Be Done Soon Right?`;
    }
    if(score == 64){
        message.textContent = `Reality Check! Nothing Is Chill!!!`;
        message2.textContent = `Reality Check! Nothing Is Chill!!!`;
        message3.textContent = `Reality Check! Nothing Is Chill!!!`;
    }
    if(score == 71){
        message.textContent = `*nice*`;
        message2.textContent = `*nice*`;
        message3.textContent = `*nice*`;
    }
}
const game = document.getElementById('canvas')
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
let gameInterval;
// player.speed = 8
// const cWidth = innerWidth
// const cHeight = innerHeight

const dogImg = new Image();
const dogWidth = 64;
const dogHeight = 64;
let gameFrame = 0;
const staggerFrames = 2;
const spriteAnimations= [];
dogState = 'leftMove';
dogImg.src = 'poopickerdogfinal9.png';

const playerImg = new Image();
const playerWidth = 89;
const playerHeight = 89;
let gameFrame2 = 0;
const staggerFrames2 = 10;
const spriteAnimations2= [];
playerState = 'rightMove';
playerImg.src = 'poopickerdadthisone9.png';

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
const nbr1Width = 89;
const nbr1Height = 89;
let gameFrame5 = 0;
const staggerFrames5 = 50;
const spriteAnimations5= [];
nbr1State = 'noMove';
nbr1Img.src = `poopickerneighboroldlady9.png`;

const nbr2Img = new Image();
const nbr2Width = 89;
const nbr2Height = 89;
let gameFrame6 = 0;
const staggerFrames6 = 50;
const spriteAnimations6= [];
nbr2State = 'noMove';
nbr2Img.src = `poopickerneighborman9.png`;

const nbr3Img = new Image();
const nbr3Width = 260;
const nbr3Height = 260;
let gameFrame7 = 0;
const staggerFrames7 = 50;
const spriteAnimations7= [];
nbr3State = 'noMove';
nbr3Img.src = `poopickerneighborlawnguy9.png`;

const nbr4Img = new Image();
const nbr4Width = 220;
const nbr4Height = 220;
let gameFrame8 = 0;
const staggerFrames8 = 50;
const spriteAnimations8= [];
nbr4State = 'noMove';
nbr4Img.src = `poopickerneighborladybabynow9.png`;

const nbr5Img = new Image();
const nbr5Width = 110;
const nbr5Height = 110;
let gameFrame9 = 0;
const staggerFrames9 = 50;
const spriteAnimations9= [];
nbr5State = 'noMove';
nbr5Img.src = `poopickerneighborgirlv29.png`;

const nbr6Img = new Image();
const nbr6Width = 89;
const nbr6Height = 89;
let gameFrame10 = 0;
const staggerFrames10 = 50;
const spriteAnimations10= [];
nbr6State = 'noMove';
nbr6Img.src = `poopickerneighborkidpooshirt9.png`;

const nbr7Img = new Image();
const nbr7Width = 110;
const nbr7Height = 110;
let gameFrame11 = 0;
const staggerFrames11 = 50;
const spriteAnimations11= [];
nbr7State = 'noMove';
nbr7Img.src = `poopickerpeopleoldmanv29.png`;

const nbr8Img = new Image();
const nbr8Width = 300;
const nbr8Height = 300;
let gameFrame12 = 0;
const staggerFrames12 = 50;
const spriteAnimations12= [];
nbr8State = 'noMove';
nbr8Img.src = `poopickerneighborkiddrone9.png`;


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
    requestAnimationFrame(animation13);

    let position = Math.floor(gameFrame13 / staggerFrames13) % spriteAnimations13[pooState].loc.length;
    let frameX = pooWidth * position;
    let frameY = spriteAnimations13[pooState].loc[position].y;

    pooSpots.forEach(spot => {
        if (spot.alive) {
            ctx.drawImage(pooImg, frameX, frameY, pooWidth, pooHeight, spot.x - 39, spot.y - 40, 90, 90);
        }
    });

    gameFrame13++;
}

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
    let position = Math.floor(gameFrame4 / staggerFrames4) % spriteAnimations4[clockState].loc.length;
    let frameX = clockWidth * position;
    let frameY = spriteAnimations4[clockState].loc[position].y;
    // ctx.fillRect(20, 20, 100, 100)
    // ctx.clearRect(0, 0, cWidth, cHeight)
    // requestAnimationFrame(animation4)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(clockImg, frameX, frameY, clockWidth, clockHeight, slowDownClock.x - 56, slowDownClock.y - 63, 120, 120)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }
    gameFrame4++;
    if (gameFrame4 > staggerFrames4 * spriteAnimations4[clockState].loc.length) {
        gameFrame4 = 0;
    }
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
    // (removed requestAnimationFrame)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(redBullImg, frameX, frameY, redBullWidth, redBullHeight, redBull.x - 60, redBull.y - 50, 120, 120)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }
    gameFrame3++;
    if (gameFrame3 > staggerFrames3 * spriteAnimations3[redBullState].loc.length) {
        gameFrame3 = 0;
    }
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
    // (removed requestAnimationFrame)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(dogImg, frameX, frameY, dogWidth, dogHeight, dog.x - 15, dog.y - 19, 50, 50)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame++;
    if (gameFrame > staggerFrames * spriteAnimations[dogState].loc.length) {
        gameFrame = 0;
    }
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
    // requestAnimationFrame(animation2)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(playerImg, frameX, frameY, playerWidth, playerHeight, (player.x -24), player.y - 10, 80, 80)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }
    gameFrame2++;
    if (gameFrame2 > staggerFrames2 * spriteAnimations2[playerState].loc.length) {
        gameFrame2 = 0;
    }
}

// --------------------------------------------------------

function drankOne() {
    const speedMap = {
        1: 13,
        2: 9,
        3: 13
    };
    player.speed = speedMap[redLife] || player.speed;
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
    toggleScreen('start-screen', false);
    toggleScreen('game-over-screen', false);
    toggleScreen('canvas', true);
    toggleScreen('top-left', true);
    toggleScreen('top-right', true);
    toggleScreen('btm-left', true);
    toggleScreen('btm-right', true);
    play();
    animateNeighbors();
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

    gameInterval = setInterval(gameLoop, 60);
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
const neighbors = [
    { entity: new Neighbor(200, 100, '#bada55', 32, 48) },
    { entity: new Neighbor(300, 100, 'red', 32, 48) },
    { entity: new Neighbor(450, 100, 'red', 32, 48) },
    { entity: new Neighbor(700, 100, 'red', 32, 48) },
    { entity: new Neighbor(100, 500, 'red', 32, 48) },
    { entity: new Neighbor(350, 500, 'red', 32, 48) },
    { entity: new Neighbor(500, 500, 'red', 32, 48) },
    { entity: new Neighbor(700, 500, 'red', 32, 48) }
];
const neighborOne = neighbors[0].entity;
const neighborTwo = neighbors[1].entity;
const neighborThree = neighbors[2].entity;
const neighborFour = neighbors[3].entity;
const neighborFive = neighbors[4].entity;
const neighborSix = neighbors[5].entity;
const neighborSeven = neighbors[6].entity;
const neighborEight = neighbors[7].entity;

// Assign generalized updatePosition to all neighbors
neighbors.forEach(({ entity }, i) => {
    entity.updatePosition = function (spotNum) {
        const diffX = spotNum.x - entity.x;
        const diffY = spotNum.y - entity.y;

        if (diffX > 0) entity.x += neighborSpeed;
        else entity.x -= neighborSpeed;

        if (diffY > 0) {
            entity.y += neighborSpeed;
            eval(`nbr${i + 1}State = 'downMove'`);
        } else {
            entity.y -= neighborSpeed;
            eval(`nbr${i + 1}State = 'upMove'`);
        }
    };
});
const n1Spot = new Neighbor(100, 100, '#bada55', 32, 48)
const n2Spot = new Neighbor(300, 100, '#bada55', 32, 48)
const n3Spot = new Neighbor(500, 100, '#bada55', 32, 48)
const n4Spot = new Neighbor(700, 100, '#bada55', 32, 48)
const n5Spot = new Neighbor(100, 500, '#bada55', 32, 48)
const n6Spot = new Neighbor(350, 500, '#bada55', 32, 48)
const n7Spot = new Neighbor(500, 500, '#bada55', 32, 48)
const n8Spot = new Neighbor(700, 500, '#bada55', 32, 48)
const pooSpot1 = new PooSpot(180, 230, 'brown', 20, 20)
const pooSpot2 = new PooSpot(389, 245, 'brown', 20, 20)
const pooSpot3 = new PooSpot(457, 235, 'brown', 20, 20)
const pooSpot4 = new PooSpot(710, 250, 'brown', 20, 20)
const pooSpot5 = new PooSpot(175, 375, 'brown', 20, 20)
const pooSpot6 = new PooSpot(300, 395, 'brown', 20, 20)
const pooSpot7 = new PooSpot(423, 370, 'brown', 20, 20)
const pooSpot8 = new PooSpot(720, 390, 'brown', 20, 20)
const pooSpots = [pooSpot1, pooSpot2, pooSpot3, pooSpot4, pooSpot5, pooSpot6, pooSpot7, pooSpot8];
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

const touchDirectionMap = new Map([
    [upButton, ['w']], [downButton, ['s']], [leftButton, ['a']], [rightButton, ['d']],
    [topLeftButton, ['a', 'w']], [bottomLeftButton, ['a', 's']],
    [topRightButton, ['d', 'w']], [bottomRightButton, ['d', 's']],
    [topLeftArrow, ['a', 'w']], [bottomLeftArrow, ['a', 's']],
    [topRightArrow, ['d', 'w']], [bottomRightArrow, ['d', 's']],
    [upButtonL, ['w']], [downButtonL, ['s']], [leftButtonL, ['a']], [rightButtonL, ['d']],
    [topLeftButtonL, ['a', 'w']], [bottomLeftButtonL, ['a', 's']],
    [topRightButtonL, ['d', 'w']], [bottomRightButtonL, ['d', 's']],
    [topLeftArrowL, ['a', 'w']], [bottomLeftArrowL, ['a', 's']],
    [topRightArrowL, ['d', 'w']], [bottomRightArrowL, ['d', 's']]
]);

document.addEventListener('touchmove', (e) => {
    ['w', 'a', 's', 'd'].forEach(dir => player.unsetDirection(dir));
    const touched = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    for (let [button, directions] of touchDirectionMap) {
        if (touched === button) {
            directions.forEach(dir => player.setDirection(dir));
            break;
        }
    }
});

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

const detectHitDog = () => {
    for (let spot of pooSpots) {
        if (!spot.alive &&
            dog.x < spot.x + spot.width &&
            dog.x + dog.width > spot.x &&
            dog.y < spot.y + spot.height &&
            dog.y + dog.height > spot.y) {
            spot.alive = true;
            pooSpotLit();
            break;
        }
    }
}


function detectHitNeighbor(neighbor, spot) {
    if (neighbor.x < spot.x + spot.width &&
        neighbor.x + neighbor.width > spot.x &&
        neighbor.y < spot.y + spot.height &&
        neighbor.y + neighbor.height > spot.y) {
        spot.alive = false;
        gameOverLoose();
        message.textContent = `You're Neighbor Stepped in Poo! You Loose!`;
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
    dogSpeed = 12;
    neighborSpeed = 2;
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
    pooSpots.forEach(spot => {
        if (spot.alive) {
            detectHitPlayer(spot);
        }
    });
    
    // if(pooSpot1.alive && pooSpot2.alive && pooSpot3.alive && pooSpot4.alive && pooSpot5.alive && pooSpot6.alive && pooSpot7.alive && pooSpot8.alive && dog.x !== 20 && dog.y !==20) {
    //     // dog.updatePosition(dogSit)
    //     dog.updatePosition2(dogSit)
    // }

    let targeted = false;
    for (let i = 0; i < pooSpots.length; i++) {
        const spot = pooSpots[i];
        if (!spot.alive && (score % 2) === (i % 2)) {
            dog.updatePosition(spot);
            detectHitDog();
            targeted = true;
            break;
        }
    }
    if (!targeted) {
        dog.updatePosition2(dogSit);
    }
    
   
    const nSpots = [n1Spot, n2Spot, n3Spot, n4Spot, n5Spot, n6Spot, n7Spot, n8Spot];
    neighbors.forEach(({ entity }, i) => {
        if (pooSpots[i].alive) {
            entity.updatePosition(pooSpots[i]);
            detectHitNeighbor(entity, pooSpots[i]);
        } else {
            entity.updatePosition(nSpots[i]);
        }
    });
    //------------------------------------------------------------
    updateGameState(score);
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
    animation13()
    gameOverWin()
    // dog.render()
    // player.render()
}
//-----------------------------------------------------------------
const stopGameLoop = () => {
    clearInterval(gameInterval)
}



// Neighbor animation configs and shared animation function
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

const neighborConfigs = [
    { img: nbr1Img, width: nbr1Width, height: nbr1Height, state: () => nbr1State, entity: neighborOne, drawOffsetX: 25, drawOffsetY: 25, drawSize: 80, stagger: staggerFrames5, gameFrameRef: () => gameFrame5++, frame: () => gameFrame5 },
    { img: nbr2Img, width: nbr2Width, height: nbr2Height, state: () => nbr2State, entity: neighborTwo, drawOffsetX: 28, drawOffsetY: 25, drawSize: 80, stagger: staggerFrames6, gameFrameRef: () => gameFrame6++, frame: () => gameFrame6 },
    { img: nbr3Img, width: nbr3Width, height: nbr3Height, state: () => nbr3State, entity: neighborThree, drawOffsetX: 28, drawOffsetY: 35, drawSize: 89, stagger: staggerFrames7, gameFrameRef: () => gameFrame7++, frame: () => gameFrame7 },
    { img: nbr4Img, width: nbr4Width, height: nbr4Height, state: () => nbr4State, entity: neighborFour, drawOffsetX: 35, drawOffsetY: 45, drawSize: 100, stagger: staggerFrames8, gameFrameRef: () => gameFrame8++, frame: () => gameFrame8 },
    { img: nbr5Img, width: nbr5Width, height: nbr5Height, state: () => nbr5State, entity: neighborFive, drawOffsetX: 35, drawOffsetY: 79, drawSize: 85, stagger: staggerFrames9, gameFrameRef: () => gameFrame9++, frame: () => gameFrame9 },
    { img: nbr6Img, width: nbr6Width, height: nbr6Height, state: () => nbr6State, entity: neighborSix, drawOffsetX: 35, drawOffsetY: 69, drawSize: 75, stagger: staggerFrames10, gameFrameRef: () => gameFrame10++, frame: () => gameFrame10 },
    { img: nbr7Img, width: nbr7Width, height: nbr7Height, state: () => nbr7State, entity: neighborSeven, drawOffsetX: 35, drawOffsetY: 75, drawSize: 85, stagger: staggerFrames11, gameFrameRef: () => gameFrame11++, frame: () => gameFrame11 },
    { img: nbr8Img, width: nbr8Width, height: nbr8Height, state: () => nbr8State, entity: neighborEight, drawOffsetX: 35, drawOffsetY: 115, drawSize: 123, stagger: staggerFrames12, gameFrameRef: () => gameFrame12++, frame: () => gameFrame12 },
];

neighborConfigs.forEach((cfg, i) => {
    const spriteKey = `spriteAnimations${i + 5}`;
    window[spriteKey] = {};
    animationStates5.forEach((state, index) => {
        let frames = { loc: [] };
        for (let j = 0; j < state.frames; j++) {
            let positionX = j * cfg.width;
            let positionY = index * cfg.height;
            frames.loc.push({ x: positionX, y: positionY });
        }
        window[spriteKey][state.name] = frames;
    });
});

function animateNeighbors() {
    requestAnimationFrame(animateNeighbors);
    neighborConfigs.forEach((cfg, i) => {
        let spriteKey = `spriteAnimations${i + 5}`;
        let position = Math.floor(cfg.frame() / cfg.stagger) % window[spriteKey][cfg.state()].loc.length;
        let frameX = cfg.width * position;
        let frameY = window[spriteKey][cfg.state()].loc[position].y;

        const drawX = cfg.entity.x - cfg.drawOffsetX;
        const drawY = cfg.entity.y - cfg.drawOffsetY;
        // Only draw if within visible canvas bounds
        if (
            drawX + cfg.drawSize > 0 && drawX < cWidth &&
            drawY + cfg.drawSize > 0 && drawY < cHeight
        ) {
            ctx.drawImage(cfg.img, frameX, frameY, cfg.width, cfg.height, drawX, drawY, cfg.drawSize, cfg.drawSize);
        }
        cfg.gameFrameRef();
    });
}

// Cleanup function to clear DOM references and intervals
function cleanupResources() {
    clearInterval(gameInterval);

    // Clear DOM references to allow GC cleanup if DOM is changed or reset
    message = null;
    message2 = null;
    message3 = null;
    scoreH2 = null;
    urScore = null;
    urScore2 = null;
    urScore3 = null;
    urScore4 = null;
    urScoreCon2 = null;
    urScoreCon3 = null;

    upButton = downButton = leftButton = rightButton = null;
    topRightButton = bottomRightButton = topLeftButton = bottomLeftButton = null;
    topRightArrow = bottomRightArrow = topLeftArrow = bottomLeftArrow = null;

    upButtonL = downButtonL = leftButtonL = rightButtonL = null;
    topRightButtonL = bottomRightButtonL = topLeftButtonL = bottomLeftButtonL = null;
    topRightArrowL = bottomRightArrowL = topLeftArrowL = bottomLeftArrowL = null;

    music = null;
}