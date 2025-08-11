import {
  // Core entities
  player,
  dog,
  cellSpots,
  cellToCellZ,
  secondSpotMap,
  cellDoorZ9,
  lastSpot,

  // Powerups
  redBull,
  slowDownClock,

  // Progress bars
  guardMovingProgressBar,
  rukusMovingProgressBar,

  // Game state
  gameState,
} from "../gameState/gameState.js";

import { settings } from "../settings/settings.js";

import {
  playerEnters,
  redLit,
  redNotLit,
  clockLit,
  clockNotLit,
  endScene,
} from "../index.js";

import {
  setBrokenSwitchAnimationState,
  setExitSignState,
} from "../animation/cellDoorAnimations.js";

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
    gameState.playerCarrying = gameState.playerCarrying.filter(
      (n) => n !== neighbor
    );
  }
}

const detectHitPlayerRukus = () => {
  if (
    dog.x < player.x + player.width &&
    dog.x + dog.width > player.x &&
    dog.y < player.y + player.height &&
    dog.y + dog.height > player.y
  ) {
    endScene();
    console.log("player hit rukus");
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

      if (gameState.score == 242) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (gameState.score == 222) {
        redBull.alive = true;
        redLit();
      }
      if (gameState.score == 202) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (gameState.score == 182) {
        redBull.alive = true;
        redLit();
      }
      if (gameState.score == 162) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (gameState.score == 142) {
        redBull.alive = true;
        redLit();
      }
      if (gameState.score == 122) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (gameState.score == 102) {
        redBull.alive = true;
        redLit();
      }
      if (gameState.score == 82) {
        clockLit();
        slowDownClock.alive = true;
      }
      if (gameState.score == 62) {
        redBull.alive = true;
        redLit();
      }
      if (gameState.score == 42) {
        clockLit();
        slowDownClock.alive = true;
        console.log("slowDownClock.alive", slowDownClock.alive)
      }
      if (gameState.score == 22) {
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
        setBrokenSwitchAnimationState("move");
        settings.lastDoorAlarmAnimationState = "open";
        gameState.sceneEnded = true;
        playerEnters();
        setExitSignState("move");
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
      gameState.playerCarrying.length <= 1 &&
      settings.guardWearingGloves
    ) {
      neighbor.isCaught = true;
      gameState.playerCarrying.push(neighbor);
      gameState.carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (
      !settings.guardWearingGloves &&
      !gameState.playerCarrying.length
    ) {
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
      gameState.carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (
      settings.guardGlovesColor === "yellow" &&
      gameState.playerCarrying.length <= 3
    ) {
      gameState.playerCarrying.push(neighbor);
      neighbor.isCaught = true;
      gameState.carryState.carrying = true;
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
      gameState.carryState.carrying = true;
      neighbor.madeItToFirst = false;
      neighbor.madeItToSecond = false;
      if (neighbor.assignedCell) {
        neighbor.assignedCell.occupied = false;
      }
    } else if (
      settings.guardGlovesColor === "purple" &&
      gameState.playerCarrying.length <= 5
    ) {
      neighbor.isCaught = true;
      gameState.playerCarrying.push(neighbor);
      gameState.carryState.carrying = true;
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
      gameState.carryState.carrying = true;
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
};
