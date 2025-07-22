
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
  movementContainer,
  cellDoorImages,
  lastVisibleDoors
} from "../gameState/gameState.js";

import { settings } from "../settings/settings.js"; 
import { 
  cell7Img,
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
setNeighborState,
setCell7State,
setDogState,
setWallTopState,
  clockImg,
  playerGlovesImg,
  playerImg,
  redBullImg,
  setRukusSwitchAnimationState,
  setBrokenSwitchAnimationState,
  setBrokenSwitch2AnimationState,
  setExitSignState,
} from "../animation/animator.js";

import {
  playerEnters,
  redLit,
  redNotLit,
  clockLit,
  clockNotLit,
  endScene,
} from "../index.js"; 


// import {
//   clockLit,
//   clockNotLit,
//   redLit,
//   redNotLit,
//   setBrokenSwitchAnimationState,
//   setExitSignState,
//   playerEnters,
//   endScene,
// } from "../gameEvents.js";



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
    gameState.carryState.carrying = false;
    // remove neighbor from array
    gameState.playerCarrying = gameState.playerCarrying.filter((n) => n !== neighbor);
  }
}

const detectHitPlayerRukus = () => {
  if (
    dog.x < player.x + player.width &&
    dog.x + dog.width > player.x &&
    dog.y < player.y + player.height &&
    dog.y + dog.height > player.y
  ) {
    gameState.endSceneStarted = true;
    endScene();
    console.log("player hit rukus")
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
      gameState.brokenSwitch2AnimationState = "noMove";
    } else {
      if (thing.color !== "orange") {
        gameState.score++;
        thing.alive = false;
      }

      if (gameState.score == 14) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (gameState.score == 13) {
        redBull.alive = true;
        redLit();
      }
      if (gameState.score == 12) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (gameState.score == 11) {
        redBull.alive = true;
        redLit();
      }
      if (gameState.score == 10) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (gameState.score == 9) {
        redBull.alive = true;
        redLit();
      }
      if (gameState.score == 8) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (gameState.score == 7) {
        redBull.alive = true;
        redLit();
      }
      if (gameState.score == 6) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (gameState.score == 5) {
        redBull.alive = true;
        redLit();
      }
      if (gameState.score == 4) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (gameState.score == 3) {
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
      if (settings.guardProgress === 0) {
        lastSpot.alive = false;
        setBrokenSwitchAnimationState("move")
        settings.lastDoorAlarmAnimationState = "open";
        gameState.sceneEnded = true;
        playerEnters();
        setExitSignState("move")
      }
    } else {
      thing.alive = true;
    }
  }
};


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
    (!gameState.carryState.carrying || settings.guardWearingGloves)
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
    } else if (!settings.guardWearingGloves && !gameState.playerCarrying.length) {
      gameState.playerCarrying.push(neighbor);
      neighbor.isCaught = true;
      gameState.carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (
      settings.guardGlovesColor === "red" &&
      gameState.playerCarrying.length <= 2
    ) {

      gameState.playerCarrying.push(neighbor);
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

      gameState.playerCarrying.push(neighbor);
      neighbor.isCaught = true;
      carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (
      settings.guardGlovesColor === "green" &&
      gameState.playerCarrying.length <= 4
    ) {

      gameState.playerCarrying.push(neighbor);
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
      gameState.playerCarrying.push(neighbor);
      carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (
      settings.guardGlovesColor === "rainbow" &&
      gameState.playerCarrying.length <= 6
    ) {

      gameState.playerCarrying.push(neighbor);
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

export {
  detectHitPlayerToSpot,
  detectHitPlayer,
  detectHitPlayerRed,
  detectHitPlayerClock,
  detectHitDog,
  detectHitNeighbor,
  detectHitPlayerNeighbor,
  detectHitPlayerRukus,
}