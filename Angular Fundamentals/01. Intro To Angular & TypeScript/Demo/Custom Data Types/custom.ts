function solve(person: {name :string}) {
    console.log(person.name);
}

class Human {
    name: string;
    age: number;
}

let human  = new Human();

solve({ name: 'Ivan'});
solve(human);
// solve({name: 'Ivan', age: 5}); // error
