import { Label } from './engine/Label.js';
import { Card } from './Card.js';

export class Game {
  constructor() {
    this.coin = 10_000;
    this.matchPairs = 0;
    this.ROWS = 4;
    this.COLUMNS = 5;
    this.cardOneSelected = null;
    this.cardTwoSelected = null;
    this.cardList = [
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
    // this.cardSet = this.shuffleCards(this.cardList);
    this.cardSet = [...this.cardList, ...this.cardList]; // easier to test, no shuffle
    this.coinEl = new Label(`Coins: ${this.formatCoin(this.coin)}`);
    this.containerElm = document.querySelector('.container');
    this.displayElm = document.querySelector('.display');
    this.displayElm.append(this.coinEl.element);
    this.currentBoardElement = null;
  }

  startGame() {
    const { boardElement, cards } = this.createBoard(this.ROWS, this.COLUMNS, this.cardSet);

    cards.forEach(card => card.element.addEventListener('click', this.handleSelectCard.bind(this)));
    this.containerElm.appendChild(boardElement);
  }

  handleSelectCard(event) {
    const cardElement = event.target.parentNode;
    const imgElement = event.target;
    if (imgElement && imgElement.src.includes('back')) {
      if (
        !this.cardOneSelected ||
        !this.cardTwoSelected ||
        (this.cardOneSelected &&
          this.cardTwoSelected &&
          this.cardOneSelected.style.display === 'none' &&
          this.cardTwoSelected.style.display === 'none')
      ) {
        if (!this.cardOneSelected) {
          this.cardOneSelected = cardElement;

          this.revealCard(this.cardOneSelected);
        } else if (!this.cardTwoSelected && this !== this.cardOneSelected) {
          this.cardTwoSelected = cardElement;

          this.revealCard(this.cardTwoSelected);

          setTimeout(this.checkWin.bind(this), 1000);
        }
      }
    }
  }

  revealCard(cardElement) {
    const coords = cardElement.id.split('-');
    const imgElement = cardElement.children[0];
    const r = parseInt(coords[0]);
    const c = parseInt(coords[1]);

    const imageUrl = this.getSrc(this.cardSet[r * this.COLUMNS + c]);

    // gsap.to(cardElement, {
    //   scaleX: 0,
    //   duration: 0.3,
    // });
    // gsap.to(cardElement, {
    //   scaleX: 1,
    //   duration: 0.3,
    //   delay: 0.3,
    //   onComplete: () => {
    //     imgElement.src = imageUrl;
    //   },
    // });
    gsap.to(cardElement, {
      scaleX: 0,
      duration: 0.3,
      onComplete: () => {
        imgElement.src = imageUrl;
        gsap.to(cardElement, {
          scaleX: 1,
          duration: 0.3,
        });
      },
    });
  }

  checkWin() {
    const coordsOne = this.cardOneSelected.id.split('-');
    const coordsTwo = this.cardTwoSelected.id.split('-');
    const r1 = parseInt(coordsOne[0]);
    const c1 = parseInt(coordsOne[1]);
    const r2 = parseInt(coordsTwo[0]);
    const c2 = parseInt(coordsTwo[1]);
    if (
      this.cardSet[r1 * this.COLUMNS + c1] === this.cardSet[r2 * this.COLUMNS + c2] &&
      this.cardOneSelected.id !== this.cardTwoSelected.id
    ) {
      this.coin += 1000;
      this.matchPairs++;

      this.fadeCardsAnimation(this.cardOneSelected, this.cardTwoSelected);

      this.updateCoinCount();
    } else {
      this.coin -= 500;

      this.hideCardsAnimation(this.cardOneSelected, this.cardTwoSelected);

      this.updateCoinCount();
    }

    if (this.coin < 0) {
      alert('Game Over! You ran out of coins.');
      this.resetGame();
    }

    if (this.matchPairs === 10) {
      alert('Congratulations! You won!');
      this.resetGame();
    }

    this.cardOneSelected = null;
    this.cardTwoSelected = null;
  }

  updateCoinCount() {
    this.coinEl.element.textContent = `Coins: ${this.formatCoin(this.coin)}`;
  }

  resetGame() {
    window.location.reload();
  }

  getSrc(cardImg) {
    return `./assets/${cardImg}.jpg`;
  }

  formatCoin(num) {
    return Number(num).toLocaleString('en');
  }

  createBoard(rows, columns, cardSet) {
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
          x: offsetX,
          y: offsetY,
          delay: 0.15 * index,
          onStart: () => {
            card.element.style.zIndex = 'auto';
          },
        });
      }
    }
    this.currentBoardElement = boardElement;
    return { boardElement, cards };
  }

  removeBoardElement() {
    if (currentBoardElement && currentBoardElement.parentNode) {
      currentBoardElement.parentNode.removeChild(currentBoardElement);
    }
  }

  shuffleCards(cardList) {
    let cardSet = cardList.concat(cardList);

    for (let i = 0; i < cardSet.length; i++) {
      let j = Math.floor(Math.random() * cardSet.length);

      let temp = cardSet[i];
      cardSet[i] = cardSet[j];
      cardSet[j] = temp;
    }

    return cardSet;
  }
  fadeCardsAnimation(card1, card2) {
    gsap.to(card1, {
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 0.3,
      onComplete: () => {
        gsap.to(card1, {
          scaleX: 0,
          scaleY: 0,
          duration: 0.3,
          delay: 0.5,
          onComplete: () => {
            card1.style.display = 'none';
          },
        });
      },
    });
    gsap.to(card2, {
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 0.3,
      onComplete: () => {
        gsap.to(card2, {
          scaleX: 0,
          scaleY: 0,
          duration: 0.3,
          delay: 0.5,
          onComplete: () => {
            card2.style.display = 'none';
          },
        });
      },
    });
  }

  hideCardsAnimation(cardElement1, cardElement2) {
    const timeline = gsap.timeline();

    timeline
      .to([cardElement1, cardElement2], {
        scaleX: 0,
        duration: 0.3,
      })
      .to([cardElement1, cardElement2], {
        scaleX: 1,
        duration: 0.3,
        delay: 0.3,
        onStart: () => {
          cardElement1.children[0].src = this.getSrc('back');
          cardElement2.children[0].src = this.getSrc('back');
        },
      });
  }
}
