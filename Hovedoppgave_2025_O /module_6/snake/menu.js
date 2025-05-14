"use strict";

//------------------------------------------------------------------------------------------
//----------- Import modules, js files  ---------------------------------------------------
//------------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.js";
import lib2D from "../../common/libs/lib2d_v2.js";
// Importerer NÅ KUN det som ikke er SheetData direkte. SheetData vil bli sendt som parameter.
import { GameProps, EGameStatus, spcvs, newGame, startGameLoop, stopGameLoop, resetGameSpeed } from "./game.js";

//------------------------------------------------------------------------------------------
//----------- Global variables for menu elements -------------------------------------------
//------------------------------------------------------------------------------------------
let playButton;
let resumeButton;
let gameOverSprite;
let homeButton;
let retryButton;
let scoreDisplayGameOver; 
let scoreTextGameOver;    

let CANVAS_WIDTH;
let CANVAS_HEIGHT;

//------------------------------------------------------------------------------------------
//----------- Initialize Menu Elements -----------------------------------------------------
//------------------------------------------------------------------------------------------
// SheetData blir nå sendt som parameter: sheetDataProvider
export function initMenus(sheetDataProvider) {
    // Bruker canvas-dimensjoner som er satt i game.js -> loadGame()
    // Disse dimensjonene BLE satt ved hjelp av SheetData og GameBoardSize der.
    CANVAS_WIDTH = spcvs.canvas.width;
    CANVAS_HEIGHT = spcvs.canvas.height;

    // Play Button (Synlig ved start)
    // Bruker sheetDataProvider for å få dimensjoner etc.
    const playButtonX = (CANVAS_WIDTH - sheetDataProvider.Play.width) / 2;
    const playButtonY = (CANVAS_HEIGHT - sheetDataProvider.Play.height) / 2;
    playButton = new libSprite.TSpriteButtonHaptic(spcvs, sheetDataProvider.Play, new lib2D.TPoint(playButtonX, playButtonY));
    playButton.onClick = () => {
        if (GameProps.gameStatus === EGameStatus.Idle) {
            newGame(); 
            playButton.visible = false; 
            if(resumeButton) resumeButton.visible = false;
            if(gameOverSprite) gameOverSprite.visible = false;
            if(homeButton) homeButton.visible = false;
            if(retryButton) retryButton.visible = false;
            if(scoreDisplayGameOver) scoreDisplayGameOver.visible = false;
        }
    };
    playButton.visible = true;

    // Resume Button (Skjult ved start)
    const resumeButtonX = (CANVAS_WIDTH - sheetDataProvider.Resume.width) / 2;
    const resumeButtonY = (CANVAS_HEIGHT - sheetDataProvider.Resume.height) / 2;
    resumeButton = new libSprite.TSpriteButtonHaptic(spcvs, sheetDataProvider.Resume, new lib2D.TPoint(resumeButtonX, resumeButtonY));
    resumeButton.onClick = () => {
        if (GameProps.gameStatus === EGameStatus.Pause) {
            GameProps.gameStatus = EGameStatus.Playing; 
            startGameLoop(); 
            resumeButton.visible = false; 
        }
    };
    resumeButton.visible = false;

    // Game Over Sprite (Skjult ved start)
    const gameOverX = (CANVAS_WIDTH - sheetDataProvider.GameOver.width) / 2;
    const gameOverY = (CANVAS_HEIGHT - sheetDataProvider.GameOver.height) / 2;
    gameOverSprite = new libSprite.TSprite(spcvs, sheetDataProvider.GameOver, new lib2D.TPoint(gameOverX, gameOverY));
    gameOverSprite.visible = false;

    // Home Button (for Game Over-skjerm, skjult ved start)
    const homeButtonX = gameOverX + (sheetDataProvider.GameOver.width * 0.25) - (sheetDataProvider.Home.width / 2) ;
    const homeButtonY = gameOverY + (sheetDataProvider.GameOver.height * 0.75) - (sheetDataProvider.Home.height / 2);
    homeButton = new libSprite.TSpriteButtonHaptic(spcvs, sheetDataProvider.Home, new lib2D.TPoint(homeButtonX, homeButtonY));
    homeButton.onClick = () => {
        GameProps.gameStatus = EGameStatus.Idle; 
        gameOverSprite.visible = false;
        homeButton.visible = false;
        retryButton.visible = false;
        if(scoreDisplayGameOver) scoreDisplayGameOver.visible = false;
        if(playButton) playButton.visible = true; 
        stopGameLoop(); 
        resetGameSpeed(); 
    };
    homeButton.visible = false;

    // Retry Button (for Game Over-skjerm, skjult ved start)
    const retryButtonX = gameOverX + (sheetDataProvider.GameOver.width * 0.75) - (sheetDataProvider.Retry.width / 2);
    const retryButtonY = gameOverY + (sheetDataProvider.GameOver.height * 0.75) - (sheetDataProvider.Retry.height / 2);
    retryButton = new libSprite.TSpriteButtonHaptic(spcvs, sheetDataProvider.Retry, new lib2D.TPoint(retryButtonX, retryButtonY));
    retryButton.onClick = () => {
        newGame(); 
        gameOverSprite.visible = false;
        homeButton.visible = false;
        retryButton.visible = false;
        if(scoreDisplayGameOver) scoreDisplayGameOver.visible = false;
    };
    retryButton.visible = false;

    // Poengvisning for Game Over-skjerm
    const scoreTextX = gameOverX + (sheetDataProvider.GameOver.width / 2); 
    const scoreTextY = gameOverY + (sheetDataProvider.GameOver.height * 0.45); 
    const scoreNumberX = scoreTextX; 
    const scoreNumberY = scoreTextY + 50; 
    
    scoreDisplayGameOver = new libSprite.TSpriteNumber(spcvs, sheetDataProvider.Number, new lib2D.TPoint(scoreNumberX, scoreNumberY));
    scoreDisplayGameOver.digits = 4; 
    scoreDisplayGameOver.justify = libSprite.ESpriteNumberJustifyType.Center; 
    scoreDisplayGameOver.scale = 1.2; 
    scoreDisplayGameOver.visible = false;

    scoreTextGameOver = { x: scoreTextX, y: scoreTextY, text: "SCORE:" };
}

//------------------------------------------------------------------------------------------
//----------- Draw Menu Elements -----------------------------------------------------------
//------------------------------------------------------------------------------------------
export function drawMenus() {
    const ctx = spcvs.context; 

    if (GameProps.gameStatus === EGameStatus.Idle) {
        if (playButton) playButton.draw();
        if (resumeButton) resumeButton.visible = false;
        if (gameOverSprite) gameOverSprite.visible = false;
        if (homeButton) homeButton.visible = false;
        if (retryButton) retryButton.visible = false;
        if (scoreDisplayGameOver) scoreDisplayGameOver.visible = false;

    } else if (GameProps.gameStatus === EGameStatus.Pause) {
        if (resumeButton) {
            resumeButton.visible = true;
            resumeButton.draw();
        }
        if (playButton) playButton.visible = false;
        if (gameOverSprite) gameOverSprite.visible = false;
        if (homeButton) homeButton.visible = false;
        if (retryButton) retryButton.visible = false;
        if (scoreDisplayGameOver) scoreDisplayGameOver.visible = false;

    } else if (GameProps.gameStatus === EGameStatus.GameOver) {
        if (gameOverSprite) {
            gameOverSprite.visible = true;
            gameOverSprite.draw();
        }
        if (homeButton) {
            homeButton.visible = true;
            homeButton.draw();
        }
        if (retryButton) {
            retryButton.visible = true;
            retryButton.draw();
        }
        
        if (scoreTextGameOver && gameOverSprite && gameOverSprite.visible) {
            ctx.font = "bold 40px 'Press Start 2P', sans-serif"; 
            ctx.fillStyle = "#FFFFFF"; 
            ctx.textAlign = "center";
            ctx.textBaseline = "middle"; 
            ctx.fillText(scoreTextGameOver.text, scoreTextGameOver.x, scoreTextGameOver.y);
        }
        
        if (scoreDisplayGameOver) {
            scoreDisplayGameOver.value = GameProps.score; 
            scoreDisplayGameOver.visible = true;
            scoreDisplayGameOver.draw();
        }

        if (playButton) playButton.visible = false;
        if (resumeButton) resumeButton.visible = false;
    } else if (GameProps.gameStatus === EGameStatus.Playing) {
        if (playButton) playButton.visible = false;
        if (resumeButton) resumeButton.visible = false;
        if (gameOverSprite) gameOverSprite.visible = false;
        if (homeButton) homeButton.visible = false;
        if (retryButton) retryButton.visible = false;
        if (scoreDisplayGameOver) scoreDisplayGameOver.visible = false;
    }
}
