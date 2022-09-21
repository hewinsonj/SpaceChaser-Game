// this is an extension and adjustment of the monsterMash branch of this repo. There are more comments on the monsterMash branch, explaining some of the lines in this branch.
// this incorporates smoother movement, and a more open ended collision detection function, as well as a second enemy.

// ////// RULES FOR DEVELOPING THE GAME //////////
// we need two entities, a hero and an ogre
// the hero should be moveable with the WASD or arrow keys
// the ogre should be stationary
// the hero and first ogre should be able to collide to make something happen
// when the hero and ogre1 collide, the ogre is removed from the canvas, and a second ogre appears
// when hero and ogre2 collide, the game stops, and sends a message to our user that they have won.
// ////////////// END RULES ////////////////////////////////


// first we need to grab our elements so we can make them do stuff
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('status')
const gOScreen = document.getElementById('game-over-screen')
const scoreH2 = document.getElementById('score-h2') 


// we need to set the game's context to be 2d
const ctx = game.getContext('2d')

const cWidth = game.width = 800;
const cHeight = game.height = 600;
let score = 0
let gameOn = false


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
    if(score == 101){
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
// class for our hero
class Dad {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        // we need two additional properties in order to make our hero move around a little smoother.
        this.speed = 10,
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
const dog = new Dog(40, 205, 'white', 20, 20, true)
const neighborOne = new Neighbor(100, 100, '#bada55', 32, 48)
const neighborTwo = new Neighbor(200, 100, 'red', 32, 48)
const neighborThree = new Neighbor(300, 100, 'red', 32, 48)
const neighborFour = new Neighbor(400, 100, 'red', 32, 48)
const neighborFive = new Neighbor(100, 500, 'red', 32, 48)
const neighborSix = new Neighbor(200, 500, 'red', 32, 48)
const neighborSeven = new Neighbor(300, 500, 'red', 32, 48)
const neighborEight = new Neighbor(400, 500, 'red', 32, 48)
const n1Spot = new Neighbor(100, 100, '#bada55', 32, 48)
const n2Spot = new Neighbor(200, 100, '#bada55', 32, 48)
const n3Spot = new Neighbor(300, 100, '#bada55', 32, 48)
const n4Spot = new Neighbor(400, 100, '#bada55', 32, 48)
const n5Spot = new Neighbor(100, 500, '#bada55', 32, 48)
const n6Spot = new Neighbor(200, 500, '#bada55', 32, 48)
const n7Spot = new Neighbor(300, 500, '#bada55', 32, 48)
const n8Spot = new Neighbor(400, 500, '#bada55', 32, 48)
const pooSpot1 = new PooSpot(110, 250, 'brown', 20, 20)
const pooSpot2 = new PooSpot(210, 250, 'brown', 20, 20)
const pooSpot3 = new PooSpot(310, 250, 'brown', 20, 20)
const pooSpot4 = new PooSpot(410, 250, 'brown', 20, 20)
const pooSpot5 = new PooSpot(100, 400, 'brown', 20, 20)
const pooSpot6 = new PooSpot(200, 400, 'brown', 20, 20)
const pooSpot7 = new PooSpot(300, 400, 'brown', 20, 20)
const pooSpot8 = new PooSpot(400, 400, 'brown', 20, 20)
const dogSit = new Dog(40, 205, 'white', 20, 20)



//randomPlaceShrekX(game.width)

dog.updatePosition = function (spotNum) {
    const diffX = spotNum.x - dog.x;
    const diffY = spotNum.y - dog.y;
    
      if(diffX > 0 && gameOn)
          dog.x += 10;
      else 
          dog.x -= 10;
      if(diffY > 0 && gameOn)
          dog.y += 10;
      else
          dog.y -= 10;
 }

neighborOne.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborOne.x;
    const diffY = spotNum.y - neighborOne.y;

    if(diffX > 0)
        neighborOne.x += .1;
    else 
        neighborOne.x -= .1;
    if(diffY > 0)
        neighborOne.y += .1;
    else
        neighborOne.y -= .1;
}

neighborTwo.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborTwo.x;
    const diffY = spotNum.y - neighborTwo.y;

    if(diffX > 0)
        neighborTwo.x += .1;
    else 
        neighborTwo.x -= .1;
    if(diffY > 0)
        neighborTwo.y += .1;
    else
        neighborTwo.y -= .1;
}

neighborThree.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborThree.x;
    const diffY = spotNum.y - neighborThree.y;

    if(diffX > 0)
        neighborThree.x += .1;
    else 
        neighborThree.x -= .1;
    if(diffY > 0)
        neighborThree.y += .1;
    else
        neighborThree.y -= .1;
}

neighborFour.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborFour.x;
    const diffY = spotNum.y - neighborFour.y;

    if(diffX > 0)
        neighborFour.x += .1;
    else 
        neighborFour.x -= .1;
    if(diffY > 0)
        neighborFour.y += .1;
    else
        neighborFour.y -= .1;
}

neighborFive.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborFive.x;
    const diffY = spotNum.y - neighborFive.y;

    if(diffX > 0)
        neighborFive.x += .1;
    else 
        neighborFive.x -= .1;
    if(diffY > 0)
        neighborFive.y += .1;
    else
        neighborFive.y -= .1;
}

neighborSix.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborSix.x;
    const diffY = spotNum.y - neighborSix.y;

    if(diffX > 0)
        neighborSix.x += .1;
    else 
        neighborSix.x -= .1;
    if(diffY > 0)
        neighborSix.y += .1;
    else
        neighborSix.y -= .1;
}

neighborSeven.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborSeven.x;
    const diffY = spotNum.y - neighborSeven.y;

    if(diffX > 0)
        neighborSeven.x += .1;
    else 
        neighborSeven.x -= .1;
    if(diffY > 0)
        neighborSeven.y += .1;
    else
        neighborSeven.y -= .1;
}

neighborEight.updatePosition = function (spotNum) {
    const diffX = spotNum.x - neighborEight.x;
    const diffY = spotNum.y - neighborEight.y;

    if(diffX > 0)
        neighborEight.x += .1;
    else 
        neighborEight.x -= .1;
    if(diffY > 0)
        neighborEight.y += .1;
    else
        neighborEight.y -= .1;
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
    if(neighborEight.x < thing.x + thing.width 
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
    scoreH2.innerText= `Poo Count:${score}`

    if (player.alive) {
    } else if (player.alive) {
        message.textContent = `Poo's Collected: 1`
        
    } else {
        stopGameLoop()
        message.textContent = 'Youve cleaned up all of your dogs mess! You win! '
    }

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
        dog.updatePosition(dogSit)
    }

    if (!pooSpot1.alive) {
        detectHitDog(pooSpot1)
        dog.updatePosition(pooSpot1)
    } else if (!pooSpot2.alive) {
        dog.updatePosition(pooSpot2)
        detectHitDog(pooSpot2)
    }   else if (!pooSpot3.alive) {
        dog.updatePosition(pooSpot3)
        detectHitDog(pooSpot3)
    }   else if (!pooSpot4.alive) {
        dog.updatePosition(pooSpot4)
        detectHitDog(pooSpot4)
    }   else if (!pooSpot5.alive) {
        dog.updatePosition(pooSpot5)
        detectHitDog(pooSpot5)
    }   else if (!pooSpot6.alive) {
        dog.updatePosition(pooSpot6)
        detectHitDog(pooSpot6)
    }   else if (!pooSpot7.alive) {
        dog.updatePosition(pooSpot7)
        detectHitDog(pooSpot7)
    }   else if (!pooSpot8.alive) {
        dog.updatePosition(pooSpot8)
        detectHitDog(pooSpot8)
    } else {
       
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
    
    player.render()
    player.movePlayer()
    dog.render()
    neighborOne.render()
    neighborTwo.render()
    neighborThree.render()
    neighborFour.render()
    neighborFive.render()
    neighborSix.render()
    neighborSeven.render()
    neighborEight.render()
    gameOverWin()
    
}

const stopGameLoop = () => {
    clearInterval(gameInterval)
}

const gameInterval = setInterval(gameLoop, 60)
gameInterval
// const gameInterval = setInterval(gameLoop, 60)

