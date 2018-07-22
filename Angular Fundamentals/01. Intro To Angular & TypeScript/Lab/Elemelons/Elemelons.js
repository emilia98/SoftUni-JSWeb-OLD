function solve () {
  class Melon {
    constructor (weight, sort) {
      if (new.target === Melon) {
        throw new TypeError('Abstract class cannot be instantiated directly');
      }

      this.weight = weight;
      this.melonSort = sort;
      this._elementIndex = this.weight * this.melonSort.length;
    }

    get elementIndex () {
      return this._elementIndex;
    }

    toString () {
      let result = [];
      let elementName = this.constructor.name;
      result.push(`Element: ${elementName.substring(0, elementName.length - 5)}`);
      result.push(`Sort: ${this.melonSort}`);
      result.push(`Element Index: ${this.elementIndex}`);
      return result.join('\n');
    }
  }

  class Watermelon extends Melon {}

  class Firemelon extends Melon {}

  class Earthmelon extends Melon {}

  class Airmelon extends Melon {}

  class Melolemonmelon extends Watermelon {
    constructor (weight, sort) {
      super(weight, sort);
      this.elements = ['Water', 'Fire', 'Earth', 'Air'];
      this.element = null;
      this.element = this.elements.shift();
      this.elements.push(this.element);
    }

    morph () {
      this.element = this.elements.shift();
      this.elements.push(this.element);
    }

    toString () {
      let result = [];
      result.push(`Element: ${this.element}`);
      result.push(`Sort: ${this.melonSort}`);
      result.push(`Element Index: ${this.elementIndex}`);
      return result.join('\n');
    }
  }

  return {
    Melon,
    Watermelon,
    Firemelon,
    Earthmelon,
    Airmelon,
    Melolemonmelon
  };
}
