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

    parentToString (element) {
      let result = [];
      result.push(`Element: ${element}`);
      result.push(`Sort: ${this.melonSort}`);
      result.push(`Element Index: ${this.elementIndex}`);
      return result.join('\n');
    }
  }

  class Watermelon extends Melon {
    constructor (weight, sort) {
      super(weight, sort);
      this.weight = weight;
      this.sort = sort;
      this.element = 'Water';
    }
    toString () {
      return this.parentToString(this.element);
    }
  }

  class Firemelon extends Melon {
    constructor (weight, sort) {
      super(weight, sort);
      this.weight = weight;
      this.sort = sort;
      this.element = 'Fire';
    }
    toString () {
      return this.parentToString(this.element);
    }
  }

  class Earthmelon extends Melon {
    constructor (weight, sort) {
      super(weight, sort);
      this.weight = weight;
      this.sort = sort;
      this.element = 'Earth';
    }
    toString () {
      return this.parentToString(this.element);
    }
  }

  class Airmelon extends Melon {
    constructor (weight, sort) {
      super(weight, sort);
      this.weight = weight;
      this.sort = sort;
      this.element = 'Air';
    }
    toString () {
      return this.parentToString(this.element);
    }
  }

  class Melolemonmelon extends Watermelon {
    constructor (weight, sort) {
      super(weight, sort);
      this.elements = ['Water', 'Fire', 'Earth', 'Airmelon'];
      this.element = null;
      this.element = this.elements.shift();
      this.elements.push(this.element);
    }
    morph () {
      this.element = this.elements.shift();
      this.elements.push(this.element);
    }
    toString () {
      return this.parentToString(this.element);
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
