import {
  settings,
  detectHitPlayerToSpot,
  syncCellDoorVisibility,
  score,
  movement,
  escapedCount,
  carryCount,
  formatTime,
  redLit,
  clockLit,
  currentTime,
  triggeredEvent,
  timer,
  scoreH2,
  urScore,
  redBullImg,
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
  dogSpot2,
  player,
  neighbors,
  cellToPooMap,
  secondSpotMap,
  clockImg,
  lastSpot,
  detectHitPlayer,
  detectHitDog,
  detectHitNeighbor,
  detectHitPlayerNeighbor,
  detectHitPlayerRed,
  detectHitPlayerClock,
  cleanupEscapedNeighbors,
  getZSortedEntities,
  gameOverWin,
  escapedNeighbors,
  ESCAPE_X_THRESHOLD,
  pooSpot1,
  pooSpot2,
  pooSpot3,
  pooSpot4,
  pooSpot5,
  pooSpot6,
  pooSpot7,
  pooSpot8,
  pooSpot9,
  n9Spot,
  waitSpot,
  neighborOne,
  neighborTwo,
  neighborThree,
  neighborFour,
  neighborFive,
  neighborSix,
  neighborSeven,
  neighborEight,
  neighborNine,
  brokenSwitchSpot,
  rukusSwitchSpot,
  guardMovingProgressBar,
  playerImg,
  playerGlovesImg,
  playerCarrying,
  startCountUpTimer,
  stopCountUpTimer, 
  player as player2,
  dog as dog2,
  animation3, 
  animation4, 
  // animation88,
  carryState,
  redNotLit,
  CellSpot,
  // startExplosionEventAnimation,
  // drawExplosionEventAnimation,
  // guardWearingBoots,
  //   lastSpot as lastSpot2
} from "../index.js";

let maxCarryAmount = 1

export function gameLoop(ctx) {

  ctx.clearRect(0, 0, 800, 600); // Sync cell door overlays with pooSpot state
  syncCellDoorVisibility();
  scoreH2.innerText = `SCORE: ${score - 2}`;
  urScore.innerText = `SCORE: ${score - 2}`;
  urScore2.innerText = `SCORE: ${score - 2}`;
  urScore3.innerText = `SCORE: ${score - 2}`;
  urScore4.innerText = `SCORE: ${score - 2}`;
  movement.textContent = `SCORE: ${score  - 2}`;

  for (const neighbor of neighbors) {
  if (neighbor.x <= ESCAPE_X_THRESHOLD) {
    escapedNeighbors.add(neighbor);
  }
}

const escapedCountTotal = escapedNeighbors.size;
const carryCountTotal = playerCarrying.length;
escapedCount.innerHTML = `ESCAPED:<br> ${escapedCountTotal} / 4`;
carryCount.innerHTML = `HOLDING:<br> ${carryCountTotal}/${maxCarryAmount}`;
// timer.innerHTML = `${formatTime(currentTime)}`;


settings.clockState2 ===  "move"

  //-----------------------------------------------------------------
  const pooSpots = [
    pooSpot1,
    pooSpot2,
    pooSpot3,
    pooSpot4,
    pooSpot5,
    pooSpot6,
    pooSpot7,
    pooSpot8,
    pooSpot9,
  ];

  pooSpots.forEach((pooSpot) => {
    if (pooSpot.alive) {
      detectHitPlayer(pooSpot);
    }
  });
    // console.log(lastSpot.alive, "alive?")

  // LoosePrisoner location
    if(triggeredEvent){
      settings.stopped = false
      if(lastSpot.alive){ 
        dog.updatePosition(brokenSwitchSpot);
        detectHitDog(brokenSwitchSpot);
      } else {
                  // console.log(settings.dogSpeed, "settings.dogSpeed")

        if (!pooSpot2.alive && score % 2 == 1) {
          dog.updatePosition(pooSpot2);
          detectHitDog(pooSpot2);
        } else if (!pooSpot3.alive && score % 2 == 0) {
          // console.log("headed to first spot")
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
        } else if (!pooSpot4.alive && score % 2 == 0) {
          detectHitDog(pooSpot4);
          dog.updatePosition(pooSpot4);
        } else { if(!lastSpot.alive){
          dog.updatePosition(dogSit);
          detectHitDog(rukusSwitchSpot);
          };
        };
      };  
    } else {
      setTimeout(() => {
      settings.dogSpeed = 1
         console.log("hit intro speed 1" )
      dog.updatePosition(dogSpot2)
      }, 2000);  
    };

    if (settings.guardBootsColor === "blue"){
      player.speed = 6
    } else if (settings.guardBootsColor === "red"){
      player.speed = 7
    } else if (settings.guardBootsColor === "green"){
      player.speed = 8
    } else if (settings.guardBootsColor === "yellow"){
      player.speed = 9
    } else if (settings.guardBootsColor === "purple"){
      player.speed = 10
    } else if (settings.guardBootsColor === "rainbow"){
      player.speed = 11
    }

    if(settings.guardWearingGloves){
      if(settings.guardGlovesColor === "blue"){
        maxCarryAmount = 2
      } else if(settings.guardGlovesColor === "red"){
        maxCarryAmount = 3
      } else if(settings.guardGlovesColor === "yellow"){
        maxCarryAmount = 4
      } else if(settings.guardGlovesColor === "green"){
        maxCarryAmount = 5
      } else if(settings.guardGlovesColor === "purple"){  
        maxCarryAmount = 6
      } else if(settings.guardGlovesColor === "rainbow"){
        maxCarryAmount = 7
      }
  };

  if (score == 14 && slowDownClock.alive){
      detectHitPlayerClock(slowDownClock);
  };
  if (score == 14) {
      settings.glovesColor = "rainbow"
      slowDownClock.alive = true;
  };
  if (score == 13 && redBull.alive) {
      detectHitPlayerRed(redBull);
    };
  if (score == 13) {
      settings.bootsColor = "rainbow"
      redBull.alive = true;
  };
  if (score == 12 && slowDownClock.alive ) {
      detectHitPlayerClock(slowDownClock);
  };
  if (score == 12) {
      settings.glovesColor = "purple"
      slowDownClock.alive = true;
  };
  if (score == 11 && redBull.alive) {
      detectHitPlayerRed(redBull);
    };
  if (score == 11) {
      settings.bootsColor = "purple"
      redBull.alive = true;
  };
  if (score == 10 && slowDownClock.alive ) {
      detectHitPlayerClock(slowDownClock);
  };
  if (score == 10) {
      settings.glovesColor = "green"
      slowDownClock.alive = true;
  };
  if (score == 9 && redBull.alive) {
      detectHitPlayerRed(redBull);
    };
  if (score == 9) {
      settings.bootsColor = "green"
      redBull.alive = true;
  };
  if (score == 8 && slowDownClock.alive ) {
      detectHitPlayerClock(slowDownClock);
  };
  if (score == 8) {
      settings.glovesColor = "yellow"
      slowDownClock.alive = true;
  };
  if (score == 7 && redBull.alive) {
      detectHitPlayerRed(redBull);
    };
  if (score == 7) {
      settings.bootsColor = "yellow"
      redBull.alive = true;
  };
  if (score == 6 && slowDownClock.alive ) {
      detectHitPlayerClock(slowDownClock);
  };
  if (score == 6) {
      settings.glovesColor = "red"
      slowDownClock.alive = true;
  };
  if (score == 5 && redBull.alive) {
      detectHitPlayerRed(redBull);
    };
  if (score == 5) {
      settings.bootsColor = "red"
      redBull.alive = true;
  };
  if (score == 4 && slowDownClock.alive ) {
      detectHitPlayerClock(slowDownClock);
  };
  if (score == 3 && redBull.alive) {
      detectHitPlayerRed(redBull);
  };


  // Loop over all neighbors and handle their movement and state generically
  for (const neighbor of neighbors) {
    const cellSpot = neighbor.assignedCell;
    const assignedPoo = cellToPooMap.get(cellSpot);
    const secondSpot = secondSpotMap.get(cellSpot);
      // detectHitNeighbor(neighbor, lastSpot);
     
    // Release the cell if the neighbor has progressed beyond it
    if (neighbor.madeItToSecond && cellSpot) {
      cellSpot.occupied = false;
      neighbor.assignedCell = null;
    }

if(!lastSpot.alive){
    if (assignedPoo && assignedPoo.alive) {
      detectHitNeighbor(neighbor, assignedPoo);
      detectHitNeighbor(neighbor, secondSpot);
    if (!neighbor.madeItToFirst && !neighbor.isCaught) {
      neighbor.updatePosition(assignedPoo);
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
      if(neighbor.color !== "purple"){
      neighbor.updatePosition(cellSpot);
      } else {
        neighbor.updatePosition(waitSpot);
      }
    } else {
      detectHitNeighbor(neighbor, lastSpot);  
      neighbor.updatePosition(lastSpot); 
      // fallback if no assigned cell
    };
  };
  };
  //------------------------------------------------------------
  if (score >= 101) {
    settings.dogSpeed = 0.3;
    settings.neighborSpeed = 2;
  } else if (score >= 100) {
    settings.dogSpeed = 0.7;
    settings.neighborSpeed = 2;
  } else if (score >= 99) {
    settings.dogSpeed = 1.1;
    settings.neighborSpeed = 2;
  } else if (score >= 97) {
    settings.dogSpeed = 2;
    settings.neighborSpeed = 2;
  } else if (score >= 72) {
    settings.neighborSpeed = 2;
    settings.dogSpeed = 21;
  } else if (score == 61) {
    settings.neighborSpeed = 1.5;
  } else if (score >= 12) {
    settings.neighborSpeed = 1;
    settings.dogSpeed = 18;
  }

  //------------------------------------------------------

  // renders boots
  if (!redBull.alive) {
    redNotLit();
  }

  // determins when to allow guard to pickup prisoner
  neighbors.forEach((neighbor) => {
    if ((!carryState.carrying || (settings.guardWearingGloves)) && neighbor.madeItToFirst){
      if(neighbor.color !== "purple" || settings.guardGlovesColor === "rainbow" && playerCarrying.length === 0 && settings.guardWearingGloves)
        detectHitPlayerNeighbor(neighbor);
      }
  });

  // determins when to put prisoners down
  neighbors.forEach((neighbor) => {
    if (neighbor.isCaught) {
      neighbor.x = player.x - 35;
      neighbor.y = player.y - 35;
      for (const spot of cellSpots) {
        if (!spot.occupied && spot instanceof CellSpot) {
          if(neighbor.color !== "purple" && spot.x !== pooSpot9.x && spot.y !== pooSpot9.y){
            detectHitPlayerToSpot(neighbor, spot);
          } else {
            detectHitPlayerToSpot(neighbor, n9Spot);
          }
        }
      }
    }
  });

  if(settings.bootsColor === "blue"){
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationBlue.png`;
  } else if(settings.bootsColor === "red"){
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationRed.png`;
  } else if(settings.bootsColor === "green"){
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationGreen.png`;
  } else if(settings.bootsColor === "yellow"){
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationYellow.png`;
  } else if(settings.bootsColor === "purple"){
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationPurple.png`;
  } else if(settings.bootsColor === "rainbow"){
    redBullImg.src = `SpaceChaserSprites/PowerUps/bootsAnimationRainbow2.png`;
  };

  if(settings.glovesColor === "blue"){
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationBlue.png`;
  } else if(settings.glovesColor === "red"){
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationRed.png`;
  } else if(settings.glovesColor === "green"){
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationGreen.png`;
  } else if(settings.glovesColor === "yellow"){
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationYellow.png`;
  } else if(settings.glovesColor === "purple"){
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationPurple.png`;
  } else if(settings.glovesColor === "rainbow"){
    clockImg.src = `SpaceChaserSprites/PowerUps/glovesAnimationRainbow2.png`;
  }

  if(!settings.guardWearingGloves && !settings.guardWearingBoots){
    playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningSmallFinal.png";
  } else if (settings.guardWearingBoots){
    if(settings.guardBootsColor === "blue"){
      playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningBoots.png";
    } else if (settings.guardBootsColor === "red"){
      playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningBootsRed.png";
    } else if (settings.guardBootsColor === "green"){
      playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningBootsGreen.png";
    } else if (settings.guardBootsColor === "yellow"){
      playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningBootsYellow.png";
    } else if (settings.guardBootsColor === "purple"){
      playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningBootsPurple.png";
    } else if (settings.guardBootsColor === "rainbow"){
      playerImg.src = "SpaceChaserSprites/GuardSprite/guardRunningBootsRainbow.png";
    }
  } 

  if(pooSpot9.alive){
    settings.bigDoorAlarmAnimationState = "open"
  } else {
    settings.bigDoorAlarmAnimationState = "closedLights"
  }

  if (settings.guardWearingGloves){
    if(settings.guardGlovesColor === "blue"){
      playerGlovesImg.src = "SpaceChaserSprites/GuardSprite/guardRunningGlovesBlue2.png";
    } else if (settings.guardGlovesColor === "red"){
      playerGlovesImg.src = "SpaceChaserSprites/GuardSprite/guardRunningGlovesRed2.png";
    } else if (settings.guardGlovesColor === "green"){
      playerGlovesImg.src = "SpaceChaserSprites/GuardSprite/guardRunningGlovesGreen2.png";
    } else if (settings.guardGlovesColor === "yellow"){
      playerGlovesImg.src = "SpaceChaserSprites/GuardSprite/guardRunningGlovesYellow2.png";
    } else if (settings.guardGlovesColor === "purple"){
      playerGlovesImg.src = "SpaceChaserSprites/GuardSprite/guardRunningGlovesPurple2.png";
    } else if (settings.guardGlovesColor === "rainbow"){
      playerGlovesImg.src = "SpaceChaserSprites/GuardSprite/guardRunningGlovesRainbow2.png";
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
  detectHitPlayer(brokenSwitchSpot)
  detectHitPlayer(rukusSwitchSpot)
  // Draw all entities in z-sorted order, calling each entity's fn()
  const zEntities = getZSortedEntities();
  zEntities.forEach((e) => e.fn());
  // At this point, the player and all cell doors have been drawn in z-order.
  // No further draw calls overwrite the canvas after this loop.
  gameOverWin();
}
