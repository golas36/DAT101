"use strict";
//------------------------------------------------------------------------------------------
//----------- Import modules, js files  ---------------------------------------------------
//------------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.js"; // Endret til .js
import lib2D from "../../common/libs/lib2d_v2.js";       // Endret til .js
import { GameProps, SheetData, bateIsEaten } from "./game.js"; // Endret til .js
import { TBoardCell, EBoardCellInfoType, GameBoardSize, EDirection } from "./gameBoard.js"; // Endret til .js

//------------------------------------------------------------------------------------------
//----------- variables and object ---------------------------------------------------------
//------------------------------------------------------------------------------------------
const ESpriteIndex = {UR: 0, LD: 0, RU: 1, DR: 1, DL: 2, LU: 2, RD: 3, UL: 3, RL: 4, UD: 5};

//-----------------------------------------------------------------------------------------
//----------- Classes ---------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
class TSnakePart extends libSprite.TSprite {
  constructor(aSpriteCanvas, aSpriteInfo, aBoardCell) {
    const pos = new lib2D.TPoint(aBoardCell.col * aSpriteInfo.width, aBoardCell.row * aSpriteInfo.height);
    super(aSpriteCanvas, aSpriteInfo, pos);
    this.boardCell = aBoardCell; 
    
    let boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if (boardCellInfo) {
        this.direction = boardCellInfo.direction; 
        boardCellInfo.infoType = EBoardCellInfoType.Snake; 
    } else {
        this.direction = EDirection.Right; 
        console.error(`TSnakePart Constructor: Invalid board cell for ${this.constructor.name}`, JSON.stringify(aBoardCell));
    }
    // Fra din opplastede snake.js: this.index = this.direction;
    this.index = this.direction; 
  }

  updateDisplayPosition(){ 
    this.x = this.boardCell.col * this.spi.width;
    this.y = this.boardCell.row * this.spi.height;
  }
}

class TSnakeHead extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell) {
    super(aSpriteCanvas, SheetData.Head, aBoardCell);
    this.newDirection = this.direction; 
  }

  setDirection(aDirection) {
    if ((this.direction === EDirection.Right || this.direction === EDirection.Left) && (aDirection === EDirection.Up || aDirection === EDirection.Down)) {
      this.newDirection = aDirection;
    } else if ((this.direction === EDirection.Up || this.direction === EDirection.Down) && (aDirection === EDirection.Right || aDirection === EDirection.Left)) {
      this.newDirection = aDirection;
    }
  }

  update() { // Returnerer true hvis i live, false ved kollisjon
    // 1. Sett retningen i HODETS NÅVÆRENDE CELLE til den NYE retningen hodet vil ta.
    const currentCellOnBoard = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if (currentCellOnBoard) {
        currentCellOnBoard.direction = this.newDirection;
    } else {
        console.error("TSnakeHead.update: Head's current cell is invalid before move.", JSON.stringify(this.boardCell));
        return false; 
    }

    // 2. Beregn neste posisjon
    let nextRow = this.boardCell.row;
    let nextCol = this.boardCell.col;
    switch (this.newDirection) {
      case EDirection.Up:    nextRow--; break;
      case EDirection.Right: nextCol++; break;
      case EDirection.Left:  nextCol--; break;
      case EDirection.Down:  nextRow++; break;
      default: console.error("Head: Invalid newDirection", this.newDirection); return false;
    }
    
    // 3. Oppdater hodets retning og sprite-indeks FØR kollisjonssjekk
    this.direction = this.newDirection; 
    this.index = this.direction; 

    // 4. Sjekk kollisjon for den beregnede neste posisjonen
    if (this.checkCollision(nextRow, nextCol)) { 
      return false; 
    }
    
    // 5. Utfør bevegelsen
    this.boardCell.row = nextRow;
    this.boardCell.col = nextCol;
    this.updateDisplayPosition(); 

    // 6. Oppdater den nye cellen på brettet
    const newCellOccupied = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if (!newCellOccupied) { console.error("Head: newCellOccupied null after move", this.boardCell); return false; } 

    if (newCellOccupied.infoType === EBoardCellInfoType.Bait) {
      bateIsEaten(); // Denne kaller GameProps.snake.grow()
    }
    newCellOccupied.infoType = EBoardCellInfoType.Snake; 
    // I din originale kode setter ikke hodet retningen i cellen det ankommer. Vi følger det.
    // newCellOccupied.direction = this.direction; 

    return true; 
  }

  checkCollision(aRow, aCol) { 
    if (aRow < 0 || aRow >= GameBoardSize.Rows || aCol < 0 || aCol >= GameBoardSize.Cols) {
      return true;
    }
    const boardCellInfo = GameProps.gameBoard.getCell(aRow, aCol);
    if (boardCellInfo && boardCellInfo.infoType === EBoardCellInfoType.Snake) {
      return true;
    }
    return false; 
  }
}

class TSnakeBody extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell ) {
    super(aSpriteCanvas, SheetData.Body, aBoardCell);
    this.index = ESpriteIndex.RL;   
  }

  update(){ 
    let newSpriteIndex = ESpriteIndex.RL; 
    const previousDirectionThisPartHad = this.direction; 

    const cellCurrentlyIn = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if (!cellCurrentlyIn) { console.error("Body: current cell invalid", JSON.stringify(this.boardCell)); return false; }
    
    const directionToFollow = cellCurrentlyIn.direction;

    switch (directionToFollow) {
      case EDirection.Up:    this.boardCell.row--; break;
      case EDirection.Right: this.boardCell.col++; break;
      case EDirection.Left:  this.boardCell.col--; break;
      case EDirection.Down:  this.boardCell.row++; break;
      default: console.error("Body: invalid directionToFollow", directionToFollow); return false;
    }

    if (this.boardCell.row < 0 || this.boardCell.row >= GameBoardSize.Rows ||
        this.boardCell.col < 0 || this.boardCell.col >= GameBoardSize.Cols) {
        console.error("Body: moved off board", JSON.stringify(this.boardCell)); return false;
    }
    
    const cellMovedInto = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if (!cellMovedInto) { console.error("Body: cellMovedInto invalid", JSON.stringify(this.boardCell)); return false; }
    this.direction = cellMovedInto.direction; 

    switch (previousDirectionThisPartHad) { 
      case EDirection.Up:
        if (cellMovedInto.direction !== previousDirectionThisPartHad) { 
          if (cellMovedInto.direction === EDirection.Left) newSpriteIndex = ESpriteIndex.UL;
          else if (cellMovedInto.direction === EDirection.Right) newSpriteIndex = ESpriteIndex.UR;
          else newSpriteIndex = ESpriteIndex.UD;
        } else newSpriteIndex = ESpriteIndex.UD;
        break;
      case EDirection.Right:
        if (cellMovedInto.direction !== previousDirectionThisPartHad) {
          if (cellMovedInto.direction === EDirection.Up) newSpriteIndex = ESpriteIndex.RU;
          else if (cellMovedInto.direction === EDirection.Down) newSpriteIndex = ESpriteIndex.RD;
          else newSpriteIndex = ESpriteIndex.RL;
        } else newSpriteIndex = ESpriteIndex.RL;
        break;
      case EDirection.Left:
        if (cellMovedInto.direction !== previousDirectionThisPartHad) {
          if (cellMovedInto.direction === EDirection.Up) newSpriteIndex = ESpriteIndex.LU;
          else if (cellMovedInto.direction === EDirection.Down) newSpriteIndex = ESpriteIndex.LD;
          else newSpriteIndex = ESpriteIndex.RL;
        } else newSpriteIndex = ESpriteIndex.RL;
        break;
      case EDirection.Down:
        if (cellMovedInto.direction !== previousDirectionThisPartHad) {
          if (cellMovedInto.direction === EDirection.Left) newSpriteIndex = ESpriteIndex.DR; 
          else if (cellMovedInto.direction === EDirection.Right) newSpriteIndex = ESpriteIndex.DL; 
          else newSpriteIndex = ESpriteIndex.UD;
        } else newSpriteIndex = ESpriteIndex.UD;
        break;
      default: newSpriteIndex = ESpriteIndex.RL; 
    }
    this.index = newSpriteIndex;
    
    this.updateDisplayPosition();
    return true; 
  }
}

class TSnakeTail extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell) { 
    super(aSpriteCanvas, SheetData.Tail, aBoardCell);
  }

  update(){ 
    const cellCurrentlyIn = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if (!cellCurrentlyIn) { console.error("Tail: current cell invalid", JSON.stringify(this.boardCell)); return false; }

    const directionToFollow = cellCurrentlyIn.direction;

    switch (directionToFollow) {
      case EDirection.Up:    this.boardCell.row--; break;
      case EDirection.Right: this.boardCell.col++; break;
      case EDirection.Left:  this.boardCell.col--; break;
      case EDirection.Down:  this.boardCell.row++; break;
      default: console.error("Tail: invalid directionToFollow", directionToFollow); return false;
    }

    if (this.boardCell.row < 0 || this.boardCell.row >= GameBoardSize.Rows ||
        this.boardCell.col < 0 || this.boardCell.col >= GameBoardSize.Cols) {
        console.error("Tail: moved off board", JSON.stringify(this.boardCell)); return false;
    }
    
    const cellMovedInto = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if (!cellMovedInto) { console.error("Tail: cellMovedInto invalid for direction update", JSON.stringify(this.boardCell)); return false; }
    this.direction = cellMovedInto.direction;
    this.index = this.direction; 

    // Din originale TSnakeTail.update() tømte cellen den flyttet TIL.
    // Dette er uvanlig, men vi følger det.
    if (cellMovedInto.infoType !== EBoardCellInfoType.Bait) { // Ikke tøm hvis det er mat
        cellMovedInto.infoType = EBoardCellInfoType.Empty; 
    }

    this.updateDisplayPosition();
    return true; 
  }
}


export class TSnake {
  #isDead = false;
  #head = null;
  #body = []; // Skal være et array for å kunne vokse
  #tail = null;
  #isGrowing = false; // Flagg for vekst

  constructor(aSpriteCanvas, aStartBoardCell) {
    this.spcvs = aSpriteCanvas;
    let headBoardCell = new TBoardCell(aStartBoardCell.col, aStartBoardCell.row);
    GameProps.gameBoard.getCell(headBoardCell.row, headBoardCell.col).direction = EDirection.Right; 
    this.#head = new TSnakeHead(this.spcvs, headBoardCell);

    // Din konstruktør hadde this.#body = [new TSnakeBody(...)];
    // Vi beholder dette for én start-kroppsdel.
    let body1BoardCell = new TBoardCell(aStartBoardCell.col - 1, aStartBoardCell.row);
    GameProps.gameBoard.getCell(body1BoardCell.row, body1BoardCell.col).direction = EDirection.Right; 
    this.#body.push(new TSnakeBody(this.spcvs, body1BoardCell));
    
    let tailBoardCell = new TBoardCell(aStartBoardCell.col - 2, aStartBoardCell.row);
    GameProps.gameBoard.getCell(tailBoardCell.row, tailBoardCell.col).direction = EDirection.Right; 
    this.#tail = new TSnakeTail(this.spcvs, tailBoardCell);
  }

  draw() {
    this.#head.draw(); 
    for (let i = 0; i < this.#body.length; i++) { // Din kode tegnet hodet først
      this.#body[i].draw();
    }
    this.#tail.draw();
  }

  grow() { 
    this.#isGrowing = true;
    // console.log("Snake.grow() called, #isGrowing is true");
  }

  update(){ 
    if (this.#isDead) {
      return false; 
    }

    // Lagre posisjonen halen vil forlate FØR noen deler beveger seg
    const tailOldRow = this.#tail.boardCell.row;
    const tailOldCol = this.#tail.boardCell.col;
    const tailOldCellOnBoard = GameProps.gameBoard.getCell(tailOldRow, tailOldCol);
    // Retningen i halens gamle celle (satt av siste kroppsdel i forrige tick)
    const directionForNewBodyPart = tailOldCellOnBoard ? tailOldCellOnBoard.direction : EDirection.Right; 

    // Cellen som halen faktisk forlater (før den selv flytter seg)
    const actualCellTailIsLeaving = GameProps.gameBoard.getCell(this.#tail.boardCell.row, this.#tail.boardCell.col);

    // Oppdateringsrekkefølge fra din kode: Hode -> Kropp -> Hale
    if (!this.#head.update()) {
      this.#isDead = true; return false;
    }

    for (let i = 0; i < this.#body.length; i++) {
      if (!this.#body[i].update()) {
        this.#isDead = true; return false;
      }
    }
        
    if (!this.#tail.update()) { 
      this.#isDead = true; return false;
    }

    // Håndter vekst ETTER at alle deler har flyttet seg
    if (this.#isGrowing) {
      // console.log("Snake is growing. Old tail pos:", tailOldRow, tailOldCol);
      // Ny kroppsdel plasseres der halen VAR (tailOldRow, tailOldCol)
      const newBodyPartBoardCell = new TBoardCell(tailOldCol, tailOldRow);
      
      const cellForNewPart = GameProps.gameBoard.getCell(newBodyPartBoardCell.row, newBodyPartBoardCell.col);
      if (cellForNewPart) {
          // Sett retningen for den nye delen basert på hva som var i halens gamle celle
          cellForNewPart.direction = directionForNewBodyPart; 
          cellForNewPart.infoType = EBoardCellInfoType.Snake; // Viktig: Marker som slange
      } else {
          console.error("TSnake.update (grow): Cell for new body part is invalid.", JSON.stringify(newBodyPartBoardCell));
          this.#isDead = true; return false; 
      }

      const newBodyPart = new TSnakeBody(this.spcvs, newBodyPartBoardCell);
      // newBodyPart.direction settes i konstruktøren. Oppdater sprite-indeks:
      const partInFrontOfNew = this.#body.length > 0 ? this.#body[this.#body.length-1] : this.#head; // Delen foran den nye er siste kroppsdel eller hodet
      
        if (newBodyPart.direction === EDirection.Up) {
            if (partInFrontOfNew.direction === EDirection.Right) newBodyPart.index = ESpriteIndex.UR; 
            else if (partInFrontOfNew.direction === EDirection.Left) newBodyPart.index = ESpriteIndex.UL;  
            else newBodyPart.index = ESpriteIndex.UD; 
        } else if (newBodyPart.direction === EDirection.Down) {
            if (partInFrontOfNew.direction === EDirection.Right) newBodyPart.index = ESpriteIndex.DR; 
            else if (partInFrontOfNew.direction === EDirection.Left) newBodyPart.index = ESpriteIndex.DL;  
            else newBodyPart.index = ESpriteIndex.UD; 
        } else if (newBodyPart.direction === EDirection.Left) {
            if (partInFrontOfNew.direction === EDirection.Up) newBodyPart.index = ESpriteIndex.LU;    
            else if (partInFrontOfNew.direction === EDirection.Down) newBodyPart.index = ESpriteIndex.LD;  
            else newBodyPart.index = ESpriteIndex.RL; 
        } else if (newBodyPart.direction === EDirection.Right) {
            if (partInFrontOfNew.direction === EDirection.Up) newBodyPart.index = ESpriteIndex.RU;    
            else if (partInFrontOfNew.direction === EDirection.Down) newBodyPart.index = ESpriteIndex.RD;  
            else newBodyPart.index = ESpriteIndex.RL; 
        } else { 
             newBodyPart.index = (newBodyPart.direction === EDirection.Up || newBodyPart.direction === EDirection.Down) ? ESpriteIndex.UD : ESpriteIndex.RL;
        }
      
      // Legg den nye delen til FØR halen i bevegelseskjeden.
      // Den enkleste måten er å gjøre halen om til en kroppsdel,
      // og så lage en ny hale. Men din `clone()`-metode var ikke fullstendig.
      // Alternativ: legg til den nye delen, og flytt halen til den gamle posisjonen til den nye delen.
      // For nå, legg til på slutten av kroppen. Halen vil da følge denne.
      this.#body.push(newBodyPart); 
      this.#isGrowing = false;
      // console.log("Snake grew. New body length:", this.#body.length);
    } else {
      // Hvis ikke vekst: Din originale TSnakeTail.update() tømmer cellen den flytter TIL.
      // Vi må også tømme cellen halen FORLOT (actualCellTailIsLeaving),
      // med mindre den er okkupert av en annen del av slangen (f.eks. hodet).
      if (actualCellTailIsLeaving) {
          let isOccupiedByOtherPart = false;
          if(this.#head.boardCell.row === actualCellTailIsLeaving.row && this.#head.boardCell.col === actualCellTailIsLeaving.col) isOccupiedByOtherPart = true;
          // Sjekk også kroppen, unntatt den nye delen hvis vi nettopp vokste (men vi er i else-blokken)
          for(const bodyP of this.#body){
              if(bodyP.boardCell.row === actualCellTailIsLeaving.row && bodyP.boardCell.col === actualCellTailIsLeaving.col) {isOccupiedByOtherPart = true; break;}
          }
          if(!isOccupiedByOtherPart && actualCellTailIsLeaving.infoType !== EBoardCellInfoType.Bait) { // Ikke slett mat
            actualCellTailIsLeaving.infoType = EBoardCellInfoType.Empty;
          }
      }
    }
    return true; 
  }

  setDirection(aDirection) {
    this.#head.setDirection(aDirection);
  } 
}
