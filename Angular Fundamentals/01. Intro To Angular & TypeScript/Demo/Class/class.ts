class Cat {
    private name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// let cat = new Cat(); // error -> 2 missing arguments
// let cat = new Cat('Ivan', '5'); // error -> 2-nd argument should be a number
let cat = new Cat('Ivan', 5);
// cat.name; // does not exist (it's private)
console.log(cat.age);