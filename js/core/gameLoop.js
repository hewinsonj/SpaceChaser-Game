import {
  settings,
  detectHitPlayerToSpot,
  syncCellDoorVisibility,
  score,
  movement,
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
  pooSpot1,
  pooSpot2,
  pooSpot3,
  pooSpot4,
  pooSpot5,
  pooSpot6,
  pooSpot7,
  pooSpot8,
  n1Spot,
  // Added imports as requested:
  player as player2,
  dog as dog2,
  animation3, 
  animation4, 
  carryState,
  CellSpot
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


export function gameLoop(ctx) {
  ctx.clearRect(0, 0, 800, 600); // Sync cell door overlays with pooSpot state
  syncCellDoorVisibility();
  scoreH2.innerText = `Poo Count:${score - 2}`;
  urScore.innerText = `You picked up ${score - 2} poos!`;
  urScore2.innerText = `You picked up ${score - 2} poos!
      That's Alot of Shit!`;
  urScore3.innerText = `You picked up ${score - 2} poos!`;
  urScore4.innerText = `You picked up ${score - 2} poos!`;

  if (score > 82) {
    movement.textContent = `You're On Your Own`;
  } else if (score > 57) {
    // movement.textContent = `Poos Until Next Power Up: ${82 - score}`;
    movement.textContent = `Cells Locked: ${score  - 2}`;
  } else if (score > 22) {
    // movement.textContent = `Poos Until Next Power Up: ${57 - score}`;
    movement.textContent = `Cells Locked: ${score - 2}`;

  } else if (score <= 22) {
    // movement.textContent = `
    // Poos Until Next Power Up: ${22 - score}`;
    movement.textContent = `Cells Locked: ${score - 2}`;

  }

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
  ];

  pooSpots.forEach((pooSpot) => {
    if (pooSpot.alive) {
      detectHitPlayer(pooSpot);
    }
  });

  // LoosePrisoner location

  if (!pooSpot4.alive && score % 2 == 0) {
    detectHitDog(pooSpot4);
    dog.updatePosition(pooSpot4);
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
  } else {
    dog.updatePosition2(dogSit);
  }

  // Loop over all neighbors and handle their movement and state generically
  for (const neighbor of neighbors) {
    const cellSpot = neighbor.assignedCell;
    const assignedPoo = cellToPooMap.get(cellSpot);
    const secondSpot = secondSpotMap.get(cellSpot);

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
        neighbor.updatePosition(lastSpot);
      }
    } else if (cellSpot) {
      neighbor.updatePosition(cellSpot);
    } else {
      neighbor.updatePosition(lastSpot); // fallback if no assigned cell
    }

    if (neighbor.madeItToFirst && !neighbor.isCaught && !carryState.carrying) {
      // console.log("CARRYING",carryState.carrying)
      detectHitPlayerNeighbor(neighbor);
    }
  }
  //------------------------------------------------------------
  if (score >= 101) {
    settings.dogSpeed = 0.3;
    message.textContent = `Dude.`;
    message2.textContent = `Dude.`;
    message3.textContent = `Dude.`;
    settings.neighborSpeed = 3;
  } else if (score >= 100) {
    settings.dogSpeed = 0.7;
    settings.neighborSpeed = 3;
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
    settings.neighborSpeed = 1;
    message.textContent = `Looks Like He's Almost Done!`;
    message2.textContent = `Looks Like He's Almost Done!`;
    message3.textContent = `Looks Like He's Almost Done!`;
  } else if (score >= 72) {
    settings.neighborSpeed = 0.3;
    settings.dogSpeed = 21;
  } else if (score == 61) {
    dogFast();
    settings.neighborSpeed = 0.15;
  } else if (score >= 12) {
    settings.neighborSpeed = 0.12;
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
    console.log("RED LIT YOOOOOO")
  }

  if (score == 82 && redLife == 2) {
    redBull.alive = true;
  }

  if (score >= 82 && redBull.alive) {
    // redBull.render()
    redLit();
    detectHitPlayerRed(redBull);
  }

  if (score >= 57 && slowDownClock.alive && redLife == 1) {
    // slowDownClock.render()
    clockLit();
    detectHitPlayerClock(slowDownClock);
  }

  neighbors.forEach((neighbor) => {
    if (!carryState.carrying && neighbor.madeItToFirst) {
      detectHitPlayerNeighbor(neighbor);
    }
  });

neighbors.forEach((neighbor) => {
  if (neighbor.isCaught) {
    neighbor.x = player.x - 5;
    neighbor.y = player.y - 5;
    for (const spot of cellSpots) {
      if (!spot.occupied && spot instanceof CellSpot) {
        detectHitPlayerToSpot(neighbor, spot);
        // console.log(neighbor, spot)
        // carryState.carrying = false;
        console.log("carryState.carrying = ", carryState.carrying, "after player hit spot")
      }
    }
  }
});

  cleanupEscapedNeighbors();
  player.movePlayer();
  // Only call animation3() and animation4() (RedBull and Clock) directly here.
  // All other animations/draws are handled in z-sorted entity loop below.
  animation3();
  animation4();

  // Draw all entities in z-sorted order, calling each entity's fn()
  const zEntities = getZSortedEntities();
  zEntities.forEach((e) => e.fn());

  // At this point, the player and all cell doors have been drawn in z-order.
  // No further draw calls overwrite the canvas after this loop.
  gameOverWin();
}
