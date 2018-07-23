class List<T> {
    add (value:T) {
        console.log(value);
    }
}

let numbers = new List<number>();
// numbers.add('Ivan'); // err
numbers.add(5);
numbers.add(2.6);

let strings = new List<string>();
// strings.add(5); // err
strings.add('Ivan');

let anys = new List<any>();
anys.add('Ivan');
anys.add(5);
anys.add(true);
anys.add([]);
