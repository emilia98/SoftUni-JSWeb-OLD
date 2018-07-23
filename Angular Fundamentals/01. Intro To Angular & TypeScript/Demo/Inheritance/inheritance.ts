abstract class Animal {
    constructor(public name: string) {}

    sayHello() :void {
        console.log(`Hello from ${this.name}!`);
    }
}

class Cat  extends Animal {
    meow() :void {
        console.log('Meow!');
    }
}

class Dog extends Animal {
    bark() :void {
        console.log('Bark!');
    }
}

// let animal = new Animal(); // error 
// let cat = new Cat(); // error

let cat = new Cat('Pesho');
cat.sayHello();
cat.meow();

let dog = new Dog('Sharo');
dog.sayHello();
dog.bark();
