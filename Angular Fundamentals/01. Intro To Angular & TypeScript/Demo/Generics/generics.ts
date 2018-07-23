/*
  Generics is like a pattern, which could be used
  with different types of data in the same way
*/
function solve<T> (arg: T) {
    console.log(arg);
}

solve<number>(5);
// solve<number>('5'); // error
solve<string>('Ivan');