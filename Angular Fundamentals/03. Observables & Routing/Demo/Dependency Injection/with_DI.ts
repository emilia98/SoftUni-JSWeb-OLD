/*
   WITH DEPENDENCY INJECTION

   In this case, we do not need to use
   an instance of Engine class. Whatever
   changes we made of it, none of the
   classes with depend on it will need
   to be changed. All of these classes
   will have an access to the updates
   made to the class Engine.
*/
class Engine {
    constructor(
        public model :string,
        public type :string
    ) {}
}

class Car {
    constructor(
        public make :string,
        public model :string,
        private engine :Engine
    ) {}
}

let bigEngine = new Engine('V8', 'gasoline');
let smallEngine = new Engine('1.6', 'diesel');

let mercedes = new Car('Mercedes', '5500', bigEngine);
let otherMercedes = new Car('Mercedes', '1100', smallEngine);
let audi = new Car('Audi', 'A8', smallEngine);