const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

let filePath = path.normalize(path.join('./', __dirname, '/'));

let readStream = fs.createReadStream(filePath + 'file.txt');
let writeStream = fs.createWriteStream(filePath + 'file.txt.gz');

let gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream);
