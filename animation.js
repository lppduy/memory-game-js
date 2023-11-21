import { Card } from './Card.js';

// export function animateCardsIntoPosition(boardElement) {
//   const initialPositions = calculateInitialPositions(4, 5);

//   gsap.set(boardElement, { perspective: 800 });
//   gsap.set(boardElement.children, { transformStyle: 'preserve-3d' });

//   gsap.set(boardElement.children, { x: 0, y: 0 });

//   // gsap.to(boardElement.children, {
//   //   duration: 1,
//   //   opacity: 0,
//   //   rotationY: 720,
//   //   stagger: 0.1,
//   //   onComplete: () => {
//   //     gsap.from(boardElement.children, {
//   //       duration: 0.5,
//   //       x: index => initialPositions[index].x,
//   //       y: index => initialPositions[index].y,
//   //       rotationY: 0,
//   //       opacity: 1,
//   //       stagger: 0.1,
//   //     });
//   //   },
//   // });

//   // gsap.from(boardElement.children, {
//   //   x: 500,
//   //   y: 500,
//   //   duration: 3,
//   //   opacity: 0,
//   //   stagger: 0.1,
//   // });
// }
// export function calculateInitialPositions(rows, columns) {
//   const initialPositions = [];

//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < columns; c++) {
//       const offsetX = (columns / 2 - c) * parseInt(Card.WIDTH); // Tính vị trí ban đầu
//       const offsetY = (rows / 2 - r) * parseInt(Card.HEIGHT); // Tính vị trí ban đầu

//       initialPositions.push({ x: offsetX, y: offsetY });
//     }
//   }

//   return initialPositions;
// }

export function animateCardsIntoPosition(cards, columns, MARGIN_BETWEEN_CARDS) {
  gsap.fromTo(
    cards.map(card => card.element),
    {
      x: index => (index % columns) * (Card.WIDTH + MARGIN_BETWEEN_CARDS),
      y: index =>
        Math.floor(index / columns) * (Card.HEIGHT + MARGIN_BETWEEN_CARDS),
      duration: 1,
      stagger: 0.1,
      ease: 'power1.out',
      onStart: index => {
        cards[index].element.style.zIndex = 'auto';
      },
    },
    { x: 0, y: 0 }
  );
}
