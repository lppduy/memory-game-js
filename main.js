import { Label } from './engine/Label.js';
import { createBoard, formatCoin, shuffleCards } from './utils.js';
const cardList = [
  'darkness',
  'double',
  'fairy',
  'fighting',
  'fire',
  'grass',
  'lightning',
  'metal',
  'psychic',
  'water',
];

const coin = 10_000;
const cardSet = shuffleCards(cardList);
const boardElement = createBoard(4, 5, cardSet);
// createBoard(4, 5, cardSet);

const coinEl = new Label(`Coins: ${formatCoin(coin)}`);
const containerElm = document.querySelector('.container');
const displayElm = document.querySelector('.display');

containerElm.appendChild(boardElement);
displayElm.append(coinEl.element);
