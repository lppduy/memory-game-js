import { Node } from './Node.js';

export class Sprite extends Node {
  constructor(nameCard) {
    super();
    this._src = this._getSrc(nameCard);
    this.element = document.createElement('img');
    this.element.src = this._src;
    this.element.classList.add('card');
  }

  get src() {
    return this._src;
  }
  set src(value) {
    return (this._src = value);
  }
  _getSrc(nameCard) {
    return `./assets/${nameCard.toString()}.jpg`;
  }
}
