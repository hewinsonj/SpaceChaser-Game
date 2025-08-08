import { gameLoop } from "./core/gameLoop.js";
import {
  animation4,
  animation3,
  animation97,
  animation115,
  animation116,
} from "./animation/animator.js";
import {
  cell7Img,
  setWallTopState,
  setCell7State,
  setBrokenSwitchAnimationState,
  setBrokenSwitch2AnimationState,
  animation14,
  animation15,
  animation16,
  animation17,
  animation18,
  animation19,
  animation20,
  animation21,
  animation22,
  animation23,
  animation24,
  animation25,
  animation88,
  animation89,
  animation92,
  animation93,
  animation95,
  animation99,
  animation100,
  animation110,
  animation111,
  animation112,
  animation118,
} from "../js/animation/cellDoorAnimations.js";

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
  ESCAPE_X_THRESHOLD,
  // UI + DOM
  isMobile,
  isMobileLandscape,
  ctx,
  game,
  movement,
  timer,
  escapedCount,
  carryCount,
  message,
  message2,
  message3,
  boxDiv,
  scoreH2,
  urScore,
  urScore2,
  urScore3,
  urScore4,
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
  scores,
  movementContainer,
  cellDoorImages,
} from "./gameState/gameState.js";
import { settings } from "./settings/settings.js";
import { drawPlayer, playerImg } from "./animation/playerAnimations.js";
import { drawDog, setDogState, dogImg } from "./animation/dogAnimations.js";
import {
  drawNeighbor,
  setNeighborState,
  initNeighborSprites,
  preloadNeighborImages,
} from "./animation/neighborAnimations.js";

for (let i = 1; i <= 10; i++) {
  const img = new Image();
  img.src = `./SpaceChaserSprites/cellDoors/cellDoor${i}.png`;
  img.onerror = () => {
    console.warn(`Image failed to load: cellDoor${i}.png`);
  };
  cellDoorImages[i] = img;
}

// CellDoor animation function factory: returns object with drawFrame(ctx)
function cellDoorAnimation(i) {
  return {
    drawFrame(ctx) {
      if (cellDoorVisible[i] && cellDoorImages[i]) {
        ctx.drawImage(cellDoorImages[i], 0, 0, game.width, game.height);
      }
    },
  };
}

function showInitialCellDoors() {
  // Hide all cell doors first
  for (let i = 1; i <= 10; i++) cellDoorVisible[i] = false;
  // Show doors 4 and 7 as initially visible
  cellDoorVisible[4] = true;
  cellDoorVisible[7] = true;
}

// No more CellDoor class or instances needed; cellDoorAnimation(i) + cellDoorVisible[i] replaces them.

// Sync cell door visibility to cellDoorZ.alive state every frame
export function syncCellDoorVisibility() {
  // Map: [cellDoor index] = !cellDoorZX.alive
  cellDoorVisible[10] = !cellDoorZ1.alive;
  cellDoorVisible[9] = !cellDoorZ2.alive;
  cellDoorVisible[8] = !cellDoorZ3.alive;
  cellDoorVisible[6] = !cellDoorZ4.alive;
  cellDoorVisible[1] = !cellDoorZ5.alive;
  cellDoorVisible[2] = !cellDoorZ6.alive;
  cellDoorVisible[3] = !cellDoorZ7.alive;
  cellDoorVisible[5] = !cellDoorZ8.alive;
  cellDoorVisible[11] = !cellDoorZ9.alive;
  // cellDoorVisible[4] and [7] are set by showInitialCellDoors and not toggled here.
}

function removeContainerTopPadding() {
  const container = document.getElementById("container");
  if (container) {
    container.style.paddingTop = "0";
    container.style.backgroundImage = "none";
    if (isMobile || isMobileLandscape) {
      boxDiv.style.display = "flex";
    }
  }
}
// ======= Insert after your DOM grabs =======
const scoreUI = document.createElement("div");
scoreUI.id = "scoreUI";
scoreUI.style.display = "flex";
scoreUI.style.background = "rgba(0,0,0,1)";
scoreUI.style.color = "white";
scoreUI.style.fontFamily = "monospace";
scoreUI.style.fontSize = "2vh";
scoreUI.style.display = "none";
scoreUI.style.top = "4%";
(scoreUI.style.fontFamily = "DigitalNormal"), "monospace";
scoreUI.style.color = "darkRed";
scoreUI.style.position = "absolute";
scoreUI.style.zIndex = "10";

scores.forEach((text, index) => {
  const box = document.createElement("div");
  box.textContent = text;
  box.id = `scoreBox${index + 1}`;
  box.style.textAlign = "center";
  box.style.padding = "8px 0";
  scoreUI.appendChild(box);
});

// Placement based on orientation
if (isMobileLandscape) {
  scoreUI.style.fontSize = "1.5vw";
  scoreUI.style.flexDirection = "row";
  scoreUI.style.top = "0";
  scoreUI.style.left = "0";
  scoreUI.style.width = "35vw";
  scoreUI.style.gap = "18px";
  scoreUI.style.justifyContent = "space-evenly";
  scoreUI.style.boarder = "5px solid black";

  // Remove width stretch for landscape
  document.body.appendChild(scoreUI);

  // Adjust movement buttons to horizontal
  if (movementContainer) {
    movementContainer.style.display = "flex";
    movementContainer.style.flexDirection = "row";
    movementContainer.style.flexWrap = "wrap";
    movementContainer.style.justifyContent = "center";
    movementContainer.style.alignItems = "center";
    movementContainer.style.width = "100%";
  }
} else if (isMobile) {
  scoreUI.style.flexDirection = "row";
  scoreUI.style.position = "relative";
  scoreUI.style.gap = "18px";
  scoreUI.style.justifyContent = "space-evenly";
  scoreUI.style.width = "99%"; // only stretch in portrait
  const container = document.getElementById("container");
  container.parentNode.insertBefore(scoreUI, container.nextSibling);

  // Movement buttons vertical in portrait
  const movementContainer = document.getElementById("mobile-controls");
  if (movementContainer) {
    movementContainer.style.display = "flex";
    movementContainer.style.flexDirection = "column";
    movementContainer.style.justifyContent = "center";
    movementContainer.style.alignItems = "center";
    movementContainer.style.width = "auto";
  }
}

function play() {
  music.play();
  music.volume = 0.009;
}

function pause() {
  music.pause();
}

const toggleScreen = (id, toggle) => {
  let element = document.getElementById(id);
  let display = toggle ? (id === "canvas" ? "block" : "flex") : "none";
  element.style.display = display;
};

function refreshPage() {
  window.location.reload();
}

window.refreshPage = refreshPage;

function playerEnters() {
  player.speed = 1;
  player.setDirection("d");
  setTimeout(() => {
    player.speed = 1;
    player.unsetDirection("d");
    gameState.controlsEnabled = true;
  }, 1500);
}

function dogFast() {
  setTimeout(() => {
    settings.dogSpeed = 1.5;
  }, 1200);
}

const gameOverWin = () => {
  toggleScreen("musicButton", false);
  stopGameLoop();
  toggleScreen("start-screen", false);
  toggleScreen("game-over-screen-win", true);
  toggleScreen("canvas", false);
  toggleScreen("top-left", false);
  // toggleScreen("top-right", false);
  // toggleScreen("btm-left", false);
  // toggleScreen("btm-right", false);
  // toggleScreenCon("urScoreCon3", false);
  // toggleScreenCon("urScoreCon2", false);
  // toggleScreenCon("status", false);
  // toggleScreenCon("status2", false);
  pause();
  gameState.gameOn = false;
  gameState.gameOver = true;
  hideAllCellDoors();
  stopCountUpTimer();
  pauseCountUpTimer();
  // console.log("WIN STARTED")
};

function endScene() {
  // console.log("ENDSCENE STARTED")
  gameState.controlsEnabled = false;
  stopCountUpTimer();
  pauseCountUpTimer();
  setTimeout(() => {
    gameOverWin();
    window.allowOffScreen = false;
  }, 5000);
}

const startGame = () => {
  gameState.gameStarted = true;
  removeContainerTopPadding();
  scoreUI.style.display = "flex";

  if (!gameState.hasTriggeredEvent) {
    gameState.hasTriggeredEvent = true;
    setTimeout(() => {
      gameState.playExplosion = true;
      gameState.explosionFrameCount = 0;
      gameState.triggeredEvent = true;
      lastSpot.alive = true;
      setWallTopState("chopped");
      setCell7State("gone");
      setTimeout(() => {
        cell7Img.src = `SpaceChaserSprites/CellDoors/cellDoorA7FinalForm.png`;
        setWallTopState("full");
        setCell7State("noMove");
        dogFast();
      }, 1200); // swap image half a second later
    }, 3000); // wait 3 seconds after game starts
  }
  window.allowOffScreen = true; // at the start of your game
  toggleScreen("start-screen", false);
  toggleScreen("musicButton", true);
  toggleScreen("game-over-screen", false);
  toggleScreen("canvas", true);
  toggleScreen("ui-overlay", !(isMobile || isMobileLandscape));
  toggleScreen("movement", !(isMobile || isMobileLandscape));
  toggleScreen("escapedCount", !(isMobile || isMobileLandscape));
  toggleScreen("carryCount", !(isMobile || isMobileLandscape));
  toggleScreen("timer", !(isMobile || isMobileLandscape));

  play();
  gameState.gameOn = true;
  gameState.gameOver = false;
  startCountUpTimer(timer);
  showInitialCellDoors();
  startGameLoop();
};



const gameOverLoose = () => {
  stopGameLoop();
  toggleScreen("musicButton", false);
  gameState.gameOn = false;
  gameState.gameOver = true;
  stopCountUpTimer();
  pauseCountUpTimer();
  toggleScreen("start-screen", false);
  toggleScreen("game-over-screen", true);
  toggleScreen("canvas", false);
  toggleScreen("top-left", false);
  toggleScreen("btm-right", false);
  pause();
  hideAllCellDoors();
};

// Function to hide all cell door overlays
function hideAllCellDoors() {
  for (let i = 1; i <= 10; i++) cellDoorVisible[i] = false;
}

neighbors.forEach((neighbor, idx) => {
  const spot = neighborSpots[idx];

  neighbor.assignedCell = neighborSpots[idx];
  neighborSpots[idx].occupied = true;
});

neighbors.forEach((neighbor) => {
  neighbor.returnedToCell = false;
  neighbor.isCaught = false;
  neighbor.assignedCell = null;
  neighbor.madeItToFirst = false;
  neighbor.madeItToSecond = false;
  neighbor.madeItToLastSpot = false;

  // Set and occupy home cell
  neighbor.homeCell = homeCellMap.get(neighbor);
  neighbor.assignedCell = neighbor.homeCell;
  neighbor.homeCell.occupied = true;
});

guardMovingProgressBar.updatePosition = function (entity) {
  const diffX = guardMovingProgressBar.x;
  if (settings.guardProgress >= 437) {
    settings.lastDoorAlarmAnimationState = "closed";
    setBrokenSwitchAnimationState("noMove");
    lastSpot.alive = true;
  }
  if (diffX < 0 && entity.color === "lightsteelblue") {
    settings.guardProgress += 1;
    guardMovingProgressBar.x += 0.3;
  } else if (entity.color === "green") {
    if (settings.guardProgress <= 0) {
      settings.lastDoorAlarmAnimationState = "open";
      setBrokenSwitchAnimationState("move");
      lastSpot.alive = false;
    } else {
      settings.guardProgress -= 2;
      if (gameState.sceneEnded) {
        guardMovingProgressBar.x -= 0.6;
      }
    }
  }
};

rukusMovingProgressBar.updatePosition = function () {
  
  const diffX = rukusMovingProgressBar.x;
  if (settings.rukusProgress >= 431) {
    cellDoorZ9.alive = true;
    setBrokenSwitch2AnimationState("move");
    settings.rukusProgress = 0;
  }
  if (diffX > 0) {
    settings.rukusProgress += .1;
    rukusMovingProgressBar.x -= 0.03;
  }
};

dog.updatePosition = function (spotNum) {
  const threshold = 0.5;
  const diffX = spotNum.x - dog.x;
  const diffY = spotNum.y - dog.y;

  // Snap to target if close enough to stop jittering
  if (Math.abs(diffX) < threshold) dog.x = spotNum.x;
  if (Math.abs(diffY) < threshold) dog.y = spotNum.y;

  // Use threshold-based comparison instead of direct equality
  if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) {
    settings.stopped = true;
  } else {
    if (gameState.gameOn && settings.stopped == false) {
      if (diffX > threshold) {
        dog.x += settings.dogSpeed;
        setDogState("rightMove");
      } else if (diffX < -threshold) {
        dog.x -= settings.dogSpeed;
        setDogState("leftMove");
      }
      if (diffY > threshold) {
        dog.y += settings.dogSpeed;
      } else if (diffY < -threshold) {
        dog.y -= settings.dogSpeed;
      }
    }
  }
};

neighborOne.updatePosition = function (spotNum) {
  const threshold = 0.5;
  const diffX = spotNum.x - neighborOne.x;
  const diffY = spotNum.y - neighborOne.y;

  // Snap to target if close enough to stop jittering
  if (Math.abs(diffX) < threshold) neighborOne.x = spotNum.x;
  if (Math.abs(diffY) < threshold) neighborOne.y = spotNum.y;

  const cellSpot = neighborOne.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  if (diffX > threshold) {
    neighborOne.x += settings.neighborSpeed;
  } else if (diffX < -threshold) {
    neighborOne.x -= settings.neighborSpeed;
  }

  if (
    (neighborOne.madeItToSecond && neighborOne.madeItToFirst) ||
    (neighborOne.assignedCell && neighborOne.assignedCell.alive)
  ) {
    setNeighborState(1, "downMove");
  } else if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) {
    setNeighborState(1, "downMove");
  } else if (diffY > threshold) {
    neighborOne.y += settings.neighborSpeed;
    setNeighborState(1, "downMove");
  } else if (diffY < -threshold) {
    neighborOne.y -= settings.neighborSpeed;
    setNeighborState(1, "upMove");
    if (!neighborOne.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      setNeighborState(1, "upMove");
    }
  } else if (neighborOne.madeItToSecond && neighborOne.madeItToFirst) {
    setNeighborState(1, "downMove");
  }
};

neighborTwo.updatePosition = function (spotNum) {
  const threshold = 0.5;
  const diffX = spotNum.x - neighborTwo.x;
  const diffY = spotNum.y - neighborTwo.y;
  const cellSpot = neighborTwo.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  // Snap to target if close enough to stop jittering
  if (Math.abs(diffX) < threshold) neighborTwo.x = spotNum.x;
  if (Math.abs(diffY) < threshold) neighborTwo.y = spotNum.y;

  if (diffX > threshold) {
    neighborTwo.x += settings.neighborSpeed;
  } else if (diffX < -threshold) {
    neighborTwo.x -= settings.neighborSpeed;
  }

  if (
    (neighborTwo.madeItToSecond && neighborTwo.madeItToFirst) ||
    (neighborTwo.assignedCell && neighborTwo.assignedCell.alive)
  ) {
    setNeighborState(2, "downMove");
  } else if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) {
    setNeighborState(2, "downMove");
  } else if (diffY > threshold) {
    neighborTwo.y += settings.neighborSpeed;
    setNeighborState(2, "downMove");
  } else if (diffY < -threshold) {
    neighborTwo.y -= settings.neighborSpeed;
    setNeighborState(2, "upMove");
    if (!neighborTwo.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      setNeighborState(2, "upMove");
    }
  } else if (neighborTwo.madeItToSecond && neighborTwo.madeItToFirst) {
    setNeighborState(2, "downMove");
  }
};

neighborThree.updatePosition = function (spotNum) {
  const threshold = 0.5;
  const diffX = spotNum.x - neighborThree.x;
  const diffY = spotNum.y - neighborThree.y;
  const cellSpot = neighborThree.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  // Snap to target if close enough to stop jittering
  if (Math.abs(diffX) < threshold) neighborThree.x = spotNum.x;
  if (Math.abs(diffY) < threshold) neighborThree.y = spotNum.y;

  if (diffX > threshold) {
    neighborThree.x += settings.neighborSpeed;
  } else if (diffX < -threshold) {
    neighborThree.x -= settings.neighborSpeed;
  }

  if (
    (neighborThree.madeItToSecond && neighborThree.madeItToFirst) ||
    (neighborThree.assignedCell && neighborThree.assignedCell.alive)
  ) {
    setNeighborState(3, "downMove");
  } else if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) {
    setNeighborState(3, "downMove");
  } else if (diffY > threshold) {
    neighborThree.y += settings.neighborSpeed;
    setNeighborState(3, "downMove");
  } else if (diffY < -threshold) {
    neighborThree.y -= settings.neighborSpeed;
    setNeighborState(3, "upMove");
    if (!neighborThree.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      setNeighborState(3, "upMove");
    }
  } else if (neighborThree.madeItToSecond && neighborThree.madeItToFirst) {
    setNeighborState(3, "downMove");
  }
};

neighborFour.updatePosition = function (spotNum) {
  const threshold = 0.5;
  const diffX = spotNum.x - neighborFour.x;
  const diffY = spotNum.y - neighborFour.y;
  const cellSpot = neighborFour.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  // Snap to target if close enough to stop jittering
  if (Math.abs(diffX) < threshold) neighborFour.x = spotNum.x;
  if (Math.abs(diffY) < threshold) neighborFour.y = spotNum.y;

  if (diffX > threshold) {
    neighborFour.x += settings.neighborSpeed;
  } else if (diffX < -threshold) {
    neighborFour.x -= settings.neighborSpeed;
  }

  if (
    (neighborFour.madeItToSecond && neighborFour.madeItToFirst) ||
    (neighborFour.assignedCell && neighborFour.assignedCell.alive)
  ) {
    setNeighborState(4, "downMove");
  } else if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) {
    setNeighborState(4, "downMove");
  } else if (diffY > threshold) {
    neighborFour.y += settings.neighborSpeed;
    setNeighborState(4, "downMove");
  } else if (diffY < -threshold) {
    neighborFour.y -= settings.neighborSpeed;
    setNeighborState(4, "upMove");
    if (!neighborFour.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      setNeighborState(4, "upMove");
    }
  } else if (neighborFour.madeItToSecond && neighborFour.madeItToFirst) {
    setNeighborState(4, "downMove");
  }
};

neighborFive.updatePosition = function (spotNum) {
  const threshold = 0.5;
  const diffX = spotNum.x - neighborFive.x;
  const diffY = spotNum.y - neighborFive.y;
  const cellSpot = neighborFive.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  // Snap to target if close enough to stop jittering
  if (Math.abs(diffX) < threshold) neighborFive.x = spotNum.x;
  if (Math.abs(diffY) < threshold) neighborFive.y = spotNum.y;

  if (diffX > threshold) {
    neighborFive.x += settings.neighborSpeed;
  } else if (diffX < -threshold) {
    neighborFive.x -= settings.neighborSpeed;
  }

  if (
    (neighborFive.madeItToSecond && neighborFive.madeItToFirst) ||
    (neighborFive.assignedCell && neighborFive.assignedCell.alive)
  ) {
    setNeighborState(5, "downMove");
  } else if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) {
    setNeighborState(5, "downMove");
  } else if (diffY > threshold) {
    neighborFive.y += settings.neighborSpeed;
    setNeighborState(5, "downMove");
  } else if (diffY < -threshold) {
    neighborFive.y -= settings.neighborSpeed;
    if (!neighborFive.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      setNeighborState(5, "upMove");
    }
  } else if (neighborFive.madeItToSecond && neighborFive.madeItToFirst) {
    setNeighborState(5, "downMove");
  }
};

neighborSix.updatePosition = function (spotNum) {
  const threshold = 0.5;
  const diffX = spotNum.x - neighborSix.x;
  const diffY = spotNum.y - neighborSix.y;
  const cellSpot = neighborSix.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  // Snap to target if close enough to stop jittering
  if (Math.abs(diffX) < threshold) neighborSix.x = spotNum.x;
  if (Math.abs(diffY) < threshold) neighborSix.y = spotNum.y;

  if (diffX > threshold) {
    neighborSix.x += settings.neighborSpeed;
  } else if (diffX < -threshold) {
    neighborSix.x -= settings.neighborSpeed;
  }

  if (
    (neighborSix.madeItToSecond && neighborSix.madeItToFirst) ||
    (neighborSix.assignedCell && neighborSix.assignedCell.alive)
  ) {
    setNeighborState(6, "downMove");
  } else if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) {
    setNeighborState(6, "downMove");
  } else if (diffY > threshold) {
    neighborSix.y += settings.neighborSpeed;
    setNeighborState(6, "downMove");
  } else if (diffY < -threshold) {
    neighborSix.y -= settings.neighborSpeed;
    if (!neighborSix.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      setNeighborState(6, "upMove");
    }
  } else if (neighborSix.madeItToSecond && neighborSix.madeItToFirst) {
    setNeighborState(6, "downMove");
  }
};

neighborSeven.updatePosition = function (spotNum) {
  const threshold = 0.5;
  const diffX = spotNum.x - neighborSeven.x;
  const diffY = spotNum.y - neighborSeven.y;
  const cellSpot = neighborSeven.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  // Snap to target if close enough to stop jittering
  if (Math.abs(diffX) < threshold) neighborSeven.x = spotNum.x;
  if (Math.abs(diffY) < threshold) neighborSeven.y = spotNum.y;

  if (diffX > threshold) {
    neighborSeven.x += settings.neighborSpeed;
  } else if (diffX < -threshold) {
    neighborSeven.x -= settings.neighborSpeed;
  }

  if (
    (neighborSeven.madeItToSecond && neighborSeven.madeItToFirst) ||
    (neighborSeven.assignedCell && neighborSeven.assignedCell.alive)
  ) {
    setNeighborState(7, "downMove");
  } else if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) {
    setNeighborState(7, "downMove");
  } else if (diffY > threshold) {
    neighborSeven.y += settings.neighborSpeed;
    setNeighborState(7, "downMove");
  } else if (diffY < -threshold) {
    neighborSeven.y -= settings.neighborSpeed;
    if (!neighborSeven.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      setNeighborState(7, "upMove");
    }
  } else if (neighborSeven.madeItToSecond && neighborSeven.madeItToFirst) {
    setNeighborState(7, "downMove");
  }
};

neighborEight.updatePosition = function (spotNum) {
  const threshold = 0.5;
  const diffX = spotNum.x - neighborEight.x;
  const diffY = spotNum.y - neighborEight.y;
  const cellSpot = neighborEight.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;

  // Snap to target if close enough to stop jittering
  if (Math.abs(diffX) < threshold) neighborEight.x = spotNum.x;
  if (Math.abs(diffY) < threshold) neighborEight.y = spotNum.y;

  if (diffX > threshold) {
    neighborEight.x += settings.neighborSpeed;
  } else if (diffX < -threshold) {
    neighborEight.x -= settings.neighborSpeed;
  }

  if (
    (neighborEight.madeItToSecond && neighborEight.madeItToFirst) ||
    (neighborEight.assignedCell && neighborEight.assignedCell.alive)
  ) {
    setNeighborState(8, "downMove");
  } else if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) {
    setNeighborState(8, "downMove");
  } else if (diffY > threshold) {
    neighborEight.y += settings.neighborSpeed;
    setNeighborState(8, "downMove");
  } else if (diffY < -threshold) {
    neighborEight.y -= settings.neighborSpeed;
    if (!neighborEight.madeItToSecond && assignedCellZ && assignedCellZ.alive) {
      setNeighborState(8, "upMove");
    }
  } else if (neighborEight.madeItToSecond && neighborEight.madeItToFirst) {
    setNeighborState(8, "downMove");
  }
};

neighborNine.updatePosition = function (spotNum) {
  const diffX = spotNum.x - neighborNine.x;
  const diffY = spotNum.y - neighborNine.y;
  const cellSpot = neighborNine.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;
  setNeighborState(9, "move");

  if (diffX > 0) {
    neighborNine.x += .5;
  } else if (diffX < 0) {
    neighborNine.x -= .5;
  }

  if (
    (neighborNine.madeItToSecond && neighborNine.madeItToFirst) ||
    (neighborNine.assignedCell && neighborNine.assignedCell.alive)
  ) {
  } else if (diffY > 0) {
    neighborNine.y += .5;
  } else if (diffY < 0) {
    neighborNine.y -= .5;
  }
};

// function that changes the player's direction
//
document.addEventListener("keydown", (e) => {
  if (gameState.controlsEnabled) {
    const key = e.key.toLowerCase();
    player.setDirection(key);
  }
});

document.addEventListener("keyup", (e) => {
  if (
    gameState.controlsEnabled &&
    ["w", "a", "s", "d"].includes(e.key.toLowerCase())
  ) {
    player.unsetDirection(e.key.toLowerCase());
  }
});

document.addEventListener("touchmove", (e) => {
  if (!gameState.controlsEnabled) return;
  player.unsetDirection("s");
  player.unsetDirection("a");
  player.unsetDirection("d");
  player.unsetDirection("w");
  if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    upButton
  ) {
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    downButton
  ) {
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    (leftButton || leftArrowL)
  ) {
    player.setDirection("a");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    (rightButton || rightArrowL)
  ) {
    player.setDirection("d");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topLeftButton
  ) {
    player.setDirection("a");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topLeftArrow
  ) {
    player.setDirection("a");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomLeftButton
  ) {
    player.setDirection("a");
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomLeftArrow
  ) {
    player.setDirection("a");
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topRightButton
  ) {
    player.setDirection("d");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topRightArrow
  ) {
    player.setDirection("d");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomRightButton
  ) {
    player.setDirection("s");
    player.setDirection("d");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomRightArrow
  ) {
    player.setDirection("s");
    player.setDirection("d");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    upButtonL
  ) {
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    downButtonL
  ) {
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    leftButtonL
  ) {
    player.setDirection("a");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    rightButtonL
  ) {
    player.setDirection("d");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topLeftButtonL
  ) {
    player.setDirection("a");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topLeftArrowL
  ) {
    player.setDirection("a");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomLeftButtonL
  ) {
    player.setDirection("a");
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomLeftArrowL
  ) {
    player.setDirection("a");
    player.setDirection("s");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topRightButtonL
  ) {
    player.setDirection("d");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    topRightArrowL
  ) {
    player.setDirection("d");
    player.setDirection("w");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomRightButtonL
  ) {
    player.setDirection("s");
    player.setDirection("d");
  } else if (
    document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) ==
    bottomRightArrowL
  ) {
    player.setDirection("s");
    player.setDirection("d");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const boxDiv = document.getElementById("boxDiv");
  if (boxDiv) {
    boxDiv.addEventListener("contextmenu", (e) => e.preventDefault());
  }
});
// Null-safe event listeners for touch controls
if (gameState.controlsEnabled) {
  if (upButton) {
    upButton.addEventListener("touchstart", (e) => {
      player.setDirection("w");
    });
  }
  if (downButton) {
    downButton.addEventListener("touchstart", (e) => {
      player.setDirection("s");
    });
  }
  if (leftButton) {
    leftButton.addEventListener("touchstart", (e) => {
      player.setDirection("a");
    });
  }
  if (rightButton) {
    rightButton.addEventListener("touchstart", (e) => {
      player.setDirection("d");
    });
  }
  if (upButtonL) {
    upButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("w");
    });
  }
  if (downButtonL) {
    downButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("s");
    });
  }
  if (leftButtonL) {
    leftButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("a");
    });
  }
  if (rightButtonL) {
    rightButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("d");
    });
  }
  if (topRightButton) {
    topRightButton.addEventListener("touchstart", (e) => {
      player.setDirection("d");
      player.setDirection("w");
    });
  }
  if (topRightButtonL) {
    topRightButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("d");
      player.setDirection("w");
    });
  }
  if (bottomRightButton) {
    bottomRightButton.addEventListener("touchstart", (e) => {
      player.setDirection("d");
      player.setDirection("s");
    });
  }
  if (bottomRightButtonL) {
    bottomRightButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("d");
      player.setDirection("s");
    });
  }
  if (bottomLeftButton) {
    bottomLeftButton.addEventListener("touchstart", (e) => {
      player.setDirection("a");
      player.setDirection("s");
    });
  }
  if (bottomLeftButtonL) {
    bottomLeftButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("a");
      player.setDirection("s");
    });
  }
  if (topLeftButton) {
    topLeftButton.addEventListener("touchstart", (e) => {
      player.setDirection("a");
      player.setDirection("w");
    });
  }
  if (topLeftButtonL) {
    topLeftButtonL.addEventListener("touchstart", (e) => {
      player.setDirection("a");
      player.setDirection("w");
    });
  }
}
document.addEventListener("touchend", (e) => {
  if (!gameState.controlsEnabled) return;
  player.unsetDirection("w");
  player.unsetDirection("a");
  player.unsetDirection("s");
  player.unsetDirection("d");
});

function clockNotLit() {
  settings.clockState = "noMove";
}

function cleanupEscapedNeighbors() {
  const allNeighbors = [
    neighborOne,
    neighborTwo,
    neighborThree,
    neighborFour,
    neighborFive,
    neighborSeven,
    neighborEight,
    neighborNine,
  ];

  for (const neighbor of allNeighbors) {
    if (neighbor.madeItToFirst && neighbor.assignedCell) {
      neighbor.assignedCell.occupied = false;
    }
  }
}
function animEntity(fn, getY, frameData) {
  return {
    fn: (ctx) => fn(ctx, frameData),
    get y() {
      return typeof getY === "function" ? getY() : getY;
    },
  };
}


function getZSortedEntities(globalFrame) {
  // Helper to wrap animation functions as entities with a draw method and y
  // Use .y of relevant objects for sorting; static overlays (walls/doors) use fixed Y (0)
  const arr = [
    animEntity((ctx) => drawNeighbor(ctx, 1, globalFrame), () => neighbors[0]?.y, globalFrame),
    animEntity((ctx) => drawNeighbor(ctx, 2, globalFrame), () => neighbors[1]?.y, globalFrame),
    animEntity((ctx) => drawNeighbor(ctx, 3, globalFrame), () => neighbors[2]?.y, globalFrame),
    animEntity((ctx) => drawNeighbor(ctx, 4, globalFrame), () => neighbors[3]?.y, globalFrame),
    animEntity((ctx) => drawNeighbor(ctx, 5, globalFrame), () => neighbors[4]?.y, globalFrame),
    animEntity((ctx) => drawNeighbor(ctx, 6, globalFrame), () => neighbors[5]?.y, globalFrame),
    animEntity((ctx) => drawNeighbor(ctx, 7, globalFrame), () => neighbors[6]?.y, globalFrame),
    animEntity((ctx) => drawNeighbor(ctx, 8, globalFrame), () => neighbors[7]?.y, globalFrame),
    // animEntity((ctx) => drawNeighbor(ctx, 9, globalFrame), () => neighbors[8]?.y, globalFrame),

    animEntity(animation115, 5, globalFrame), // glow spots
    animEntity(animation88, 107, globalFrame), // exitsign
    animEntity(animation89, 140, globalFrame), //brokenswitch
    animEntity(animation118, 300, globalFrame), // brokenswitch2
    animEntity(animation92, 107, globalFrame), // blinking rukus switch light
    animEntity(animation93, 120, globalFrame), //lastDoor
    animEntity(animation95, 286, globalFrame), // bigdoor alarm
    animEntity(animation24, 106, globalFrame), // wall top overlay (static, always on top or bottom as needed)
    // Cell doors 6-10 overlays (Y = 175)
    animEntity(animation19, 100, globalFrame), // cellDoorA6 overlay
    animEntity(animation20, 100, globalFrame), // cellDoorA7 overlay
    animEntity(animation21, 100, globalFrame), // cellDoorA8 overlay
    animEntity(animation22, 100, globalFrame), // cellDoorA9 overlay
    animEntity(animation23, 100, globalFrame), // cellDoorA10 overlay
    // Event trigger logic moved out of array; see below

    animEntity(drawPlayer, player.y, globalFrame),
    // animEntity(drawExplosionEventAnimation, 999),
    // Cell doors 1-5 overlays (Y = 401)
    animEntity(animation14, 340, globalFrame), // cellDoorA1 overlay
    animEntity(animation15, 340, globalFrame), // cellDoorA2 overlay
    animEntity(animation16, 340, globalFrame), // cellDoorA3 overlay
    animEntity(animation17, 340, globalFrame), // cellDoorA4 overlay
    animEntity(animation18, 340, globalFrame), // cellDoorA5 overlay

    animEntity(animation25, 340), // wall bottom overlay


    //
    // prisoners front
    animEntity(animation3, 370, globalFrame), // redbull overlay
    animEntity(animation4, 670, globalFrame), // chill pill overlay
    // animEntity(animation, dog.y - dog.height - 15), // Dog
    animEntity(drawDog, dog.y - dog.height - 15, globalFrame),

    animEntity(animation99, 600, globalFrame), // rukus gauge
    animEntity(animation100, 600, globalFrame), // guard gauge

    animEntity(animation97, 600, globalFrame), // guard bar
    animEntity(animation111, 600, globalFrame), //rukus bar
    animEntity(animation112, 600, globalFrame), // background end caps

    animEntity(animation110, 600, globalFrame), // gauge end caps
    animEntity(animation116, player.y, globalFrame),
  ];

  // Sort by Y position ascending (lowest Y first, i.e., "farther back" first)
  return arr
    .filter((e) => e && typeof e.y === "number")
    .sort((a, b) => a.y - b.y);
}

// Export required variables and functions for gameLoop.js
export function redLit() {
  settings.redBullState = "onlyMove";
  settings.playerImageState = "bootsMove";
}

export function redNotLit() {
  settings.redBullState = "noMove";
}

const scoreBox4 = document.getElementById("scoreBox4");

function startCountUpTimer(displayElement) {
  gameState.currentTime = 0; // reset on new start
  gameState.countUpInterval = setInterval(() => {
    gameState.currentTime++;
    displayElement.textContent = formatTime(gameState.currentTime);
    if (scoreBox4) {
      scoreBox4.textContent = formatTime(gameState.currentTime);
    }
  }, 1000);
}

function stopCountUpTimer() {
  clearInterval(gameState.countUpInterval);
  // console.log(`Final Time: ${formatTime(currentTime)}`);
  return gameState.currentTime;
}

// Pause the count-up timer without resetting the current time
function pauseCountUpTimer() {
  if (gameState.countUpInterval) {
    clearInterval(gameState.countUpInterval);
    gameState.countUpInterval = null; // Ensure interval is cleared fully
    // console.log("Count-up timer paused at:", formatTime(currentTime));
  }
}

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function clockLit() {
  settings.clockState = "onlyMove";
}

let animationFrameId;

function startGameLoop() {
  function frame() {
    gameLoop(ctx);
    animationFrameId = requestAnimationFrame(frame);
  }
  animationFrameId = requestAnimationFrame(frame);
}

function stopGameLoop() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}



preloadNeighborImages(() => {
  initNeighborSprites();
});

window.startGame = startGame;

export {
  playerEnters,
  formatTime,
  startCountUpTimer,
  stopCountUpTimer,
  game,
  movement,
  escapedCount,
  carryCount,
  timer,
  scoreH2,
  pause,
  play,
  urScore,
  urScore2,
  urScore3,
  urScore4,
  redBull,
  slowDownClock,
  message,
  message2,
  message3,
  cellSpots,
  dog,
  dogSit,
  clockLit,
  clockNotLit,
  player,
  neighbors,
  cellToCellZ,
  secondSpotMap,
  lastSpot,
  cleanupEscapedNeighbors,
  getZSortedEntities,
  gameOverWin,
  cellDoorZ1,
  cellDoorZ2,
  cellDoorZ3,
  cellDoorZ4,
  cellDoorZ5,
  cellDoorZ6,
  cellDoorZ7,
  cellDoorZ8,
  cellDoorZ9,
  waitSpot,
  dogSpot2,
  secondSpot1,
  secondSpot2,
  secondSpot3,
  secondSpot4,
  guardMovingProgressBar,
  brokenSwitchSpot,
  gameOverLoose,
  pauseCountUpTimer,
  rukusSwitchSpot,
  ESCAPE_X_THRESHOLD,
  refreshPage,
  endScene,
};
