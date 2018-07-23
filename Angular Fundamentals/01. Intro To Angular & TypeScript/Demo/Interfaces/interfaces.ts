interface IPerson {
    name: string, 
    age: number
}

function solve(person: IPerson) {
    console.log(person.name);
}

solve({
    name: 'Ivan',
    age: 5
});
/*
  In this casewe pass in solve an object, which
  is from type IPerson (has the same properties)
*/

class Human implements IPerson {
    name: string;
    age: number;
}

solve(new Human());

class Person {
    name: string;
    age: number;
}

solve(new Person());
/*
  If the class does not implement IPerson, but has
  the needed properties, it still works.
*/