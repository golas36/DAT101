"use strict";

// EDirection defineres og eksporteres her
export const EDirection = { Up: 0, Right: 1, Left: 2, Down: 3 };

export const GameBoardSize = { Cols: 24, Rows: 18 };

export const EBoardCellInfoType = { Empty: 0, Snake: 1, Bait: 2 };

export class TBoardCell {
  constructor(aCol, aRow) {
    this.col = aCol;
    this.row = aRow;
  }
}
//------------------------------------------------------------------------------------------

export class TBoardCellInfo {
  constructor() {
    this.direction = EDirection.Right; 
    this.infoType = EBoardCellInfoType.Empty;
  }
}
//------------------------------------------------------------------------------------------

export class TGameBoard {
  constructor() {
    this.cols = GameBoardSize.Cols;
    this.rows = GameBoardSize.Rows;
    this.gameBoard = [];

    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new TBoardCellInfo());
      }
      this.gameBoard.push(row);
    }
  } 

  getCell(aRow, aCol) {
    if (aRow < 0 || aRow >= this.rows || aCol < 0 || aCol >= this.cols) {
      return null; 
    }
    return this.gameBoard[aRow][aCol];
  } 
  
}
//------------------------------------------------------------------------------------------
