import { Dad } from "../entities/player.js";
import { Dog } from "../entities/dog.js";
import { CellSpot } from "../entities/cellSpot.js";
import { Neighbor } from "../entities/neighbor.js";
import { PowerUps } from "../entities/powerUps.js";
import { CellDoorZ } from "../entities/cellDoorZ.js";
import { ProgressBar } from "../entities/progressBar.js";


const game = document.getElementById("canvas");

// Cell door visibility array [1..10], index 0 unused for 1-based indexing
const cellDoorVisible = Array(11).fill(false);
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const rukusMovingProgressBar = new ProgressBar(131, 0, "yellow", 800, 600);
const player = new Dad(-80, 230, "lightsteelblue", 40, 70);
const dog = new Dog(600, 40, "green", 25, 35, true);
const dogSpot2 = new CellDoorZ(596, 126, "green", 10, 10);
const neighborOne = new Neighbor(200, 20, "blue", 60, 65);
const neighborTwo = new Neighbor(300, 20, "green", 50, 75);
const neighborThree = new Neighbor(450, 20, "yellow", 45, 60);
const neighborFour = new Neighbor(700, 20, "cyan", 65, 85);
const neighborFive = new Neighbor(100, 560, "red", 45, 45);
const neighborSix = new Neighbor(350, 560, "brown", 60, 65);
const neighborSeven = new Neighbor(500, 570, "grey", 55, 70);
const neighborEight = new Neighbor(700, 580, "black", 50, 50);
const neighborNine = new Neighbor(930, 200, "purple", 270, 70);
const n1Spot = new CellSpot(160, 30, "#bada55", 32, 48, false);
const n2Spot = new CellSpot(300, 30, "#bada55", 32, 48);
const n3Spot = new CellSpot(450, 40, "#bada55", 32, 48);
const n4Spot = new CellSpot(700, 40, "#bada55", 32, 48);
const n5Spot = new CellSpot(30, 450, "#bada55", 32, 48);
const n6Spot = new CellSpot(250, 450, "#bada55", 32, 48);
const n7Spot = new CellSpot(450, 500, "#bada55", 32, 48);
const n8Spot = new CellSpot(700, 470, "#bada55", 32, 48);
const n9Spot = new CellSpot(795, 200, "#bada55", 10, 10);
const waitSpot = new CellSpot(990, 200, "#bada55", 10, 10);
const cellDoorZ1 = new CellDoorZ(140, 175, "green", 56, 10);
const cellDoorZ2 = new CellDoorZ(288, 175, "brown", 56, 10);
const cellDoorZ3 = new CellDoorZ(440, 175, "brown", 56, 10);
const cellDoorZ4 = new CellDoorZ(710, 175, "brown", 56, 10);
const cellDoorZ5 = new CellDoorZ(140, 401, "brown", 56, 10);
const cellDoorZ6 = new CellDoorZ(288, 401, "brown", 56, 10);
const cellDoorZ7 = new CellDoorZ(440, 401, "brown", 56, 10);
const cellDoorZ8 = new CellDoorZ(708, 401, "brown", 56, 10);
const cellDoorZ9 = new CellDoorZ(770, 201, "lightRed", 56, 100);
const brokenSwitchSpot = new CellDoorZ(5, 160, "white", 50, 50, "brokenSwitch");
const rukusSwitchSpot = new CellDoorZ(
  750,
  260,
  "orange",
  50,
  50,
  "brokenSwitch"
);
const secondSpot1 = new CellDoorZ(140, 255, "green", 10, 10);
const secondSpot2 = new CellDoorZ(288, 255, "green", 10, 10);
const secondSpot3 = new CellDoorZ(440, 255, "green", 10, 10);
const secondSpot4 = new CellDoorZ(710, 255, "green", 10, 10);
const lastSpot = new CellDoorZ(-190, 300, "pink", 10, 10);
const dogSit = new Dog(750, 260, "white", 10, 10);
const redBull = new PowerUps(60, 280, "blue", 40, 40);
const slowDownClock = new PowerUps(600, 450, "darkBlue", 40, 40);
const guardMovingProgressBar = new ProgressBar(-131, 0, "yellow", 800, 600);

// Define an array of all neighbors for easier iteration
const neighbors = [
  neighborOne,
  neighborTwo,
  neighborThree,
  neighborFour,
  neighborFive,
  neighborSix,
  neighborSeven,
  neighborEight,
  neighborNine,
];

const cellSpots = [
  n1Spot,
  n2Spot,
  n3Spot,
  n4Spot,
  n5Spot,
  n6Spot,
  n7Spot,
  n8Spot,
  n9Spot,
];

let lastVisibleDoors = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

const gameState = {
  score: 2,
  redLife: 0,
  gameOn: false,
  gameOver: false,
  escapedCountNum: 0,
  endSceneStarted: false,
  carryState: { carrying: false },
  playerCarrying: [],
  sceneEnded: false,
  triggeredEvent: false,
  currentTime: 0,
  countUpInterval: null,
  hasTriggeredEvent: false,
  gameStarted: false,
  controlsEnabled: false,
  cell7State: "noMove",
  cell6State: "noMove",
  cell5State: "noMove",
  cell4State: "noMove",
  cell3State: "noMove",
  cell2State: "noMove",
  wallBottomState: "noMove",
  wallTopState: "full",
  backgroundEndCapState: "noMove",
  cell1State: "noMove",
  nbr8State: "noMove",
  nbr7State: "noMove",
  nbr6State: "noMove",
  nbr5State: "noMove",
  nbr4State: "noMove",
  nbr3State: "noMove",
  nbr2State: "noMove",
  nbr1State: "noMove",
  explosionState: "move",
  nbr9State: "Move",
  dogState: "leftMove",
  guardBarState: "move",
  rukusMovingProgressBarState: "move",
  guardProgressBarEndCapState: "noMove",
  rukusBarState: "noMove",
  brokenSwitch2AnimationState: "noMove",
  brokenSwitchAnimationState: "noMove",
  exitSignState: "noMove",
  rukusSwitchAnimationState: "noMove",
};



const isMobile = window.innerWidth <= 500;
const isMobileLandscape = window.innerWidth > 500 && window.innerWidth <= 1300;


const neighborSpots = [
  n1Spot,
  n2Spot,
  n3Spot,
  n4Spot,
  n5Spot,
  n6Spot,
  n7Spot,
  n8Spot,
  n9Spot,
];

const cellToCellZ = new Map([
  [n1Spot, cellDoorZ1],
  [n2Spot, cellDoorZ2],
  [n3Spot, cellDoorZ3],
  [n4Spot, cellDoorZ4],
  [n5Spot, cellDoorZ5],
  [n6Spot, cellDoorZ6],
  [n7Spot, cellDoorZ7],
  [n8Spot, cellDoorZ8],
  [n9Spot, cellDoorZ9],
]);

const secondSpotMap = new Map([
  [n1Spot, secondSpot1],
  [n2Spot, secondSpot2],
  [n3Spot, secondSpot3],
  [n4Spot, secondSpot4],
  [n5Spot, secondSpot1],
  [n6Spot, secondSpot2],
  [n7Spot, secondSpot3],
  [n8Spot, secondSpot4],
  [n9Spot, secondSpot4],
]);

// Reset all neighbors' state in a loop
const homeCellMap = new Map([
  [neighborOne, n1Spot],
  [neighborTwo, n2Spot],
  [neighborThree, n3Spot],
  [neighborFour, n4Spot],
  [neighborFive, n5Spot],
  [neighborSix, n6Spot],
  [neighborSeven, n7Spot],
  [neighborEight, n8Spot],
  [neighborNine, n9Spot],
]);


player.speed = 5;
const cWidth = (game.width = 800);
const cHeight = (game.height = 600);

const escapedNeighbors = new Set();
const ESCAPE_X_THRESHOLD = -40; // or whatever your "last spot" x is

const boxDiv = document.getElementById("boxDiv");
const musicButton = document.getElementById("musicButton");
const rightArrowL = document.getElementById("rightArrowL");
const leftArrowL = document.getElementById("leftArrowL");
const movement = document.getElementById("movement");
const timer = document.getElementById("timer");
const escapedCount = document.getElementById("escapedCount");
const carryCount = document.getElementById("carryCount");
const message = document.getElementById("status");
const message3 = document.getElementById("status3");
const message2 = document.getElementById("status2");
const gOScreen = document.getElementById("game-over-screen");
const scoreH2 = document.getElementById("score-h2");
const urScore = document.getElementById("urScore");
const urScore3 = document.getElementById("urScore3");
const urScoreCon3 = document.getElementById("urScoreCon3");
const urScoreCon2 = document.getElementById("urScoreCon2");
const urScore4 = document.getElementById("urScore4");
const urScore2 = document.getElementById("urScore2");
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const topRightButton = document.getElementById("topRightButton");
const bottomRightButton = document.getElementById("bottomRightButton");
const topLeftButton = document.getElementById("topLeftButton");
const bottomLeftButton = document.getElementById("bottomLeftButton");
const topRightArrow = document.getElementById("topRightArrow");
const bottomRightArrow = document.getElementById("bottomRightArrow");
const topLeftArrow = document.getElementById("topLeftArrow");
const bottomLeftArrow = document.getElementById("bottomLeftArrow");
const upButtonL = document.getElementById("upButtonL");
const downButtonL = document.getElementById("downButtonL");
const leftButtonL = document.getElementById("leftButtonL");
const rightButtonL = document.getElementById("rightButtonL");
const topRightButtonL = document.getElementById("topRightButtonL");
const bottomRightButtonL = document.getElementById("bottomRightButtonL");
const topLeftButtonL = document.getElementById("topLeftButtonL");
const bottomLeftButtonL = document.getElementById("bottomLeftButtonL");
const topRightArrowL = document.getElementById("topRightArrowL");
const bottomRightArrowL = document.getElementById("bottomRightArrowL");
const topLeftArrowL = document.getElementById("topLeftArrowL");
const bottomLeftArrowL = document.getElementById("bottomLeftArrowL");
const music = document.getElementById("music");
const butts = document.getElementsByClassName("butts");
const buttsLong = document.getElementsByClassName("buttsLong");
const scoreBox1 = document.getElementById("scoreBox1");
const scoreBox2 = document.getElementById("scoreBox2");
const scoreBox3 = document.getElementById("scoreBox3");
const scoreBox4 = document.getElementById("scoreBox4");
const movementContainer = document.getElementById("mobile-controls");


// Create score boxes
const scores = ["00:00", "00:00", "00:00", "00:00"];


// Preload cell door images (1-10) into cellDoorImages[] array
const cellDoorImages = [];





export {
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
  scoreBox1,
  scoreBox2,
  scoreBox3,
  scoreBox4,
  movementContainer,
  scores,
  cellDoorImages,
  lastVisibleDoors,
};