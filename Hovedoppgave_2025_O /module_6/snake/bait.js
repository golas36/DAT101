"use strict";
//-----------------------------------------------------------------------------------------
//----------- Import modules, js files  ---------------------------------------------------
//-----------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.js";
import lib2D from "../../common/libs/lib2d_v2.js";
import { GameProps, SheetData } from "./game.js";
import { TBoardCell, EBoardCellInfoType, GameBoardSize } from "./gameBoard.js"; // GameBoardSize for grenser

//------------------------------------------------------------------------------------------
//----------- Classes ---------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

export class TBait extends libSprite.TSprite {
  #boardCell = null; 
  constructor(aSpriteCanvas) {
    const pos = new lib2D.TPoint(0, 0); 
    super(aSpriteCanvas, SheetData.Bait, pos);
    this.#boardCell = new TBoardCell(0, 0); 
    this.update(); 
  } 

  update() {
    let newRow, newCol;
    let attempts = 0; // For å unngå evig løkke hvis brettet er fullt
    const MAX_ATTEMPTS = GameBoardSize.Rows * GameBoardSize.Cols;

    do {
      newRow = Math.floor(Math.random() * GameBoardSize.Rows);
      newCol = Math.floor(Math.random() * GameBoardSize.Cols);
      attempts++;
      if (attempts > MAX_ATTEMPTS) {
          console.warn("Could not find an empty cell for the bait after max attempts.");
          // Håndter eventuelt at brettet er fullt, f.eks. ikke plasser ny matbit
          return; 
      }
    } while (GameProps.gameBoard.getCell(newRow, newCol).infoType !== EBoardCellInfoType.Empty);
    
    this.#boardCell.row = newRow;
    this.#boardCell.col = newCol;

    this.x = this.#boardCell.col * this.spi.width;
    this.y = this.#boardCell.row * this.spi.height;
    
    GameProps.gameBoard.getCell(this.#boardCell.row, this.#boardCell.col).infoType = EBoardCellInfoType.Bait;
  } 

}
