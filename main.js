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

let coin = 10_000;
let matchPairs = 0;
const ROWS = 4;
const COLUMNS = 5;
let cardOneSelected;
let cardTwoSelected;

const cardSet = shuffleCards(cardList);
console.log(cardSet);
const { boardElement, cards } = createBoard(ROWS, COLUMNS, cardSet);
// createBoard(4, 5, cardSet);
// console.log(boardElement.children);
console.log(cards);

cards.forEach(card => card.element.addEventListener('click', handleSelectCard));

const coinEl = new Label(`Coins: ${formatCoin(coin)}`);
const containerElm = document.querySelector('.container');
const displayElm = document.querySelector('.display');

containerElm.appendChild(boardElement);
displayElm.append(coinEl.element);

// //////////
// export function handleSelectCard() {
//   const imgElement = this.children[0];
//   if (imgElement.src.includes('back')) {
//     if (!cardOneSelected) {
//       cardOneSelected = this;
//       gsap.to(cardOneSelected, {
//         scale: 0,
//         duration: 0.5,
//         onComplete: () => {
//           revealCard(cardOneSelected);
//         },
//       });
//     } else if (!cardTwoSelected && this !== cardOneSelected) {
//       cardTwoSelected = this;
//       gsap.to(cardTwoSelected, {
//         scale: 0,
//         duration: 0.5,
//         onComplete: () => {
//           revealCard(cardTwoSelected);
//           setTimeout(checkWin, 1000);
//         },
//       });
//     }

//     gsap.to(cardOneSelected, {
//       rotationY: 180,
//       duration: 0.5,
//       scale: 1,
//       ease: 'power2.out',
//       onComplete: () => {
//         if (cardTwoSelected) {
//           revealCard(cardTwoSelected);
//           setTimeout(checkWin, 800);
//         }
//       },
//     });

//     gsap.to(cardTwoSelected, {
//       rotationY: 180,
//       duration: 0.5,
//       scale: 1,
//       ease: 'power2.out',
//     });
//   }
// }

export function handleSelectCard() {
  const imgElement = this.children[0];
  if (imgElement.src.includes('back')) {
    if (!cardOneSelected) {
      cardOneSelected = this;
      revealCard(cardOneSelected);
    } else if (!cardTwoSelected && this !== cardOneSelected) {
      cardTwoSelected = this;
      revealCard(cardTwoSelected);
      setTimeout(checkWin, 1000);
    }

    // gsap.to(cardOneSelected, {
    //   // rotationY: 180,
    //   duration: 0.5,
    //   scaleX: 0,
    //   ease: 'power2.out',
    //   onComplete: () => {
    //     revealCard(cardTwoSelected);
    //     setTimeout(checkWin, 800);
    //   },
    // });

    // gsap.to(cardTwoSelected, {
    //   rotationY: 180,
    //   duration: 0.5,
    //   scaleX: 0,
    //   ease: 'power2.out',
    // });
  }
}
export function revealCard(card) {
  console.log('work');
  const coords = card.id.split('-');
  console.log(coords);
  const imgElement = card.children[0];
  console.log(coords);
  const r = parseInt(coords[0]);
  const c = parseInt(coords[1]);
  console.log(imgElement);
  // imgElement.src = getSrc(cardSet[r * COLUMNS + c]);

  gsap.to(card, {
    scaleX: 0,
    duration: 0.2,
    onComplete: () => {
      // card.element.style.backgroundColor = 'red';
      imgElement.src = getSrc(cardSet[r * COLUMNS + c]);
    },
  });
  gsap.to(card, { scaleX: 1, duration: 0.2, delay: 0.2 });
}

export function getSrc(cardImg) {
  return `./assets/${cardImg}.jpg`;
}

// export function checkWin() {
//   const coordsOne = cardOneSelected.id.split('-');
//   const coordsTwo = cardTwoSelected.id.split('-');
//   const r1 = parseInt(coordsOne[0]);
//   const c1 = parseInt(coordsOne[1]);
//   const r2 = parseInt(coordsTwo[0]);
//   const c2 = parseInt(coordsTwo[1]);

//   console.log(r1, c1);
//   console.log(r2, c2);

//   if (
//     cardSet[r1 * COLUMNS + c1] === cardSet[r2 * COLUMNS + c2] &&
//     cardOneSelected.id !== cardTwoSelected.id
//   ) {
//     coin += 1000;
//     matchPairs++;
//     cardOneSelected.style.visibility = 'hidden';
//     cardTwoSelected.style.visibility = 'hidden';
//   } else {
//     coin -= 500;
//     cardOneSelected.children[0].src = getSrc('back');
//     cardTwoSelected.children[0].src = getSrc('back');
//   }
//   console.log(coin);
//   if (coin < 0) {
//     cards.forEach(card =>
//       card.element.removeEventListener('click', handleSelectCard)
//     );
//     alert('Game Over! You ran out of coins.');
//   }

//   if (matchPairs === 10) {
//     card.element.removeEventListener('click', handleSelectCard);
//     alert('Congratulations! You won!');
//   }

//   cardOneSelected = null;
//   cardTwoSelected = null;
//   updateCoinCount();
// }

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

    const tl = gsap.timeline();

    // Di chuyển và phóng to hai lá bài ra giữa màn hình
    tl.to([cardOneSelected, cardTwoSelected], {
      scale: 1.5,
      // x: 200, // Điều chỉnh vị trí theo chiều ngang
      // y: 200, // Điều chỉnh vị trí theo chiều dọc
      duration: 1,
      ease: 'power2.out',
    });

    // Sau 1 giây, ẩn các lá bài
    tl.to([cardOneSelected, cardTwoSelected], {
      opacity: 0,
      duration: 0.5,
      delay: 1, // Khoảng thời gian trước khi biến mất,
      // ease: 'power2.out',
      ease: 'back.out',
      onComplete: () => {
        cardOneSelected.style.display = 'none';
        cardTwoSelected.style.display = 'none';
      },
    });
    updateCoinCount();
  } else {
    coin -= 500;
    cardOneSelected.children[0].src = getSrc('back');
    cardTwoSelected.children[0].src = getSrc('back');
    updateCoinCount(); // Gọi hàm cập nhật điểm số
  }

  if (coin < 0) {
    cards.forEach(card =>
      card.element.removeEventListener('click', handleSelectCard)
    );
    alert('Game Over! You ran out of coins.');
  }

  if (matchPairs === 10) {
    cards.forEach(card =>
      card.element.removeEventListener('click', handleSelectCard)
    );
    alert('Congratulations! You won!');
  }

  cardOneSelected = null;
  cardTwoSelected = null;
}

export function updateCoinCount() {
  coinEl.element.textContent = `Coins: ${formatCoin(coin)}`;
}
