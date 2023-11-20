export class Node {
  constructor() {
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;
    this.element = this._createElement();
    this.children = [];
  }

  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this.element.style.left = this._x + 'px';
  }

  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this.element.style.top = this._y + 'px';
  }

  _createElement() {
    let element = document.createElement('div');
    element.style.position = 'absolute';
    return element;
  }

  addChild(node) {
    this.children.push(node);
    this.element.appendChild(node.element);
  }

  removeChild(node) {
    const index = this.children.indexOf(node);
    if (index > -1) {
      this.children.splice(index, 1);
      this.element.removeChild(node.element);
    }
  }
}
