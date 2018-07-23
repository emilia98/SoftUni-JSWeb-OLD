export class Cat {}

export class Dog {}

export default class Bunny {
  sayHello() {
    console.log('Hello from Bunny')
  }
}

/*
  Using default keyword is used when we want
  to import a part of module, without any need
  of using curly brackets.

  We can have only one default export per module
*/