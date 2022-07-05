export class Section {
  constructor({ renderer }, sectionSelector) {
    this._renderer = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  addItem(item) {
    this._section.append(item);
  }

  addNewItem(item) {
    this._section.prepend(item);
  }

  renderCards(items) {
    items.forEach(item => {
      this._renderer(item);
    })
  }
}