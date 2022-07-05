export class Section {
  constructor({ /*items,*/ renderer }, sectionSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  addItem(item) {
    this._section.append(item);
  }

  renderCards(items) {
    items.forEach(item => {
      this._renderer(item);
    })
  }
}