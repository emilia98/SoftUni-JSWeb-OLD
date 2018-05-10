let fs = require('fs');

let text = fs.readFileSync("package.json", "utf8");
let config = JSON.parse(text);

console.log("text");
console.log(config.name);

/* Blocks the execution of the program 
(if we use without "sync", the config will be undefined, 
because reading the file doesn't block the execution)
*/