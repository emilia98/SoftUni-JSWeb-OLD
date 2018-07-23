import { Cat, Dog } from './export';

import Bunny from './export';
import Rabbit from './export';

let b = new Bunny();
let r = new Rabbit();

b.sayHello();
r.sayHello();

let cat = new Cat();
let dog = new Dog();

/*
  As we have default export, 
  we can give it whatever name we want
  (Only in this case we can import several times 
   the same part from a module)
*/