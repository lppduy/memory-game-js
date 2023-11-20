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

  animateCardsIntoPosition(boardElement);
  // animateCardsToInitialPosition(boardElement);

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

export function animateCardsIntoPosition(boardElement) {
  const finalPositions = calculateInitialPositions(4, 5);

  gsap.set(boardElement, { perspective: 800 });
  gsap.set(boardElement.children, { transformStyle: 'preserve-3d' });

  gsap.from(boardElement.children, {
    duration: 1,
    opacity: 0,
    // rotationY: 720,
    stagger: 0.1,
    onComplete: () => {
      gsap.to(boardElement.children, {
        duration: 0.5,
        x: index => finalPositions[index].x,
        y: index => finalPositions[index].y,
        rotationY: 0,
        opacity: 1,
        stagger: 0.1,
      });
    },
  });
}
export function calculateInitialPositions(rows, columns) {
  const initialPositions = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const offsetX = (columns / 2 - c) * parseInt(Card.WIDTH); // Tính vị trí ban đầu
      const offsetY = (rows / 2 - r) * parseInt(Card.HEIGHT); // Tính vị trí ban đầu

      initialPositions.push({ x: offsetX, y: offsetY });
    }
  }

  return initialPositions;
}

// export function animateCardsToInitialPosition(boardElement) {
//   const initialPositions = calculateInitialPositions(4, 5);

//   gsap.set(boardElement, { perspective: 800 });
//   gsap.set(boardElement.children, { transformStyle: 'preserve-3d' });

//   gsap.from(boardElement.children, {
//     duration: 1,
//     opacity: 0,
//     rotationY: 720,
//     stagger: 0.1,
//     onComplete: () => {
//       gsap.to(boardElement.children, {
//         duration: 0.5,
//         x: 0, // Di chuyển về vị trí ban đầu (x: 0)
//         y: 0, // Di chuyển về vị trí ban đầu (y: 0)
//         rotationY: 0,
//         opacity: 1,
//         stagger: 0.1,
//       });
//     },
//   });
// }

// export function calculateInitialPositions(rows, columns) {
//   const initialPositions = [];

//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < columns; c++) {
//       const offsetX = (columns / 2 - c) * parseInt(Card.WIDTH); // Tính vị trí ban đầu
//       const offsetY = (rows / 2 - r) * parseInt(Card.HEIGHT); // Tính vị trí ban đầu

//       initialPositions.push({ x: 0, y: 0 }); // Sử dụng vị trí ban đầu là (0, 0) cho tất cả các thẻ
//     }
//   }

//   return initialPositions;
// }
