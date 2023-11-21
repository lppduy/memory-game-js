import { Label } from './engine/Label.js';
import { createBoard, formatCoin, removeBoardElement } from './utils.js';
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

let coin = 10_000;
let matchPairs = 0;
const ROWS = 4;
const COLUMNS = 5;
let cardOneSelected;
let cardTwoSelected;

// const cardSet = shuffleCards(cardList); // use to shuffle cards
const cardSet = [...cardList, ...cardList];

const coinEl = new Label(`Coins: ${formatCoin(coin)}`);
const containerElm = document.querySelector('.container');
const displayElm = document.querySelector('.display');

const buttonPlay = document.createElement('div');
buttonPlay.textContent = 'Start Game';
buttonPlay.style.position = 'relative';
buttonPlay.style.fontSize = '50px';
buttonPlay.style.padding = '20px';
buttonPlay.style.top = '200px';
buttonPlay.style.left = '40px';
buttonPlay.style.cursor = 'pointer';
buttonPlay.style.backgroundColor = 'black';
buttonPlay.style.borderRadius = '10px';
buttonPlay.style.color = 'white';
buttonPlay.style.fontFamily = 'Montserrat, sans-serif';

containerElm.appendChild(buttonPlay);

displayElm.append(coinEl.element);

function startGame() {
  buttonPlay.style.display = 'none';
  const { boardElement, cards } = createBoard(ROWS, COLUMNS, cardSet);

  cards.forEach(card => card.element.addEventListener('click', handleSelectCard));
  containerElm.appendChild(boardElement);
}

buttonPlay.addEventListener('click', startGame);

export function handleSelectCard() {
  const imgElement = this.children[0];
  if (imgElement.src.includes('back')) {
    if (
      !cardOneSelected ||
      !cardTwoSelected ||
      (cardOneSelected &&
        cardTwoSelected &&
        cardOneSelected.style.display === 'none' &&
        cardTwoSelected.style.display === 'none')
    ) {
      if (!cardOneSelected) {
        cardOneSelected = this;

        revealCard(cardOneSelected);
      } else if (!cardTwoSelected && this !== cardOneSelected) {
        cardTwoSelected = this;

        revealCard(cardTwoSelected);

        setTimeout(checkWin, 1000);
      }
    }
  }
}

export function revealCard(card) {
  const coords = card.id.split('-');
  const imgElement = card.children[0];
  const r = parseInt(coords[0]);
  const c = parseInt(coords[1]);

  gsap.to(card, {
    scaleX: 0,
    duration: 0.2,
    onComplete: () => {
      imgElement.src = getSrc(cardSet[r * COLUMNS + c]);
    },
  });
  gsap.to(card, { scaleX: 1, duration: 0.2, delay: 0.2 });
}

export function checkWin() {
  const coordsOne = cardOneSelected.id.split('-');
  const coordsTwo = cardTwoSelected.id.split('-');
  const r1 = parseInt(coordsOne[0]);
  const c1 = parseInt(coordsOne[1]);
  const r2 = parseInt(coordsTwo[0]);
  const c2 = parseInt(coordsTwo[1]);

  if (
    cardSet[r1 * COLUMNS + c1] === cardSet[r2 * COLUMNS + c2] &&
    cardOneSelected.id !== cardTwoSelected.id
  ) {
    coin += 1000;
    matchPairs++;

    cardOneSelected.style.display = 'none';
    cardTwoSelected.style.display = 'none';

    updateCoinCount();
  } else {
    coin -= 500;
    cardOneSelected.children[0].src = getSrc('back');
    cardTwoSelected.children[0].src = getSrc('back');
    updateCoinCount();
  }

  if (coin < 0) {
    alert('Game Over! You ran out of coins.');
    removeBoardElement();
    resetGame();
  }

  if (matchPairs === 10) {
    alert('Congratulations! You won!');
    resetGame();
  }

  cardOneSelected = null;
  cardTwoSelected = null;
}

export function updateCoinCount() {
  coinEl.element.textContent = `Coins: ${formatCoin(coin)}`;
}

function resetGame() {
  window.location.reload();
}

export function getSrc(cardImg) {
  return `./assets/${cardImg}.jpg`;
}
