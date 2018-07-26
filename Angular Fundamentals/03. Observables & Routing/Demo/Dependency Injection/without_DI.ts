/*
  WITHOUT DEPENDENCY INJECTION:
  
  In this case, if we want to add an additional
  property/remove already existing one to the Engine class, we should
  rewrite all classes using it, because we
  create an instance of Engine class, that
  has exactly 2 properties and each one is 
  from given type.
*/
class Engine {
    constructor(
        public model :string,
        public type :string
    ) {}
}

class Car {
    private engine :Engine;

    constructor(
        public make :string,
        public model :string
    ) {
        this.engine = new Engine('W12', 'gasoline');
    }
}

let mercedes = new Car('Mercedes', '5500');
let audi = new Car('Audi', 'A8');
