import Player from "./Player.js";
import Ground from "./Ground.js";
import CactiController from "./CactiController.js";
import Score from "./Score.js";

const canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");

const GAME_SPEED_START = 0.5; // 1.0
const GAME_SPEED_INCREMENT = 0.00003;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 88 / 1.5; //58
const PLAYER_HEIGHT = 94 / 1.5; //62
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_AND_CACTUS_SPEED = 0.5;

const CACTI_CONFIG = [
  { width: 68 / 1.5, height: 70 / 1.5, image: "assets/obs2.png" },
  { width: 98 / 1.5, height: 100 / 1.5, image: "assets/obs2.png" },
  { width: 68 / 1.5, height: 70 / 1.5, image: "assets/obs1.png" },
];

//Game Objects
let player = null;
let ground = null;
let cactiController = null;
let score = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

function createSprites() {
  const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
  const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

  const groundWidthInGame = GROUND_WIDTH * scaleRatio;
  const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

  player = new Player(
    ctx,
    playerWidthInGame,
    playerHeightInGame,
    minJumpHeightInGame,
    maxJumpHeightInGame,
    scaleRatio
  );

  ground = new Ground(
    ctx,
    groundWidthInGame,
    groundHeightInGame,
    GROUND_AND_CACTUS_SPEED,
    scaleRatio
  );

  const cactiImages = CACTI_CONFIG.map((cactus) => {
    const image = new Image();
    image.src = cactus.image;
    return {
      image: image,
      width: cactus.width * scaleRatio,
      height: cactus.height * scaleRatio,
    };
  });

  cactiController = new CactiController(
    ctx,
    cactiImages,
    scaleRatio,
    GROUND_AND_CACTUS_SPEED
  );

  score = new Score(ctx, scaleRatio);
}

function setScreen() {
  scaleRatio = getScaleRatio();
  canvas.width = GAME_WIDTH * scaleRatio;
  canvas.height = GAME_HEIGHT * scaleRatio;
  createSprites();
}

setScreen();
//Use setTimeout on Safari mobile rotation otherwise works fine on desktop
window.addEventListener("resize", () => setTimeout(setScreen, 500));

if (screen.orientation) {
  screen.orientation.addEventListener("change", setScreen);
}

function getScaleRatio() {
  const screenHeight = Math.min(
    window.innerHeight,
    document.documentElement.clientHeight
  );

  const screenWidth = Math.min(
    window.innerWidth,
    document.documentElement.clientWidth
  );

  //window is wider than the game width
  if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
    return screenWidth / GAME_WIDTH;
  } else {
    return screenHeight / GAME_HEIGHT;
  }
}

function showGameOver() {
  const fontSize = 28 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "black";
  const x = canvas.width / 4.5;
  const y = canvas.height / 2;
  ctx.fillText("Nước mắt tuôn rơi trò chơi kết thúc..", x, y);
}

function setupGameReset() {
  if (!hasAddedEventListenersForRestart) {
    hasAddedEventListenersForRestart = true;

    setTimeout(() => {
      window.addEventListener("keyup", reset, { once: true });
      window.addEventListener("touchstart", reset, { once: true });
    }, 1000);
  }
}

function reset() {
  hasAddedEventListenersForRestart = false;
  gameOver = false;
  waitingToStart = false;
  ground.reset();
  cactiController.reset();
  score.reset();
  gameSpeed = GAME_SPEED_START;
  // document.getElementById("demo").innerHTML = "";
}

function showStartGameText() {
  const fontSize = 13 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "black";
  const x = canvas.width / 14;
  const y = canvas.height / 2;
  ctx.fillText("Hướng dẫn chơi: Trên máy tính nhấn nút W còn trên màn hình cảm ứng thì nhấn vào màn hình game", x, y);
}

function updateGameSpeed(frameTimeDelta) {
  gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}

function clearScreen() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(currentTime) {
  if (previousTime === null) {
    previousTime = currentTime;
    requestAnimationFrame(gameLoop);
    return;
  }
  const frameTimeDelta = currentTime - previousTime;
  previousTime = currentTime;

  clearScreen();

  if (!gameOver && !waitingToStart) {
    //Update game objects
    ground.update(gameSpeed, frameTimeDelta);
    cactiController.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);
    score.update(frameTimeDelta);
    updateGameSpeed(frameTimeDelta);
  }

  if (!gameOver && cactiController.collideWith(player)) {
    gameOver = true;
    setupGameReset();
    score.setHighScore();
  }
//Draw game objects
ground.draw();
cactiController.draw();
player.draw();
score.draw();
startProgress();

if (gameOver) {
  showGameOver();
  result(score);
  stopProgress();

}

if (waitingToStart) {
  showStartGameText();
}
if (score.score < 1) {
  resetProgress();
}

  // SCORE CONDITION
  function result(score) {
    var modal1 = document.getElementById("modal-1");
    var modal2 = document.getElementById("modal-2");
    var modal3 = document.getElementById("modal-3");
    var modal4 = document.getElementById("modal-4");
    var modal5 = document.getElementById("modal-5");
    if (score.score < 800) { // No prize
      // modal1.style.display = "block";
    } else if (score.score >= 800 && score.score < 1200) { // 1st prize
      modal1.style.display = "block";
    } else if (score.score >= 1200 && score.score < 1500) { // 2nd prize
      modal2.style.display = "block";
    } else if (score.score >= 1500 && score.score < 1800) { // 3rd prize
      modal3.style.display = "block";
    } else if (score.score >= 1800 && score.score < 2400) { // 4th prize
      modal4.style.display = "block";
    } else { // 5th prize
      modal5.style.display = "block";
    }
  
  }

var progressInterval;
var width = 1;
var continueWidth = 0; // Store the progress width when the progress is stopped

function startProgress() {

  var elem = document.getElementById("myBar");
  progressInterval = setInterval(frame, 1000);

  function frame() {
    if ((score.score*100)/3000 >= 100) {
      clearInterval(progressInterval);
      resetProgress();
      
    } else {
      width =+ (score.score*100)/3000;
      elem.style.width = (score.score*100)/3000 + "%";
      elem.style.opacity=1
    }
  }
}

function stopProgress() {
  clearInterval(progressInterval);
  continueWidth = width; // Store the current progress width
  
}

function resetProgress() {
  width = 1;
  continueWidth = 0;
  

  clearInterval(progressInterval);
  document.getElementById("myBar").style.width = (score.score*100)/3000 + "%";
  document.getElementById("myBar").style.opacity=1
  
}

function continueProgress() {
  width = continueWidth + 1; // Set the progress width to continue from the stored value
  continueWidth = 0;
  document.getElementById("myBar").style.width = (score.score*100)/3000 + "%";
  document.getElementById("myBar").style.opacity=1
  

  progressInterval = setInterval(frame, 1000);

  function frame() {
    if (width >= 100) {
      clearInterval(progressInterval);
      resetProgress();
      
    } else {
      width++;
      elem.style.width = (score.score*100)/3000 + "%";
      elem.style.opacity=1
    }
  }
}
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener("keyup", reset, { once: true });
window.addEventListener("touchstart", reset, { once: true });
