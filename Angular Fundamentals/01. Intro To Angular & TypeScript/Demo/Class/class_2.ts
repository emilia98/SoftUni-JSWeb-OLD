class Cat {
    constructor(private name:string, public age: number | string) {
    }
}

// Both below works correctly, because the age could be either a number or a string
let cat: Cat = new Cat('Pesho', 4);
let anotherCat: Cat = new Cat('Tosho', '5'); 
// cat = 5; // error