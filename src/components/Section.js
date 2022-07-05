export class Section {
  constructor({ /*items,*/ renderer }, sectionSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  addItem(item) {
    this._section.append(item);
  }

<<<<<<< HEAD
  renderCards() {
    this._items.forEach(this._renderer);
=======
  renderCards(items) {
    items.forEach(item => {
      this._renderer(item);
    })
>>>>>>> develop
  }
}