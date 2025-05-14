"use strict";

//-----------------------------------------------------------------------------------------
//----------- Import modules, js files  ---------------------------------------------------
//-----------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.js";
import lib2D from "../../common/libs/lib2d_v2.js";
import { TGameBoard, GameBoardSize, TBoardCell, EBoardCellInfoType, EDirection } from "./gameBoard.js";
import { TSnake } from "./snake.js"; 
import { TBait } from "./bait.js";
import { initMenus, drawMenus } from "./menu.js";

//-----------------------------------------------------------------------------------------
//----------- variables and object --------------------------------------------------------
//-----------------------------------------------------------------------------------------
export const cvs = document.getElementById("cvs"); 
export const spcvs = new libSprite.TSpriteCanvas(cvs); 
let gameSpeed = 4; 
const INITIAL_GAME_SPEED = 4; 
const MAX_GAME_SPEED = 15; 
const GAME_SPEED_INCREMENT = 0.5; 

let hndUpdateGame = null; 
let hndRequestAnimationFrame = null; 

export const EGameStatus = { Idle: 0, Playing: 1, Pause: 2, GameOver: 3 };

// prettier-ignore
export const SheetData = {
  Head:     { x:   0, y:   0, width:  38, height:  38, count:  4 }, 
  Body:     { x:   0, y:  38, width:  38, height:  38, count:  6 }, 
  Tail:     { x:   0, y:  76, width:  38, height:  38, count:  4 }, 
  Bait:     { x:   0, y: 114, width:  38, height:  38, count:  1 },
  Play:     { x:   0, y: 155, width: 202, height: 202, count:  4 }, 
  GameOver: { x:   0, y: 647, width: 856, height: 580, count:  1 }, 
  Home:     { x:  65, y: 995, width: 169, height: 167, count:  4 }, 
  Retry:    { x: 614, y: 995, width: 169, height: 167, count:  4 }, 
  Resume:   { x:   0, y: 357, width: 202, height: 202, count:  4 }, 
  Number:   { x:   0, y: 560, width:  81, height:  86, count: 10 }, 
};

export const GameProps = {
  gameBoard: null, 
  gameStatus: EGameStatus.Idle, 
  snake: null, 
  bait: null, 
  score: 0, 
  baitSpawnTime: 0, 
  scoreDisplayPlaying: null, 
};

//------------------------------------------------------------------------------------------
//----------- Game Loop Control ------------------------------------------------------------
//------------------------------------------------------------------------------------------
export function startGameLoop() {
    if (hndUpdateGame === null) {
        hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed);
    }
    if (hndRequestAnimationFrame === null) {
        hndRequestAnimationFrame = requestAnimationFrame(drawGame); 
    }
}

export function stopGameLoop() {
    if (hndUpdateGame !== null) {
        clearInterval(hndUpdateGame);
        hndUpdateGame = null;
    }
    if (hndRequestAnimationFrame !== null) {
        cancelAnimationFrame(hndRequestAnimationFrame);
        hndRequestAnimationFrame = null;
    }
}
export function resetGameSpeed() {
    gameSpeed = INITIAL_GAME_SPEED; 
}

//------------------------------------------------------------------------------------------
//----------- Exported functions -----------------------------------------------------------
//------------------------------------------------------------------------------------------

export function newGame() {
  stopGameLoop(); 
  resetGameSpeed(); 

  GameProps.gameBoard = new TGameBoard(); 
  GameProps.snake = new TSnake(spcvs, new TBoardCell(5, 5)); 
  
  GameProps.bait = new TBait(spcvs); 
  GameProps.baitSpawnTime = Date.now(); 
  GameProps.score = 0; 
  if (GameProps.scoreDisplayPlaying) {
    GameProps.scoreDisplayPlaying.value = 0; 
  }

  GameProps.gameStatus = EGameStatus.Playing; 
  startGameLoop(); 
}

export function bateIsEaten() { 
  const timeToEat = (Date.now() - GameProps.baitSpawnTime) / 1000; 
  let points = Math.max(10, 100 - Math.floor(timeToEat * 5)); 
  GameProps.score += points;

  if (GameProps.scoreDisplayPlaying) {
    GameProps.scoreDisplayPlaying.value = GameProps.score; 
  }

  if (GameProps.snake) { 
    GameProps.snake.grow(); // Forteller slangen at den skal vokse
  }
  if (GameProps.bait) { 
    GameProps.bait.update(); 
  }
  GameProps.baitSpawnTime = Date.now(); 

  increaseGameSpeed(); 
}


//------------------------------------------------------------------------------------------
//----------- functions -------------------------------------------------------------------
//------------------------------------------------------------------------------------------

function loadGame() {
  cvs.width = GameBoardSize.Cols * SheetData.Head.width; 
  cvs.height = GameBoardSize.Rows * SheetData.Head.height;
  spcvs.updateBoundsRect(); 

  GameProps.scoreDisplayPlaying = new libSprite.TSpriteNumber(spcvs, SheetData.Number, new lib2D.TPoint(25, 15)); 
  GameProps.scoreDisplayPlaying.digits = 4; 
  GameProps.scoreDisplayPlaying.scale = 0.7; 
  GameProps.scoreDisplayPlaying.value = 0;
  GameProps.scoreDisplayPlaying.visible = false; 


  initMenus(SheetData); 
  GameProps.gameStatus = EGameStatus.Idle; 
  
  if (hndRequestAnimationFrame === null) {
    hndRequestAnimationFrame = requestAnimationFrame(drawGame);
  }
}

function drawGame() {
  spcvs.clearCanvas(); 

  if (GameProps.gameStatus === EGameStatus.Playing || GameProps.gameStatus === EGameStatus.Pause) {
    if (GameProps.bait) GameProps.bait.draw();
    if (GameProps.snake) GameProps.snake.draw();
    
    if (GameProps.scoreDisplayPlaying) {
         GameProps.scoreDisplayPlaying.visible = (GameProps.gameStatus === EGameStatus.Playing);
         if(GameProps.scoreDisplayPlaying.visible) GameProps.scoreDisplayPlaying.draw();
    }
  }
  
  drawMenus(); 

  hndRequestAnimationFrame = requestAnimationFrame(drawGame);
}

function updateGame() {
  if (GameProps.gameStatus !== EGameStatus.Playing) {
    return; 
  }

  if (GameProps.snake) {
      if (!GameProps.snake.update()) { 
        GameProps.gameStatus = EGameStatus.GameOver; 
        stopGameLoop(); 
      }
  }
}

function increaseGameSpeed() {
  if (gameSpeed < MAX_GAME_SPEED) {
    gameSpeed += GAME_SPEED_INCREMENT;
    gameSpeed = Math.min(gameSpeed, MAX_GAME_SPEED); 

    if (hndUpdateGame !== null) { 
        clearInterval(hndUpdateGame);
        hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed);
    }
  }
}

//-----------------------------------------------------------------------------------------
//----------- Event handlers --------------------------------------------------------------
//-----------------------------------------------------------------------------------------

function onKeyDown(event) {
  if (GameProps.gameStatus === EGameStatus.Playing && GameProps.snake) {
      switch (event.key) {
        case "ArrowUp": GameProps.snake.setDirection(EDirection.Up); break;
        case "ArrowDown": GameProps.snake.setDirection(EDirection.Down); break;
        case "ArrowLeft": GameProps.snake.setDirection(EDirection.Left); break;
        case "ArrowRight": GameProps.snake.setDirection(EDirection.Right); break;
      }
  }
  if (event.key === " ") { 
      event.preventDefault(); 
      if (GameProps.gameStatus === EGameStatus.Playing) {
        GameProps.gameStatus = EGameStatus.Pause;
        stopGameLoop(); 
      }
  }
}
//-----------------------------------------------------------------------------------------
//----------- main -----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

document.fonts.ready.then(() => {
    spcvs.loadSpriteSheet("./Media/spriteSheet.png", loadGame);
}).catch(err => {
    console.warn("Font loading check failed or not supported, loading sprite sheet directly:", err);
    spcvs.loadSpriteSheet("./Media/spriteSheet.png", loadGame); 
});

document.addEventListener("keydown", onKeyDown); 
