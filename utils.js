import { Card } from './Card.js';

let currentBoardElement;

export function formatCoin(num) {
  return Number(num).toLocaleString('en');
}

export function createBoard(rows, columns, cardSet) {
  const boardElement = document.createElement('div');
  boardElement.style.height = rows * parseInt(Card.HEIGHT) + 'px';
  boardElement.style.width = columns * parseInt(Card.WIDTH) + 'px';
  boardElement.style.position = 'relative';
  boardElement.style.top = '50%';
  boardElement.style.left = '50%';
  boardElement.style.transform = 'translate(-50%, -50%)';

  const MARGIN_BETWEEN_CARDS = 20;
  const cards = [];
  let initZIndex = -1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const index = r * columns + c;
      const cardImg = cardSet[index];
      const offsetX = c * (parseInt(Card.WIDTH) + MARGIN_BETWEEN_CARDS);
      const offsetY = r * (parseInt(Card.HEIGHT) + MARGIN_BETWEEN_CARDS);

      const card = new Card(index, cardImg);
      card.element.setAttribute('id', `${r.toString()}-${c.toString()}`);
      card.element.style.position = 'absolute';
      card.element.style.top = offsetY + 'px';
      card.element.style.left = offsetX + 'px';

      card.element.style.zIndex = initZIndex;

      boardElement.appendChild(card.element);
      cards.push(card);

      const timeline = gsap.timeline();

      timeline.set(card, { x: 200, y: 200 }).to(card, {
        opacity: 1,
        x: offsetX,
        y: offsetY,
        delay: 0.1 * index,
        onStart: () => {
          card.element.style.zIndex = 'auto';
        },
      });
    }
  }
  currentBoardElement = boardElement;
  return { boardElement, cards };
}

export function removeBoardElement() {
  if (currentBoardElement && currentBoardElement.parentNode) {
    currentBoardElement.parentNode.removeChild(currentBoardElement);
  }
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
