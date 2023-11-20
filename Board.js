import { Card } from './Card.js';

export class Board extends Node {
  constructor(rows, columns, cardSet) {
    super();
    this.rows = rows;
    this.columns = columns;
    this.cardSet = cardSet;
    this._board = [];
    this.element.style.backgroundColor = '#000';
    this.element.style.border = '10px solid #000';
    this.element.style.position = 'relative';
    this.element.style.top = '50%';
    this.element.style.left = '50%';
    this.element.style.transform = 'translate(-50%, -50%)';
    this.createBoard();
  }

  createBoard() {
    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < this.columns; c++) {
        const index = r * this.columns + c;
        const cardImg = this.cardSet[index];
        const offsetX = c * parseInt(Card.WIDTH);
        const offsetY = r * parseInt(Card.HEIGHT);

        const card = new Card(index, cardImg);
        card.x = offsetX;
        card.y = offsetY;

        row.push(card);
        this.addChild(card);
      }
      this._board.push(row);
    }
  }
}
