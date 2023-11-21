import { Node } from './engine/Node.js';
import { Sprite } from './engine/Sprite.js';

export class Card extends Node {
  static HEIGHT = '128px';
  static WIDTH = '90px';

  constructor(id, imageSrc) {
    super();
    this.id = id;
    this.imageSrc = imageSrc;

    this._sprite = new Sprite('back');
    this.addChild(this._sprite);

    // this._cover = new Sprite('back');
    // this.addChild(this._cover);

    this._active = true;

    this._sprite.element.style.height = Card.HEIGHT;
    this._sprite.element.style.width = Card.WIDTH;
    this._sprite.element.id = `card-${id}`;
  }

  get active() {
    return this._active;
  }

  set active(value) {
    this._active = value;
    this._sprite.element.style.display = value ? 'block' : 'none';
  }

  show(value) {
    this.active = value;
  }
}
