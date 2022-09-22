const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('status')
const gOScreen = document.getElementById('game-over-screen')
const scoreH2 = document.getElementById('score-h2') 
const urScore = document.getElementById('urScore') 
const urScore2 = document.getElementById('urScore2')
const ctx = game.getContext('2d')
const cWidth = game.width = 800
const cHeight = game.height = 600
// const cWidth = innerWidth
// const cHeight = innerHeight
let score = 2
// player.speed = 8
let dogSpeed = 10
let neighborSpeed = .1
let redLife = 0
let gameOn = false

const playerImg = new Image();
const playerWidth = 32;
const playerHeight = 32;
let gameFrame2 = 0;
const staggerFrames2 = 300;
const spriteAnimations2= [];
playerState = 'leftMove';
playerImg.src = 'PooPickerPerfectBoy.png';


// const dogImg = new Image();
// const dogWidth = 32;
// const dogHeight = 32;
// let gameFrame = 0;
// const staggerFrames = 300;
// const spriteAnimations= [];
// dogState = 'leftMove';
// dogImg.src = 'PooPickerPerfectBoy.png';



// const animationStates = [
//     {
//         name: 'leftMove',
//         frames: 8,
//     },
//     {
//         name: 'rightMove',
//         frames: 8,
//     }

// ];


// animationStates.forEach((state, index) => {
//     let frames = {
//         loc: [],
//     }
//     for (let i=0; i < state.frames; i++){
//         let positionX = i * dogWidth;
//         let positionY = index * dogHeight;
//         frames.loc.push({x: positionX, y: positionY});
//     }
//     spriteAnimations[state.name] = frames;
// });


// function animation(){
//     let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[dogState].loc.length;
//     let frameX = dogWidth * position;
//     let frameY = spriteAnimations[dogState].loc[position].y;
//     // ctx.fillRect(20, 20, 100, 100)
//     // ctx.clearRect(0, 0, cWidth, cHeight)
//     requestAnimationFrame(animation)
//     // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
//     ctx.drawImage(dogImg, frameX, frameY, dogWidth, dogHeight, dog.x, dog.y, 60, 60)
//     // if(gameFrame % staggerFrames == 0){
//     // if(frameX < 9) frameX++;
//     // else frameX = 0;
//     // }

//     gameFrame++;
// }

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
    ctx.drawImage(dogImg, frameX, frameY, playerWidth, playerHeight, player.x, player.y, 60, 60)
    // if(gameFrame % staggerFrames == 0){
    // if(frameX < 9) frameX++;
    // else frameX = 0;
    // }

    gameFrame2++;
}
function drankOne() {
    if(redLife == 3){
    player.speed = 13;
    message.textContent = `YOU DRANK A REDBULL!!! Holy Crap! You're Fly'n!`
    } else if (redLife == 2){
        player.speed = 6
    }else if (redLife == 1){
        player.speed = 13
        message.textContent = `YOU DRANK A REDBULL!!! Holy Crap! You're Fly'n!`
    }
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
    // !pooSpot1.alive
    // !pooSpot2.alive
    // !pooSpot3.alive
    // !pooSpot4.alive
    // !pooSpot5.alive
    // !pooSpot6.alive
    // !pooSpot7.alive
    // !pooSpot8.alive
    gameOn = true;
    gameInterval
}

const toggleScreen = (id, toggle) => {
    let element = document.getElementById(id);
    let display = ( toggle ) ? 'block' : 'none';
    element.style.display = display;
}

const gameOverWin = () => {
    if(score == 103){
        stopGameLoop()
        toggleScreen('start-screen', false);
        toggleScreen('game-over-screen-win', true);
        toggleScreen('canvas', false);
        toggleScreen('top-left', false);
        toggleScreen('top-right', false);
        toggleScreen('btm-left', false);
        toggleScreen('btm-right', false);
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
}

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
        this.speed = 6,
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
            if (key.toLowerCase() == 'a') { this.direction.left = true }
            if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true }
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
const randomPlaceShrekX = (max) => {
    // we can use math random and canvas dimensions for this
    return Math.floor(Math.random() * max)
}

const player = new Dad(10, 200, 'lightsteelblue', 20, 60)
const dog = new Dog(40, 205, dogImg , 20, 20, true)
const neighborOne = new Neighbor(100, 100, '#bada55', 32, 48)
const neighborTwo = new Neighbor(300, 100, 'red', 32, 48)
const neighborThree = new Neighbor(500, 100, 'red', 32, 48)
const neighborFour = new Neighbor(700, 100, 'red', 32, 48)
const neighborFive = new Neighbor(100, 500, 'red', 32, 48)
const neighborSix = new Neighbor(300, 500, 'red', 32, 48)
const neighborSeven = new Neighbor(500, 500, 'red', 32, 48)
const neighborEight = new Neighbor(700, 500, 'red', 32, 48)
const n1Spot = new Neighbor(100, 100, '#bada55', 32, 48)
const n2Spot = new Neighbor(300, 100, '#bada55', 32, 48)
const n3Spot = new Neighbor(500, 100, '#bada55', 32, 48)
const n4Spot = new Neighbor(700, 100, '#bada55', 32, 48)
const n5Spot = new Neighbor(100, 500, '#bada55', 32, 48)
const n6Spot = new Neighbor(300, 500, '#bada55', 32, 48)
const n7Spot = new Neighbor(500, 500, '#bada55', 32, 48)
const n8Spot = new Neighbor(700, 500, '#bada55', 32, 48)
const pooSpot1 = new PooSpot(90, 250, 'brown', 20, 20)
const pooSpot2 = new PooSpot(313, 250, 'brown', 20, 20)
const pooSpot3 = new PooSpot(507, 260, 'brown', 20, 20)
const pooSpot4 = new PooSpot(710, 300, 'brown', 20, 20)
const pooSpot5 = new PooSpot(120, 395, 'brown', 20, 20)
const pooSpot6 = new PooSpot(300, 395, 'brown', 20, 20)
const pooSpot7 = new PooSpot(515, 410, 'brown', 20, 20)
const pooSpot8 = new PooSpot(720, 390, 'brown', 20, 20)
const dogSit = new Dog(20, 20, 'white', 10, 10)
const redBull = new PowerUps(20, 110, 'blue', 8, 18, true)
const slowDownClock = new PowerUps(20, 400, 'orange', 8, 8, true)


//randomPlaceShrekX(game.width)



dog.updatePosition = function (spotNum) {
    const diffX = spotNum.x - dog.x;
    const diffY = spotNum.y - dog.y;
    if(score > 22){
    if(gameOn){
       
      if(diffX > 0)
          dog.x += (dogSpeed + 5),
          dogState = 'rightMove';
      else 
          dog.x -= (dogSpeed + 5),
          dogState = 'leftMove';
    
      if(diffY > 0)
          dog.y += (dogSpeed + 5);
      else
          dog.y -= (dogSpeed + 5);
          
     }}else if(score > 52){
        if(gameOn){

        if(diffX > 0)
            dog.x += (dogSpeed + 5),
            dogState = 'rightMove';
        else 
            dog.x -= (dogSpeed + 5),
            dogState = 'leftMove';

      
        if(diffY > 0)
            dog.y += (dogSpeed + 5);
        else
            dog.y -= (dogSpeed + 5);
    }}else{
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
          dog.y += 10;
      else
          dog.y -= 10;
 } else {
    dog.x = 40
    dog.y = 205
 }
}

// dog.updatePosition2 = function () {
//     if(dog.x !== 20 && dog.y !== 20){
//      if(diffX > 0)
//       dog.x += 10;
//      else 
//       dog.x -= 10;
//      if(diffY > 0)
//       dog.y += 10;
//      else
//       dog.y -= 10;
//     } else {
//         dog.updatePosition(dogSit)
//     }

// }

neighborOne.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborOne.x;
    const diffY = spotNum.y - neighborOne.y;

    if(diffX > 0)
        neighborOne.x += neighborSpeed;
    else 
        neighborOne.x -= neighborSpeed;
    if(diffY > 0)
        neighborOne.y += neighborSpeed;
    else
        neighborOne.y -= neighborSpeed;
}

neighborTwo.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborTwo.x;
    const diffY = spotNum.y - neighborTwo.y;

    if(diffX > 0)
        neighborTwo.x += neighborSpeed;
    else 
        neighborTwo.x -= neighborSpeed;
    if(diffY > 0)
        neighborTwo.y += neighborSpeed;
    else
        neighborTwo.y -= neighborSpeed;
}

neighborThree.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborThree.x;
    const diffY = spotNum.y - neighborThree.y;

    if(diffX > 0)
        neighborThree.x += neighborSpeed;
    else 
        neighborThree.x -= neighborSpeed;
    if(diffY > 0)
        neighborThree.y += neighborSpeed;
    else
        neighborThree.y -= neighborSpeed;
}

neighborFour.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborFour.x;
    const diffY = spotNum.y - neighborFour.y;

    if(diffX > 0)
        neighborFour.x += neighborSpeed;
    else 
        neighborFour.x -= neighborSpeed;
    if(diffY > 0)
        neighborFour.y += neighborSpeed;
    else
        neighborFour.y -= neighborSpeed;
}

neighborFive.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborFive.x;
    const diffY = spotNum.y - neighborFive.y;

    if(diffX > 0)
        neighborFive.x += neighborSpeed;
    else 
        neighborFive.x -= neighborSpeed;
    if(diffY > 0)
        neighborFive.y += neighborSpeed;
    else
        neighborFive.y -= neighborSpeed;
}

neighborSix.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborSix.x;
    const diffY = spotNum.y - neighborSix.y;

    if(diffX > 0)
        neighborSix.x += neighborSpeed;
    else 
        neighborSix.x -= neighborSpeed;
    if(diffY > 0)
        neighborSix.y += neighborSpeed;
    else
        neighborSix.y -= neighborSpeed;
}

neighborSeven.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborSeven.x;
    const diffY = spotNum.y - neighborSeven.y;

    if(diffX > 0)
        neighborSeven.x += neighborSpeed;
    else 
        neighborSeven.x -= neighborSpeed;
    if(diffY > 0)
        neighborSeven.y += neighborSpeed;
    else
        neighborSeven.y -= neighborSpeed;
}

neighborEight.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborEight.x;
    const diffY = spotNum.y - neighborEight.y;

    if(diffX > 0)
        neighborEight.x += neighborSpeed;
    else 
        neighborEight.x -= neighborSpeed;
    if(diffY > 0)
        neighborEight.y += neighborSpeed;
    else
        neighborEight.y -= neighborSpeed;
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


const detectHitPlayer = (thing) => {
    if(player.x < thing.x + thing.width 
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            thing.alive = false
            score ++
        }

}

const detectHitPlayerRed = (thing) => {
    if(player.x < thing.x + thing.width 
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            thing.alive = false
            redLife += 1 
          
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
        ){ thing.alive = true}
    
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

const gameLoop = () => {
    // make sure you don't have any console.logs in here
    // console.log('frame running')
    ctx.clearRect(0, 0, game.width, game.height)
    scoreH2.innerText= `Poo Count:${score - 2}`
    urScore.innerText=`You picked up ${score - 2} poos!`
    urScore2.innerText=`You picked up ${score - 2} poos!`

    // if (player.alive) {

    // } else if (player.alive) {
        
        
    // } else {
    //     stopGameLoop()
    //     message.textContent = 'Youve cleaned up all of your dogs mess! You win! '
    // }

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
    
    if(pooSpot1.alive && pooSpot2.alive && pooSpot3.alive && pooSpot4.alive && pooSpot5.alive && pooSpot6.alive && pooSpot7.alive && pooSpot8.alive) {
        // dog.updatePosition(dogSit)
        dog.updatePosition2(dogSit)
    }

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
    
    movement.textContent = player.x + ", " + player.y
    if(pooSpot1.alive){
        pooSpot1.render()
        neighborOne.updatePosition(pooSpot1)
        detectHitNeighborOne(pooSpot1)
     
    } else {
        neighborOne.updatePosition(n1Spot)
    }

    if(pooSpot2.alive){
        pooSpot2.render()
        neighborTwo.updatePosition(pooSpot2)
        detectHitNeighborTwo(pooSpot2)
    }  else {
        neighborTwo.updatePosition(n2Spot)
    }

    if(pooSpot3.alive){
        pooSpot3.render()
        neighborThree.updatePosition(pooSpot3)
        detectHitNeighborThree(pooSpot3)
    }  else {
        neighborThree.updatePosition(n3Spot)
    }

    if(pooSpot4.alive){
        pooSpot4.render()
        neighborFour.updatePosition(pooSpot4)
        detectHitNeighborFour(pooSpot4)
    }  else {
        neighborFour.updatePosition(n4Spot)
    }

    if(pooSpot5.alive){
        pooSpot5.render()
        neighborFive.updatePosition(pooSpot5)
        detectHitNeighborFive(pooSpot5)
    }  else {
        neighborFive.updatePosition(n5Spot)
    }

    if(pooSpot6.alive){
        pooSpot6.render()
        neighborSix.updatePosition(pooSpot6)
        detectHitNeighborSix(pooSpot6)
    }  else {
        neighborSix.updatePosition(n6Spot)
    }

    if(pooSpot7.alive){
        pooSpot7.render()
        neighborSeven.updatePosition(pooSpot7)
        detectHitNeighborSeven(pooSpot7)
    }  else {
        neighborSeven.updatePosition(n7Spot)
    }

    if(pooSpot8.alive){
        pooSpot8.render()
        neighborEight.updatePosition(pooSpot8)
        detectHitNeighborEight(pooSpot8)
    }  else {
        neighborEight.updatePosition(n8Spot)
    }
    // if(!redBull.alive && slowDownClock.alive){
    //     dadSpeed = 20
    // }
    // if(redBull.alive != true){  //&& score <= 37
    //     message.textContent = `YOU DRANK A REDBULL!!! Holy Crap! You're Fly'n!`
    //     player.speed = 15
    //     console.log(player)
    // }
    if(score >= 12 && score <= 30 && redBull.alive ){
        redBull.render()
        detectHitPlayerRed(redBull)
    }
    if(score >= 37 && redBull.alive){
        redBull.render()
        detectHitPlayerRed(redBull)
    }

    if(score >= 37 && redLife == 2){
        redBull.render()
        detectHitPlayerRed(redBull)
    }

    if(score >= 33 && !redBull.alive){
        message.textContent = `Reality Check! Nothing Is Chill!!!`
    }
    
    if(score >= 27 && slowDownClock.alive){
        slowDownClock.render()
        detectHitPlayerRed(slowDownClock)
    }
    
    if(score >= 70){
        neighborSpeed = .4
        dogSpeed = 16
        // dadSpeed = 20
    } else if(score >= 12){
        neighborSpeed = .3
        dogSpeed = 13
        // dadSpeed = 20
    }

    if(!slowDownClock.alive && score <= 32){
        dogSpeed = 1
        neighborSpeed = .01
        message.textContent = `You Took A Chill Pill! everything is chill... chill...`
    } 

    if(score > 45){
        message.textContent = `How Much More Could There Be?`
    }

    if(score > 80){
        message.textContent = `Ok Seriously, He's Gotta Be Done Soon Right?`
    }

   




    player.render()
    player.movePlayer()
    // dog.render()

    if(neighborOne.y > 101){
    neighborOne.render()}
    if(neighborTwo.y > 101){
    neighborTwo.render()}
    if(neighborThree.y > 101){
    neighborThree.render()}
    if(neighborFour.y > 101){
    neighborFour.render()}
    if(neighborFive.y < 498){
    neighborFive.render()}
    if(neighborSix.y < 498){
    neighborSix.render()}
    if(neighborSeven.y < 498){
    neighborSeven.render()}
    if(neighborEight.y < 498){
    neighborEight.render()}
    gameOverWin()
    animation()
    drankOne()
    
}

const stopGameLoop = () => {
    clearInterval(gameInterval)
}

const gameInterval = setInterval(gameLoop, 60)
gameInterval
// const gameInterval = setInterval(gameLoop, 60)

