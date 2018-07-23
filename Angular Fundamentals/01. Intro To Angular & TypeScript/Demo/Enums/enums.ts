/*
  Enums are sets of predefined values
*/
enum Color {
    Red, Green, Blue
};

let color: Color = Color.Blue;

if (color === Color.Blue) {
    console.log('match');
}

let someColor :Color;
someColor = Color.Red;
someColor = Color.Green;
// someColor = Color.Yellow; // error
