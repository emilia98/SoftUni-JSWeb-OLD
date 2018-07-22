abstract class Melon {
    public weight: number;
    public melonSort: string;
    private _elementIndex: number;

    constructor(weight: number, sort: string) {
        this.weight = weight;
        this.melonSort = sort;
        this._elementIndex = this.weight * this.melonSort.length;
    }

    get elementIndex() :Number {
        return this._elementIndex;
    }

    toString() {
        let result = [];
        let elementName = this.constructor.name;
        
        result.push(`Element: ${elementName.substring(0, elementName.length - 5)}`);
        result.push(`Sort: ${this.melonSort}`);
        result.push(`Element Index: ${this.elementIndex}`);
        return result.join('\n');
    }
}

class Watermelon extends Melon {
}

class Firemelon extends Melon {
}

class Earthmelon extends Melon {
}

class Airmelon extends Melon {
}

class Melolemonmelon extends Watermelon {
    private elements: Array<string> = [ 'Water', 'Fire', 'Earth', 'Air'];
    public element: string = null;
    
    constructor(weight: number, sort: string) {
        super(weight, sort);
        this.element = this.elements.shift();
        this.elements.push(this.element);
    }

    morph() {
        this.element = this.elements.shift();
        this.elements.push(this.element);
    }

    toString():string {
        let result = [];
        
        result.push(`Element: ${this.element}`);
        result.push(`Sort: ${this.melonSort}`);
        result.push(`Element Index: ${this.elementIndex}`);
        return result.join('\n');
    }
}

let watermelon : Watermelon = new Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());