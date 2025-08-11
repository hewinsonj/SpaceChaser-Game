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
        if (cellDoorImages.complete && cellDoorImages.naturalWidth !== 0) {
        ctx.drawImage(cellDoorImages[i], 0, 0, game.width, game.height);
        }
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
scoreUI.style.color = "red";
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
  // Begin a frame-driven enter sequence instead of setTimeout
  // console.log("playe ENNTRS")
  gameState.playerEnterActive = true;
  gameState.playerEnterClock = 0; // seconds accumulator
  player.speed = .7;
  player.setDirection("d");
  gameState.controlsEnabled = false; // re-enable when sequence completes
}

function dogFast() {
  // Avoid stacking multiple timers
  if (gameState.dogFastTimeout) {
    clearTimeout(gameState.dogFastTimeout);
    gameState.dogFastTimeout = null;
  }
  gameState.dogFastTimeout = setTimeout(() => {
    settings.dogSpeed = 1.5;
    gameState.dogBoosted = true;
    gameState.dogFastTimeout = null;
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
  stopGameLoop();
};



// --- Frame-driven intro timeline (replaces setTimeout chain) ---
function updateIntro(dt) {
  if (!gameState.gameStarted || gameState.gameOver) return;
  if (typeof dt !== "number" || dt <= 0) return;

  // Only run if we initialized the intro timeline
  if (!gameState.hasTriggeredEvent) return;

  // accumulate clock first so thresholds use the latest time
  gameState.introClock = (gameState.introClock || 0) + dt;
  gameState.introDogMoving = !!gameState.introDogMoving;
  gameState.introDogMoved  = !!gameState.introDogMoved;

  // Start dog move at t >= 2s
  if (!gameState.introDogMoved && !gameState.introDogMoving && gameState.introClock >= 1.0) {
    settings.dogSpeed = 1;         // base intro speed
    settings.stopped = false;      // allow movement
    gameState.introDogMoving = true;
  }

  // While moving, advance toward dogSpot2 every frame until we actually arrive
  if (gameState.introDogMoving) {
    // run the mover each frame
    dog.updatePosition(dogSpot2);

    // check arrival with a dt‑scaled epsilon similar to dog's internal snap
    const dx = dogSpot2.x - dog.x;
    const dy = dogSpot2.y - (dog.y);
    const dist = Math.hypot(dx, dy);
    const epsilon = Math.max(0.6, (settings.dogSpeed * 10) * dt + 0.05);
    if (dist <= epsilon || settings.stopped === true) {
      // arrived
      gameState.introDogMoving = false;
      gameState.introDogMoved = true;
      settings.stopped = true; // ensure settled
    }
  }

  // t >= 1.1s: trigger explosion and open lastSpot (smooth & fast)
  if (!gameState.explosionStarted && gameState.introClock >= 2) {
    gameState.playExplosion = true;
    gameState.explosionFrameCount = 0;   // start at frame 0; we'll advance smoothly
    gameState.explosionSpeed = 40;       // frames per second initial speed
    gameState.explosionAccel = 220;      // frames per second^2 acceleration
    gameState.triggeredEvent = true;
    lastSpot.alive = true;
    setWallTopState("chopped");
    setCell7State("gone");
    gameState.explosionStarted = true;
  }

  // While explosion is playing, advance frames smoothly with increasing speed
  if (gameState.playExplosion) {
    const dtLocal = (gameState.dt || dt || 0);
    // ramp speed up smoothly, clamp to avoid absurd jumps
    gameState.explosionSpeed = Math.min(
      (gameState.explosionSpeed || 0) + (gameState.explosionAccel || 0) * dtLocal,
      480
    );
    // integrate frames using current speed
    gameState.explosionFrameCount += (gameState.explosionSpeed || 0) * dtLocal;
  }

  // t >= 5.2s: swap cell7 image and restore wall/cell states (extended by +1s)
  if (!gameState.swapDone && gameState.introClock >= 2) {
    cell7Img.src = `./SpaceChaserSprites/cellDoors/cellDoorA7FinalForm.png`;
    setWallTopState("full");
    setCell7State("noMove");
    gameState.swapDone = true;
    dogFast();
  }
}

// --- Player enter per-frame updater ---
function updatePlayerEnter(dt) {
  if (!gameState.playerEnterActive) return;
  if (typeof dt !== "number" || dt <= 0) return;

  gameState.playerEnterClock = (gameState.playerEnterClock || 0) + dt;

  if (gameState.playerEnterClock >= 2) {
    // End the enter sequence exactly once
    // console.log("playerEnters")
    player.speed = .52;
    player.unsetDirection("d");
    gameState.controlsEnabled = true;
    gameState.playerEnterActive = false;
  }
}
function updateEndScene() {
  if (!gameState.endSceneStarted || gameState.gameOver) return;

  // NEW: compute elapsed from anchor, not dt accumulation
  const start = gameState.endSceneStart;
  if (typeof start !== "number" || !isFinite(start)) return;

  const elapsed = (performance.now() - start) / 1000;
  gameState.endSceneClock = elapsed; // keep this updated for UI/debug

  // fire once at 5s
  if (!gameState.sceneEndFired && elapsed >= 5.0) {
    gameState.sceneEndFired = true;
    gameOverWin();
    window.allowOffScreen = false;
    gameState.sceneEnded = true;
  }
}

let animationFrameId;

function startGameLoop() {
  function frame() {
    gameLoop(ctx);
    const dt = gameState.dt || 0;
    updateIntro(dt);
    updatePlayerEnter(dt);
    // updateEndScene(dt);
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


function endScene() {
  if (gameState.endSceneStarted) return;
  gameState.controlsEnabled = false;
  stopCountUpTimer();
  pauseCountUpTimer();
  // console.log("endScene");

  gameState.endSceneStarted = true;
  gameState.sceneEndFired = false;

  // NEW: anchor time
  gameState.endSceneStart = performance.now();
  gameState.endSceneClock = 0; // optional, for display only
}


const startGame = () => {
  gameState.gameStarted = true;
  gameState.introDogMoved = false;
  gameState.triggeredEvent = false;
  gameState.endSceneStarted = false;
  removeContainerTopPadding();
  scoreUI.style.display = "flex";

  // --- Intro timeline init (frame-rate independent) ---
  if (!gameState.hasTriggeredEvent) {
    gameState.hasTriggeredEvent = true;
    gameState.introClock = 0;           // seconds since game start
    gameState.explosionStarted = false; // once at t >= 3.0s
    gameState.swapDone = false;         // once at t >= 4.2s
    gameState.dogBoosted = false;       // once at t >= 5.4s
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
  const dt = gameState.dv || 0; // seconds (match player)
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
  const dt = gameState.dt || 0; // seconds
  if (dt <= 0) return;

  // When progress reaches threshold, reset and trigger switch
  if (settings.rukusProgress >= 431) {
    cellDoorZ9.alive = true;
    setBrokenSwitch2AnimationState("move");
    settings.rukusProgress = 0;
  }

  // Preserve legacy feel: original per-frame was +0.1 progress and -0.03 x each frame
  // Convert to units-per-second with a 60 FPS baseline
  const progressPerSecond = 0.1 * 60; // 6 units/sec
  const xVelPerSecond = -0.03 * 60;   // -1.8 px/sec

  // Only move while bar is to the right of origin (old diffX > 0 check)
  if (rukusMovingProgressBar.x > 0) {
    settings.rukusProgress += progressPerSecond * dt;
    rukusMovingProgressBar.x += xVelPerSecond * dt;
  }
};

dog.updatePosition = function (spotNum) {
  // Convert legacy per-frame speed to units-per-second (UPS) assuming 60fps baseline
  const dt = gameState.dt || 0; // seconds
  const speedUPS = (settings.dogSpeed || 0) * 60; // keep prior feel

  // If the game isn't running or movement globally paused, bail early
  if (!gameState.gameOn || settings.stopped === true || dt <= 0) return;

  const dx = spotNum.x - dog.x;
  const dy = spotNum.y - dog.y;
  const dist = Math.hypot(dx, dy);

  // How far we can move this frame
  const step = speedUPS * dt;

  // Snap when close enough to avoid jitter; epsilon scales with step
  const epsilon = Math.max(0.5, step + 0.05);
  if (dist <= epsilon) {
    dog.x = spotNum.x;
    dog.y = spotNum.y;
    settings.stopped = true;
    return;
  }

  // Normalize direction and move by step (no overshoot)
  const nx = dx / dist;
  const ny = dy / dist;
  const move = Math.min(step, dist);
  dog.x += nx * move;
  dog.y += ny * move;

  // Animation state based on horizontal intent
  if (Math.abs(dx) > Math.abs(dy)) {
    setDogState(dx > 0 ? "rightMove" : "leftMove");
  }
};

neighborOne.updatePosition = function (spotNum) {
  // Frame-rate independent movement using dt; treat neighborSpeed as per-frame@60 baseline
  const dt = gameState.dt || 0; // seconds
  const speedUPS = (settings.neighborSpeed || 0) * 60; // units per second
  if (dt <= 0) return;

  const dx = spotNum.x - neighborOne.x;
  const dy = spotNum.y - neighborOne.y;
  const dist = Math.hypot(dx, dy);

  // How far we can move this frame
  const step = speedUPS * dt;

  // Snap when close to avoid jitter; epsilon scales with step
  const epsilon = Math.max(0.5, step + 0.05);
  if (dist <= epsilon) {
    neighborOne.x = spotNum.x;
    neighborOne.y = spotNum.y;
    setNeighborState(1, "downMove");
    return;
  }

  // Normalize and move without overshoot
  const nx = dx / dist;
  const ny = dy / dist;
  const move = Math.min(step, dist);
  neighborOne.x += nx * move;
  neighborOne.y += ny * move;

  // Animation state preference: vertical intent
  // If moving upward and the assigned cell's door is alive, bias to "upMove"
  const cellSpot = neighborOne.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;
  if (dy < 0 && (!neighborOne.madeItToSecond && assignedCellZ && assignedCellZ.alive)) {
    setNeighborState(1, "upMove");
  } else if (dy < 0) {
    setNeighborState(1, "upMove");
  } else {
    setNeighborState(1, "downMove");
  }
};

neighborTwo.updatePosition = function (spotNum) {
  const dt = gameState.dt || 0; // seconds
  const speedUPS = (settings.neighborSpeed || 0) * 60; // units per second
  if (dt <= 0) return;

  const dx = spotNum.x - neighborTwo.x;
  const dy = spotNum.y - neighborTwo.y;
  const dist = Math.hypot(dx, dy);

  const step = speedUPS * dt;
  const epsilon = Math.max(0.5, step + 0.05);
  if (dist <= epsilon) {
    neighborTwo.x = spotNum.x;
    neighborTwo.y = spotNum.y;
    setNeighborState(2, "downMove");
    return;
  }

  const nx = dx / dist;
  const ny = dy / dist;
  const move = Math.min(step, dist);
  neighborTwo.x += nx * move;
  neighborTwo.y += ny * move;

  const cellSpot = neighborTwo.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;
  if (dy < 0 && (!neighborTwo.madeItToSecond && assignedCellZ && assignedCellZ.alive)) {
    setNeighborState(2, "upMove");
  } else if (dy < 0) {
    setNeighborState(2, "upMove");
  } else {
    setNeighborState(2, "downMove");
  }
};

neighborThree.updatePosition = function (spotNum) {
  const dt = gameState.dt || 0; // seconds
  const speedUPS = (settings.neighborSpeed || 0) * 60; // units per second
  if (dt <= 0) return;

  const dx = spotNum.x - neighborThree.x;
  const dy = spotNum.y - neighborThree.y;
  const dist = Math.hypot(dx, dy);

  const step = speedUPS * dt;
  const epsilon = Math.max(0.5, step + 0.05);
  if (dist <= epsilon) {
    neighborThree.x = spotNum.x;
    neighborThree.y = spotNum.y;
    setNeighborState(3, "downMove");
    return;
  }

  const nx = dx / dist;
  const ny = dy / dist;
  const move = Math.min(step, dist);
  neighborThree.x += nx * move;
  neighborThree.y += ny * move;

  const cellSpot = neighborThree.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;
  if (dy < 0 && (!neighborThree.madeItToSecond && assignedCellZ && assignedCellZ.alive)) {
    setNeighborState(3, "upMove");
  } else if (dy < 0) {
    setNeighborState(3, "upMove");
  } else {
    setNeighborState(3, "downMove");
  }
};

neighborFour.updatePosition = function (spotNum) {
  const dt = gameState.dt || 0; // seconds
  const speedUPS = (settings.neighborSpeed || 0) * 60; // units per second
  if (dt <= 0) return;

  const dx = spotNum.x - neighborFour.x;
  const dy = spotNum.y - neighborFour.y;
  const dist = Math.hypot(dx, dy);

  const step = speedUPS * dt;
  const epsilon = Math.max(0.5, step + 0.05);
  if (dist <= epsilon) {
    neighborFour.x = spotNum.x;
    neighborFour.y = spotNum.y;
    setNeighborState(4, "downMove");
    return;
  }

  const nx = dx / dist;
  const ny = dy / dist;
  const move = Math.min(step, dist);
  neighborFour.x += nx * move;
  neighborFour.y += ny * move;

  const cellSpot = neighborFour.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;
  if (dy < 0 && (!neighborFour.madeItToSecond && assignedCellZ && assignedCellZ.alive)) {
    setNeighborState(4, "upMove");
  } else if (dy < 0) {
    setNeighborState(4, "upMove");
  } else {
    setNeighborState(4, "downMove");
  }
};

neighborFive.updatePosition = function (spotNum) {
  const dt = gameState.dt || 0; // seconds
  const speedUPS = (settings.neighborSpeed || 0) * 60; // units per second
  if (dt <= 0) return;

  const dx = spotNum.x - neighborFive.x;
  const dy = spotNum.y - neighborFive.y;
  const dist = Math.hypot(dx, dy);

  const step = speedUPS * dt;
  const epsilon = Math.max(0.5, step + 0.05);
  if (dist <= epsilon) {
    neighborFive.x = spotNum.x;
    neighborFive.y = spotNum.y;
    setNeighborState(5, "downMove");
    return;
  }

  const nx = dx / dist;
  const ny = dy / dist;
  const move = Math.min(step, dist);
  neighborFive.x += nx * move;
  neighborFive.y += ny * move;

  const cellSpot = neighborFive.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;
  if (dy < 0 && (!neighborFive.madeItToSecond && assignedCellZ && assignedCellZ.alive)) {
    setNeighborState(5, "upMove");
  } else if (dy < 0) {
    setNeighborState(5, "upMove");
  } else {
    setNeighborState(5, "downMove");
  }
};

neighborSix.updatePosition = function (spotNum) {
  const dt = gameState.dt || 0; // seconds
  const speedUPS = (settings.neighborSpeed || 0) * 60; // units per second
  if (dt <= 0) return;

  const dx = spotNum.x - neighborSix.x;
  const dy = spotNum.y - neighborSix.y;
  const dist = Math.hypot(dx, dy);

  const step = speedUPS * dt;
  const epsilon = Math.max(0.5, step + 0.05);
  if (dist <= epsilon) {
    neighborSix.x = spotNum.x;
    neighborSix.y = spotNum.y;
    setNeighborState(6, "downMove");
    return;
  }

  const nx = dx / dist;
  const ny = dy / dist;
  const move = Math.min(step, dist);
  neighborSix.x += nx * move;
  neighborSix.y += ny * move;

  const cellSpot = neighborSix.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;
  if (dy < 0 && (!neighborSix.madeItToSecond && assignedCellZ && assignedCellZ.alive)) {
    setNeighborState(6, "upMove");
  } else if (dy < 0) {
    setNeighborState(6, "upMove");
  } else {
    setNeighborState(6, "downMove");
  }
};

neighborSeven.updatePosition = function (spotNum) {
  const dt = gameState.dt || 0; // seconds
  const speedUPS = (settings.neighborSpeed || 0) * 60; // units per second
  if (dt <= 0) return;

  const dx = spotNum.x - neighborSeven.x;
  const dy = spotNum.y - neighborSeven.y;
  const dist = Math.hypot(dx, dy);

  const step = speedUPS * dt;
  const epsilon = Math.max(0.5, step + 0.05);
  if (dist <= epsilon) {
    neighborSeven.x = spotNum.x;
    neighborSeven.y = spotNum.y;
    setNeighborState(7, "downMove");
    return;
  }

  const nx = dx / dist;
  const ny = dy / dist;
  const move = Math.min(step, dist);
  neighborSeven.x += nx * move;
  neighborSeven.y += ny * move;

  const cellSpot = neighborSeven.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;
  if (dy < 0 && (!neighborSeven.madeItToSecond && assignedCellZ && assignedCellZ.alive)) {
    setNeighborState(7, "upMove");
  } else if (dy < 0) {
    setNeighborState(7, "upMove");
  } else {
    setNeighborState(7, "downMove");
  }
};

neighborEight.updatePosition = function (spotNum) {
  const dt = gameState.dt || 0; // seconds
  const speedUPS = (settings.neighborSpeed || 0) * 60; // units per second
  if (dt <= 0) return;

  const dx = spotNum.x - neighborEight.x;
  const dy = spotNum.y - neighborEight.y;
  const dist = Math.hypot(dx, dy);

  const step = speedUPS * dt;
  const epsilon = Math.max(0.5, step + 0.05);
  if (dist <= epsilon) {
    neighborEight.x = spotNum.x;
    neighborEight.y = spotNum.y;
    setNeighborState(8, "downMove");
    return;
  }

  const nx = dx / dist;
  const ny = dy / dist;
  const move = Math.min(step, dist);
  neighborEight.x += nx * move;
  neighborEight.y += ny * move;

  const cellSpot = neighborEight.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;
  if (dy < 0 && (!neighborEight.madeItToSecond && assignedCellZ && assignedCellZ.alive)) {
    setNeighborState(8, "upMove");
  } else if (dy < 0) {
    setNeighborState(8, "upMove");
  } else {
    setNeighborState(8, "downMove");
  }
};

neighborNine.updatePosition = function (spotNum) {
  const diffX = spotNum.x - neighborNine.x;
  const diffY = spotNum.y - neighborNine.y;
  const cellSpot = neighborNine.assignedCell;
  const assignedCellZ = cellSpot ? cellToCellZ.get(cellSpot) : null;
  setNeighborState(9, "downMove");

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

// Determine if a touched element is one of our on-screen controls
function isControlElement(el) {
  if (!el) return false;

  // Direct references to control elements (portrait & landscape)
  const controls = [
    upButton, downButton, leftButton, rightButton,
    topRightButton, bottomRightButton, topLeftButton, bottomLeftButton,
    topRightArrow, bottomRightArrow, topLeftArrow, bottomLeftArrow,
    upButtonL, downButtonL, leftButtonL, rightButtonL,
    topRightButtonL, bottomRightButtonL, topLeftButtonL, bottomLeftButtonL,
    topRightArrowL, bottomRightArrowL, topLeftArrowL, bottomLeftArrowL,
    movementContainer,
  ].filter(Boolean);

  if (controls.includes(el)) return true;

  // If the touched element is inside the movement container, treat as control
  if (movementContainer && (el === movementContainer || (movementContainer.contains && movementContainer.contains(el)))) {
    return true;
  }

  return false;
}

// Shared touch handler: map a single touch point to movement directions
function handleTouchPoint(x, y) {
  if (!gameState.controlsEnabled) return;
const el = document.elementFromPoint(x, y);
if (!el) return;
if (!isControlElement(el)) return; // <-- do nothing if finger isn't on a control

// Now we know it's a control: clear & set
player.unsetDirection("w");
player.unsetDirection("a");
player.unsetDirection("s");
player.unsetDirection("d");

const is = (t) => t && (el === t || (t.contains && t.contains(el)));

  // Primary buttons (portrait)
  if (is(upButton))            player.setDirection("w");
  if (is(downButton))          player.setDirection("s");
  if (is(leftButton))          player.setDirection("a");
  if (is(rightButton))         player.setDirection("d");

  // Diagonals (portrait)
  if (is(topLeftButton) || is(topLeftArrow)) {
    player.setDirection("a"); player.setDirection("w");
  }
  if (is(bottomLeftButton) || is(bottomLeftArrow)) {
    player.setDirection("a"); player.setDirection("s");
  }
  if (is(topRightButton) || is(topRightArrow)) {
    player.setDirection("d"); player.setDirection("w");
  }
  if (is(bottomRightButton) || is(bottomRightArrow)) {
    player.setDirection("d"); player.setDirection("s");
  }

  // Landscape variants
  if (is(upButtonL))            player.setDirection("w");
  if (is(downButtonL))          player.setDirection("s");
  if (is(leftButtonL))          player.setDirection("a");
  if (is(rightButtonL))         player.setDirection("d");

  if (is(topLeftButtonL) || is(topLeftArrowL)) {
    player.setDirection("a"); player.setDirection("w");
  }
  if (is(bottomLeftButtonL) || is(bottomLeftArrowL)) {
    player.setDirection("a"); player.setDirection("s");
  }
  if (is(topRightButtonL) || is(topRightArrowL)) {
    player.setDirection("d"); player.setDirection("w");
  }
  if (is(bottomRightButtonL) || is(bottomRightArrowL)) {
    player.setDirection("d"); player.setDirection("s");
  }
}

// Tap/press should move immediately
document.addEventListener("touchstart", (e) => {
  if (e.touches && e.touches.length > 0) {
    const t = e.touches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY);
    if (isControlElement(el)) {
      e.preventDefault(); // only block default when interacting with controls
      handleTouchPoint(t.clientX, t.clientY);
    }
  }
}, { passive: false });

// Swipe/drag should update direction continuously
document.addEventListener("touchmove", (e) => {
  if (e.touches && e.touches.length > 0) {
    const t = e.touches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY);
    if (isControlElement(el)) {
      e.preventDefault();
      handleTouchPoint(t.clientX, t.clientY);
    }
  }
}, { passive: false });

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
  const t = e.changedTouches && e.changedTouches[0];
  if (t) {
    const el = document.elementFromPoint(t.clientX, t.clientY);
    if (isControlElement(el)) {
      e.preventDefault();
      if (!gameState.controlsEnabled) return;
      player.unsetDirection("w");
      player.unsetDirection("a");
      player.unsetDirection("s");
      player.unsetDirection("d");
    }
  }
}, { passive: false });

function clockNotLit() {
  settings.clockState = "noMove";
}

(function logCanvasScale() {
  const canvasEl = (ctx && ctx.canvas) || (game && game.canvas);
  if (!canvasEl || !canvasEl.getBoundingClientRect) return;

  const rect = canvasEl.getBoundingClientRect();
  // console.log('dpr=', window.devicePixelRatio,
  //             'canvasWH=', canvasEl.width, canvasEl.height,
  //             'cssWH=', rect.width, rect.height,
  //             'visualScale=', canvasEl.width / rect.width);
})();

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
    animEntity((ctx) => drawNeighbor(ctx, 9, globalFrame), () => neighbors[8]?.y, globalFrame),

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
    animEntity(drawDog, dog.y - dog.height + 15, globalFrame),

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
  // console.log("settings.clockState", settings.clockState)
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
  updateEndScene,
};
