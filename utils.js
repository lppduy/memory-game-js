import { Card } from './Card.js';

export function formatCoin(num) {
  return Number(num).toLocaleString('en');
}

export function createBoard(rows, columns, cardSet) {
  const boardElement = document.createElement('div');
  boardElement.style.height = rows * parseInt(Card.HEIGHT) + 'px';
  boardElement.style.width = columns * parseInt(Card.WIDTH) + 'px';
  boardElement.style.backgroundColor = '#000';
  boardElement.style.border = '10px solid #000';
  boardElement.style.position = 'relative';
  boardElement.style.top = '50%';
  boardElement.style.left = '50%';
  boardElement.style.transform = 'translate(-50%, -50%)';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const index = r * columns + c;
      const cardImg = cardSet[index];
      const offsetX = c * parseInt(Card.WIDTH);
      const offsetY = r * parseInt(Card.HEIGHT);

      const card = new Card(index, cardImg);

      card.element.style.position = 'absolute';
      card.element.style.top = offsetY + 'px';
      card.element.style.left = offsetX + 'px';

      boardElement.appendChild(card.element);
    }
  }
  return boardElement;
}

export function shuffleCards(cardList) {
  let cardSet = cardList.concat(cardList);

  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length);

    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }

  return cardSet;
}
