let myVar: string = '5';
// myVar = 5; // error

let anotherVar: any = '5';
anotherVar = 5; // OK

let someArr: number[] = [5, 6];
// someArr = [5, '6']; // error

let anotherArr: Array<Number> = [5, 6];
// anotherArr = [5, '6']; // error+

let thirdArr: Array<any> = ['5', 6]; // OK