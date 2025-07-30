import {
  syncCellDoorVisibility,
  formatTime,
  redLit,
  clockLit,
  cleanupEscapedNeighbors,
  getZSortedEntities,
  gameOverWin,
  gameOverLoose,
  startCountUpTimer,
  stopCountUpTimer,
  pauseCountUpTimer,
  player as player2,
  dog as dog2,
  redNotLit,
} from "../index.js";

import {
  detectHitPlayerToSpot,
  detectHitPlayer,
  detectHitPlayerRed,
  detectHitPlayerClock,
  detectHitDog,
  detectHitNeighbor,
  detectHitPlayerNeighbor,
  detectHitPlayerRukus,
} from "../utils/collision.js";

import { drawPlayer, playerImg } from "../animation/playerAnimations.js";
import { drawDog, dogImg } from "../animation/dogAnimations.js";
import {
  drawNeighbor,
  setNeighborState,
} from "../animation/neighborAnimations.js";

import { animation120, spriteAnimations120, staggerFrames120 } from "../animation/cellDoorAnimations.js";

import {
  animation3,
  animation4,
  clockImg,
  playerGlovesImg,
  redBullImg,
} from "../animation/animator.js";

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
  boxDiv,
  gOScreen,
  scoreH2,
  urScore,
  urScore2,
  urScore3,
  urScore4,
  urScoreCon2,
  urScoreCon3,
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
  scores,
  cellDoorImages,
  lastVisibleDoors,
} from "../gameState/gameState.js";

import { settings } from "../settings/settings.js";

import { CellSpot } from "../entities/cellSpot.js";

const movement = document.getElementById("movement");
const escapedCount = document.getElementById("escapedCount");
const carryCount = document.getElementById("carryCount");

let maxCarryAmount = 1;

export function gameLoop(ctx) {
  gameState.globalFrame++;

  drawPlayer(ctx, gameState.globalFrame);
  drawDog(ctx, gameState.globalFrame);
  drawNeighbor(ctx, gameState.globalFrame);

  ctx.clearRect(0, 0, 800, 600); // Sync cell door overlays with cellDoorZ state

  syncCellDoorVisibility();
  movement.textContent = `SCORE:${gameState.score - 2}`;

  for (const neighbor of neighbors) {
    if (neighbor.x <= ESCAPE_X_THRESHOLD) {
      escapedNeighbors.add(neighbor);
    }
  }

  const escapedCountTotal = escapedNeighbors.size;
  const carryCountTotal = gameState.playerCarrying.length;
  escapedCount.innerHTML = `ESCAPED:<br> ${escapedCountTotal} / 4`;
  carryCount.innerHTML = `HOLDING:<br> ${carryCountTotal} / ${maxCarryAmount}`;

  const scoreBox1 = document.getElementById("scoreBox1");
  const scoreBox2 = document.getElementById("scoreBox2");
  const scoreBox3 = document.getElementById("scoreBox3");

  if (scoreBox2) {
    scoreBox1.innerText = `SCORE: ${gameState.score - 2}`;
    scoreBox3.innerHTML = `ESCAPED:<br> ${escapedCountTotal} / 4`;
    scoreBox2.innerHTML = `HOLDING:<br> ${carryCountTotal} / ${maxCarryAmount}`;
  }

  if (escapedCountTotal === 4) {
    gameOverLoose();
  }

  settings.clockState2 === "move";


  //-----------------------------------------------------------------
  const cellDoorZs = [
    cellDoorZ1,
    cellDoorZ2,
    cellDoorZ3,
    cellDoorZ4,
    cellDoorZ5,
    cellDoorZ6,
    cellDoorZ7,
    cellDoorZ8,
    cellDoorZ9,
  ];

  cellDoorZs.forEach((cellDoorZ) => {
    if (cellDoorZ.alive) {
      detectHitPlayer(cellDoorZ);
    }
  });
  // LoosePrisoner location
  if (gameState.triggeredEvent && !gameState.endSceneStarted) {
    settings.stopped = false;
    if (lastSpot.alive) {
      dog.updatePosition(brokenSwitchSpot);
      detectHitDog(brokenSwitchSpot);
    } else {
      if (!cellDoorZ2.alive && gameState.score % 2 == 1) {
        dog.updatePosition(cellDoorZ2);
        detectHitDog(cellDoorZ2);
      } else if (!cellDoorZ3.alive && gameState.score % 2 == 0) {
        dog.updatePosition(cellDoorZ3);
        detectHitDog(cellDoorZ3);
      } else if (!cellDoorZ1.alive && gameState.score % 2 == 1) {
        dog.updatePosition(cellDoorZ1);
        detectHitDog(cellDoorZ1);
      } else if (!cellDoorZ5.alive && gameState.score % 2 == 0) {
        dog.updatePosition(cellDoorZ5);
        detectHitDog(cellDoorZ5);
      } else if (!cellDoorZ6.alive && gameState.score % 2 == 1) {
        dog.updatePosition(cellDoorZ6);
        detectHitDog(cellDoorZ6);
      } else if (!cellDoorZ7.alive && gameState.score % 2 == 0) {
        dog.updatePosition(cellDoorZ7);
        detectHitDog(cellDoorZ7);
      } else if (!cellDoorZ8.alive && gameState.score % 2 == 1) {
        dog.updatePosition(cellDoorZ8);
        detectHitDog(cellDoorZ8);
      } else if (!cellDoorZ4.alive && gameState.score % 2 == 0) {
        detectHitDog(cellDoorZ4);
        dog.updatePosition(cellDoorZ4);
      } else {
        if (!lastSpot.alive) {
          dog.updatePosition(dogSit);
          detectHitDog(rukusSwitchSpot);
        }
      }
    }
  } else if (!gameState.endSceneStarted) {
    setTimeout(() => {
      settings.dogSpeed = 1;
      dog.updatePosition(dogSpot2);
    }, 2000);
  }

  const neighborsNotEscaped = neighbors.filter(
    (neighbor) => !escapedNeighbors.has(neighbor)
  );
  // console.log("neighborsNotEscaped:", neighborsNotEscaped);

  const allCellDoorZsNotAlive = cellDoorZs.every(
    (cellDoorZ) => !cellDoorZ.alive
  );
  // console.log("allCellDoorZsNotAlive:", allCellDoorZsNotAlive);

  const allCellSpotsOccupied = cellSpots.every((cellSpot) => cellSpot.occupied);
  // console.log("allCellSpotsOccupied:", allCellSpotsOccupied);

  // console.log("lastSpot.alive:", lastSpot.alive);

  if (
    allCellDoorZsNotAlive &&
    lastSpot.alive
    // allCellSpotsOccupied &&
    // neighborsNotEscaped.length === 0
  ) {
    // console.log("GAME SHOULD BE OVER");
    detectHitPlayerRukus();
  }

  if (settings.guardBootsColor === "blue") {
    player.speed = 6;
  } else if (settings.guardBootsColor === "red") {
    player.speed = 7;
  } else if (settings.guardBootsColor === "green") {
    player.speed = 8;
  } else if (settings.guardBootsColor === "yellow") {
    player.speed = 9;
  } else if (settings.guardBootsColor === "purple") {
    player.speed = 10;
  } else if (settings.guardBootsColor === "rainbow") {
    player.speed = 11;
  }

  if (settings.guardWearingGloves) {
    if (settings.guardGlovesColor === "blue") {
      maxCarryAmount = 2;
    } else if (settings.guardGlovesColor === "red") {
      maxCarryAmount = 3;
    } else if (settings.guardGlovesColor === "yellow") {
      maxCarryAmount = 4;
    } else if (settings.guardGlovesColor === "green") {
      maxCarryAmount = 5;
    } else if (settings.guardGlovesColor === "purple") {
      maxCarryAmount = 6;
    } else if (settings.guardGlovesColor === "rainbow") {
      maxCarryAmount = 7;
    }
  }

  if (redBull.alive) {
    detectHitPlayerRed(redBull);
  }

  if (slowDownClock.alive) {
    detectHitPlayerClock(slowDownClock);
  }

  if (gameState.score == 14) {
    settings.glovesColor = "rainbow";
  }

  if (gameState.score == 13) {
    settings.bootsColor = "rainbow";
  }

  if (gameState.score == 12) {
    settings.glovesColor = "purple";
  }

  if (gameState.score == 11) {
    settings.bootsColor = "purple";
  }

  if (gameState.score == 10) {
    settings.glovesColor = "green";
  }

  if (gameState.score == 9) {
    settings.bootsColor = "green";
  }

  if (gameState.score == 8) {
    settings.glovesColor = "yellow";
  }

  if (gameState.score == 7) {
    settings.bootsColor = "yellow";
  }

  if (gameState.score == 6) {
    settings.glovesColor = "red";
  }

  if (gameState.score == 5) {
    settings.bootsColor = "red";
  }

  // Loop over all neighbors and handle their movement and state generically
  for (const neighbor of neighbors) {
    const cellSpot = neighbor.assignedCell;
    const assignedCellZ = cellToCellZ.get(cellSpot);
    const secondSpot = secondSpotMap.get(cellSpot);

    // Release the cell if the neighbor has progressed beyond it
    if (neighbor.madeItToSecond && cellSpot) {
      cellSpot.occupied = false;
      neighbor.assignedCell = null;
    }

    if (!lastSpot.alive) {
      if (assignedCellZ && assignedCellZ.alive) {
        detectHitNeighbor(neighbor, assignedCellZ);
        detectHitNeighbor(neighbor, secondSpot);
        if (!neighbor.madeItToFirst && !neighbor.isCaught) {
          neighbor.updatePosition(assignedCellZ);
        } else if (
          neighbor.madeItToFirst &&
          !neighbor.madeItToSecond &&
          !neighbor.isCaught
        ) {
          neighbor.updatePosition(secondSpot);
        } else if (neighbor.madeItToSecond && !neighbor.isCaught) {
          detectHitNeighbor(neighbor, lastSpot); // check BEFORE moving
          neighbor.updatePosition(lastSpot);
        }
      } else if (cellSpot) {
        if (neighbor.color !== "purple") {
          neighbor.updatePosition(cellSpot);
        } else {
          neighbor.updatePosition(waitSpot);
        }
      } else {
        detectHitNeighbor(neighbor, lastSpot);
        neighbor.updatePosition(lastSpot);
        // fallback if no assigned cell
      }
    }
  }
  //------------------------------------------------------------
  if (gameState.score >= 101) {
    settings.dogSpeed = 0.3;
    settings.neighborSpeed = 2;
  } else if (gameState.score >= 100) {
    settings.dogSpeed = 0.7;
    settings.neighborSpeed = 2;
  } else if (gameState.score >= 99) {
    settings.dogSpeed = 1.1;
    settings.neighborSpeed = 2;
  } else if (gameState.score >= 97) {
    settings.dogSpeed = 2;
    settings.neighborSpeed = 2;
  } else if (gameState.score >= 72) {
    settings.neighborSpeed = 2;
    settings.dogSpeed = 21;
  } else if (gameState.score == 61) {
    settings.neighborSpeed = 1.5;
  } else if (gameState.score >= 12) {
    settings.neighborSpeed = 1;
    settings.dogSpeed = 18;
  }

  if (cellDoorZ9.alive) {
    settings.bigDoorAlarmAnimationState = "open";
  } else if (!cellDoorZ9.alive && settings.rukusProgress <= 350) {
    settings.bigDoorAlarmAnimationState = "closedLights";
  }

  if (
    settings.guardProgress < 100 &&
    lastSpot.alive &&
    gameState.controlsEnabled
  ) {
    settings.lastDoorAlarmAnimationState = "alarm";
  }

  if (
    settings.rukusProgress > 350 &&
    !cellDoorZ9.alive &&
    gameState.controlsEnabled
  ) {
    settings.bigDoorAlarmAnimationState = "alarm";
  }

  //------------------------------------------------------

  // renders boots
  if (!redBull.alive) {
    redNotLit();
  }

  // determins when to allow guard to pickup prisoner
  neighbors.forEach((neighbor) => {
    if (
      (!gameState.carryState.carrying || settings.guardWearingGloves) &&
      neighbor.madeItToFirst
    ) {
      if (
        neighbor.color !== "purple" ||
        (settings.guardGlovesColor === "rainbow" &&
          playerCarrying.length === 0 &&
          settings.guardWearingGloves)
      )
        detectHitPlayerNeighbor(neighbor);
    }
  });

  // determins when to put prisoners down
  neighbors.forEach((neighbor) => {
    if (neighbor.isCaught) {
      neighbor.x = player.x - 35;
      neighbor.y = player.y - 5;
      for (const spot of cellSpots) {
        if (!spot.occupied && spot instanceof CellSpot) {
          if (
            neighbor.color !== "purple" &&
            spot.x !== cellDoorZ9.x &&
            spot.y !== cellDoorZ9.y
          ) {
            detectHitPlayerToSpot(neighbor, spot);
          } else {
            detectHitPlayerToSpot(neighbor, n9Spot);
          }
        }
      }
    }
  });

  if (settings.bootsColor === "blue") {
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationBlue.png`;
  } else if (settings.bootsColor === "red") {
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationRed.png`;
  } else if (settings.bootsColor === "green") {
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationGreen.png`;
  } else if (settings.bootsColor === "yellow") {
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationYellow.png`;
  } else if (settings.bootsColor === "purple") {
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationPurple.png`;
  } else if (settings.bootsColor === "rainbow") {
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationRainbow2.png`;
  }

  if (settings.glovesColor === "blue") {
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationBlue.png`;
  } else if (settings.glovesColor === "red") {
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationRed.png`;
  } else if (settings.glovesColor === "green") {
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationGreen.png`;
  } else if (settings.glovesColor === "yellow") {
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationYellow.png`;
  } else if (settings.glovesColor === "purple") {
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationPurple.png`;
  } else if (settings.glovesColor === "rainbow") {
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationRainbow2.png`;
  }

  if (!settings.guardWearingGloves && !settings.guardWearingBoots) {
    playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningSmallFinal.png";
  } else if (settings.guardWearingBoots) {
    if (settings.guardBootsColor === "blue") {
      playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningBoots.png";
    } else if (settings.guardBootsColor === "red") {
      playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningBootsRed.png";
    } else if (settings.guardBootsColor === "green") {
      playerImg.src =
        "SpaceChaserSprites/GuardSprite/guardRunningBootsGreen.png";
    } else if (settings.guardBootsColor === "yellow") {
      playerImg.src =
        "SpaceChaserSprites/GuardSprite/guardRunningBootsYellow.png";
    } else if (settings.guardBootsColor === "purple") {
      playerImg.src =
        "SpaceChaserSprites/GuardSprite/guardRunningBootsPurple.png";
    } else if (settings.guardBootsColor === "rainbow") {
      playerImg.src =
        "SpaceChaserSprites/GuardSprite/guardRunningBootsRainbow.png";
    }
  }

  if (settings.guardWearingGloves) {
    if (settings.guardGlovesColor === "blue") {
      playerGlovesImg.src =
        "SpaceChaserSprites/GuardSprite/guardRunningGlovesBlue2.png";
    } else if (settings.guardGlovesColor === "red") {
      playerGlovesImg.src =
        "SpaceChaserSprites/GuardSprite/guardRunningGlovesRed2.png";
    } else if (settings.guardGlovesColor === "green") {
      playerGlovesImg.src =
        "SpaceChaserSprites/GuardSprite/guardRunningGlovesGreen2.png";
    } else if (settings.guardGlovesColor === "yellow") {
      playerGlovesImg.src =
        "SpaceChaserSprites/GuardSprite/guardRunningGlovesYellow2.png";
    } else if (settings.guardGlovesColor === "purple") {
      playerGlovesImg.src =
        "SpaceChaserSprites/GuardSprite/guardRunningGlovesPurple2.png";
    } else if (settings.guardGlovesColor === "rainbow") {
      playerGlovesImg.src =
        "SpaceChaserSprites/GuardSprite/guardRunningGlovesRainbow2.png";
    }
  }

  // brokenSwitchSpot.render(ctx);
  // rukusSwitchSpot.render(ctx);
  // redBull.render(ctx);
  // slowDownClock.render(ctx);
  // player.render(ctx);
  // dog.render(ctx);
  // neighborOne.render(ctx);
  // neighborTwo.render(ctx);
  // neighborThree.render(ctx);
  // neighborFour.render(ctx);
  // neighborFive.render(ctx);
  // neighborSix.render(ctx);
  // neighborSeven.render(ctx);
  // neighborEight.render(ctx);
  // neighborNine.render(ctx);
  // dogSit.render(ctx);

  cleanupEscapedNeighbors();
  player.movePlayer();
  // Only call animation3() and animation4() (RedBull and Clock) directly here.
  // All other animations/draws are handled in z-sorted entity loop below.
  animation3();
  animation4();
  // drawExplosionEventAnimation();
  // animation55();
  detectHitPlayer(brokenSwitchSpot);
  detectHitPlayer(rukusSwitchSpot);
  // Draw all entities in z-sorted order, calling each entity's fn()
  const zEntities = getZSortedEntities(gameState.globalFrame);
  zEntities.forEach((e) => e.fn(ctx));

    if (gameState.playExplosion) {
    animation120(ctx, gameState.explosionFrameCount);

    gameState.explosionFrameCount++;

    const totalFrames =
      spriteAnimations120[gameState.explosionState].loc.length;
    const maxFrames = totalFrames * staggerFrames120;

    if (gameState.explosionFrameCount >= maxFrames) {
      gameState.playExplosion = false;
      gameState.explosionFinished = true;
    }
  }
  // At this point, the player and all cell doors have been drawn in z-order.
  // No further draw calls overwrite the canvas after this loop.
}
export { settings };
