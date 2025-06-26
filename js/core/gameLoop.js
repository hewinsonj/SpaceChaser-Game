import {
  settings,
  detectHitPlayerToSpot,
  syncCellDoorVisibility,
  score,
  movement,
  escapedCount,
  carryCount,
  formatTime,
  currentTime,
  timer,
  scoreH2,
  urScore,
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
  dogFast,
  dogSit,
  player,
  neighbors,
  cellToPooMap,
  secondSpotMap,
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
  CellSpot,
  // guardWearingBoots,
  //   lastSpot as lastSpot2
} from "../index.js";


function redLit() {
  // console.log("settings.redBullState:", settings.redBullState)
  settings.redBullState = "onlyMove";

}

function redNotLit() {
  settings.redBullState = "noMove";
}

function clockLit() {
  settings.clockState = 'onlyMove'
}


let maxCarryAmount = 1


export function gameLoop(ctx) {
  ctx.clearRect(0, 0, 800, 600); // Sync cell door overlays with pooSpot state
  syncCellDoorVisibility();
  scoreH2.innerText = `Poo Count:${score - 2}`;
  urScore.innerText = `You picked up ${score - 2} poos!`;
  urScore2.innerText = `You picked up ${score - 2} poos!
      That's Alot of Shit!`;
  urScore3.innerText = `You picked up ${score - 2} poos!`;
  urScore4.innerText = `You picked up ${score - 2} poos!`;
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

  // LoosePrisoner location

  if (!pooSpot9.alive && score % 2 == 0 && score >= 61) {
    dog.updatePosition(pooSpot9);
    detectHitDog(pooSpot9);
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
  } else if (!pooSpot4.alive && score % 2 == 0) {
    detectHitDog(pooSpot4);
    dog.updatePosition(pooSpot4);
  } else {
    dog.updatePosition2(dogSit);
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
    }

    // if (neighbor.madeItToFirst && !neighbor.isCaught && (!carryState.carrying || settings.guardWearingGloves)) {
    //   // console.log("allowed to carry ",carryState.carrying)
    //   if(neighbor.color === "purple"){
    //       detectHitPlayerNeighbor(neighbor);
    //   }
    // }
  }
  //------------------------------------------------------------
  if (score >= 101) {
    settings.dogSpeed = 0.3;
    message.textContent = `Dude.`;
    message2.textContent = `Dude.`;
    message3.textContent = `Dude.`;
    settings.neighborSpeed = 2;
  } else if (score >= 100) {
    settings.dogSpeed = 0.7;
    settings.neighborSpeed = 2;
    message.textContent = `Oh come on now....`;
    message2.textContent = `Oh come on now....`;
    message3.textContent = `Oh come on now....`;
  } else if (score >= 99) {
    settings.dogSpeed = 1.1;
    settings.neighborSpeed = 2;
    message.textContent = `Any Day Now...`;
    message2.textContent = `Any Day Now...`;
    message3.textContent = `Any Day Now...`;
  } else if (score >= 97) {
    settings.dogSpeed = 2;
    settings.neighborSpeed = 2;
    message.textContent = `Looks Like He's Almost Done!`;
    message2.textContent = `Looks Like He's Almost Done!`;
    message3.textContent = `Looks Like He's Almost Done!`;
  } else if (score >= 72) {
    settings.neighborSpeed = 2;
    settings.dogSpeed = 21;
  } else if (score == 61) {
    dogFast();
    settings.neighborSpeed = 1.5;
  } else if (score >= 12) {
    settings.neighborSpeed = 1;
    settings.dogSpeed = 18;
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
    // console.log("RED LIT YOOOOOO")
  }

  if (score == 82 && redLife == 2) {
    redBull.alive = true;
  }

  if (score >= 82 && redBull.alive) {
    // redBull.render()
    redLit();
    detectHitPlayerRed(redBull);
  }

  if (score >= 51 && slowDownClock.alive ) {
    // slowDownClock.render()
    clockLit();
    detectHitPlayerClock(slowDownClock);
  }

  neighbors.forEach((neighbor) => {

  if ((!carryState.carrying || (settings.guardWearingGloves)) && neighbor.madeItToFirst){
    if(neighbor.color !== "purple" || settings.guardGlovesColor === "rainbow" && playerCarrying.length === 0 && settings.guardWearingGloves)
      detectHitPlayerNeighbor(neighbor);
    }
  });

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

brokenSwitchSpot.render(ctx);
rukusSwitchSpot.render(ctx);
redBull.render(ctx);
slowDownClock.render(ctx);
player.render(ctx);
dog.render(ctx);
neighborOne.render(ctx);
neighborTwo.render(ctx);
neighborThree.render(ctx);
neighborFour.render(ctx);
neighborFive.render(ctx);
neighborSix.render(ctx);
neighborSeven.render(ctx);
neighborEight.render(ctx);
neighborNine.render(ctx);
dogSit.render(ctx);

  cleanupEscapedNeighbors();
  player.movePlayer();
  // Only call animation3() and animation4() (RedBull and Clock) directly here.
  // All other animations/draws are handled in z-sorted entity loop below.
  animation3();
  animation4();
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
