const fs = require('fs');
const path = require('path');

let filePath = path.normalize(path.join('./', __dirname, 'bigFile.txt'));
let file = fs.createWriteStream(filePath);

for (let i = 0; i < 25e4; i++) {
  file.write('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
}

file.end();
