import { Node } from './Node.js';

export class Label extends Node {
  constructor(textContent) {
    super();
    this.textContent = textContent;
    this.element = document.createElement('div');
    this.element.textContent = this.textContent;
  }

  setText(newText) {
    this.textContent = newText;
    if (this.element) {
      this.element.textContent = this.textContent;
    }
  }
}
