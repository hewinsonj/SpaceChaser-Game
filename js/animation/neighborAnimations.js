// Preload all neighbor images and invoke callback when done
export function preloadNeighborImages(callback) {
  const imageEntries = Object.entries(neighborConfigs);
  let loaded = 0;
  const total = imageEntries.length;

  imageEntries.forEach(([numStr, config]) => {
    const num = Number(numStr);
    const img = new Image();
    img.onload = () => {
      loaded++;
      if (loaded === total) callback();
    };
    img.src = `SpaceChaserSprites/${config.imgSrc}`;
    neighborImages[num] = img;
  });
}

function initNeighborSprites() {
  Object.entries(neighborConfigs).forEach(([numStr, config]) => {
    const num = Number(numStr);
    const spriteMap = {};
    Object.entries(config.states).forEach(([state, frameCount], i) => {
      spriteMap[state] = {
        loc: Array.from({ length: frameCount }, (_, frameIdx) => ({
          x: frameIdx * config.width,
          y: i * config.height,
        })),
      };
    });
    neighborSprites[num] = spriteMap;
  });
}

export { initNeighborSprites };
import { neighbors, gameState } from "../gameState/gameState.js";

function setNeighborState(neighborNum, state) {
  const validStates = Object.keys(neighborConfigs[neighborNum]?.states || {});
  if (validStates.includes(state)) {
    gameState[`nbr${neighborNum}State`] = state;
  } else {
    gameState[`nbr${neighborNum}State`] = "downMove"; // fallback
  }
}

function getNeighborState(neighborNum) {
  return gameState[`nbr${neighborNum}State`] || "downMove";
}

function getValidNeighborStates(neighborNum) {
  return Object.keys(neighborConfigs[neighborNum]?.states || {});
}

const neighborConfigs = {
  1: {
    key: "nbr1",
    imgSrc: "alienPrisoners/alienPrisoner113.png",
    width: 75,
    height: 75,
    drawOffset: [-5, -5, 80, 80],
    states: { downMove: 4, upMove: 4, noMove: 1 },
  },
  2: {
    key: "nbr2",
    imgSrc: "alienPrisoners/alienPrisoner231.png",
    width: 105,
    height: 105,
    drawOffset: [-15, -5, 80, 80],
    states: { downMove: 4, upMove: 4, noMove: 1 },
  },
  3: {
    key: "nbr3",
    imgSrc: "alienPrisoners/alienPrisoner121.png",
    width: 260,
    height: 260,
    drawOffset: [-23, -15, 89, 89],
    states: { downMove: 8, upMove: 8, noMove: 1 },
  },
  4: {
    key: "nbr4",
    imgSrc: "alienPrisoners/alienPrisoner104.png",
    width: 190,
    height: 190,
    drawOffset: [-15, -10, 100, 100],
    states: { downMove: 4, upMove: 4, noMove: 1 },
  },
  5: {
    key: "nbr5",
    imgSrc: "alienPrisoners/alienPrisoner87.png",
    width: 100,
    height: 100,
    drawOffset: [-20, -20, 85, 85],
    states: { downMove: 4, upMove: 4, noMove: 1 },
  },
  6: {
    key: "nbr6",
    imgSrc: "alienPrisoners/alienPrisoner808.png",
    width: 90,
    height: 90,
    drawOffset: [-5, -5, 75, 75],
    states: { downMove: 4, upMove: 4, noMove: 1 },
  },
  7: {
    key: "nbr7",
    imgSrc: "alienPrisoners/alienPrisoner2123.png",
    width: 110,
    height: 110,
    drawOffset: [-15, -10, 85, 85],
    states: { downMove: 5, upMove: 5, noMove: 1 },
  },
  8: {
    key: "nbr8",
    imgSrc: "alienPrisoners/alienPrisoner987.png",
    width: 170,
    height: 170,
    drawOffset: [-35, -35, 123, 123],
    states: { downMove: 4, upMove: 4, noMove: 1 },
  },
  9: {
    key: "nbr9",
    imgSrc: "alienPrisoners/bigFootGuy3.png",
    width: 550,
    height: 550,
    drawOffset: [-150, -450, 550, 550],
    states: { downMove: 4, noMove: 1 },
  },
};

const neighborSprites = {};
const neighborImages = {};


function numberToWord(num) {
  const words = [
    "Zero", "One", "Two", "Three", "Four",
    "Five", "Six", "Seven", "Eight", "Nine"
  ];
  return words[num];
}

export function drawNeighbor(ctx, neighborNum, globalFrame) {


  // Ensure neighborNum is a number for correct lookup
  const num = Number(neighborNum);
  const config = neighborConfigs[num];
  if (!config) return;

  const requestedState = gameState[`nbr${num}State`];
  const availableStates = neighborSprites[num] || {};
  const stateKey = availableStates[requestedState] ? requestedState : "downMove";
  const sprite = availableStates[stateKey];
  const img = neighborImages[num];
  const [dx, dy, dw, dh] = config.drawOffset;

  if (!sprite || !img) return;

  if (!(img.complete && img.naturalWidth !== 0)) {
    // console.log(`Neighbor ${num} image not ready at frame ${globalFrame}`);
    return;
  }

  const position = Math.floor(globalFrame / 70) % sprite.loc.length;
  const frame = sprite.loc[position] || { x: 0, y: 0 };
  const { x: frameX, y: frameY } = frame;

  const neighborObj = neighbors[num - 1];
  if (!neighborObj) return;
// console.log(`Drawing neighbor ${num} with state "${stateKey}"`);
  if (img.complete && img.naturalWidth !== 0) {
    ctx.drawImage(
      img,
      frameX,
      frameY,
      config.width,
      config.height,
      neighborObj.x + dx,
      neighborObj.y + dy,
      dw,
      dh
    );
  }
}

export {
  setNeighborState,
  getNeighborState,
  getValidNeighborStates
};
