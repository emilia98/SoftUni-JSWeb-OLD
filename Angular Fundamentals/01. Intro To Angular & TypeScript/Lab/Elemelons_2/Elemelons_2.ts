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

    parentToString(element):string {
        let result = [];
       
        result.push(`Element: ${element}`);
        result.push(`Sort: ${this.melonSort}`);
        result.push(`Element Index: ${this.elementIndex}`);
        return result.join('\n');
    }
}

class Watermelon extends Melon {
    public element: string;
    constructor(public weight: number, public sort: string) {
        super(weight, sort);
        this.element = 'Water';
    }

    toString():string {
        return this.parentToString(this.element);
    }
}


class Firemelon extends Melon {
    public element: string;
    constructor(public weight: number, public sort: string) {
        super(weight, sort);
        this.element = 'Fire';
    }

    toString():string {
        return this.parentToString(this.element);
    }
}

class Earthmelon extends Melon {
    public element: string;
    constructor(public weight: number, public sort: string) {
        super(weight, sort);
        this.element = 'Earth';
    }

    toString():string {
        return this.parentToString(this.element);
    }
}

class Airmelon extends Melon {
    public element: string;

    constructor(public weight: number, public sort: string) {
        super(weight, sort);
        this.element = 'Air';
    }

    toString():string {
        return this.parentToString(this.element);
    }
}

class Melolemonmelon extends Watermelon {
    private elements: Array<string> = [ 'Water', 'Fire', 'Earth', 'Airmelon'];
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
        return this.parentToString(this.element);
    }
}