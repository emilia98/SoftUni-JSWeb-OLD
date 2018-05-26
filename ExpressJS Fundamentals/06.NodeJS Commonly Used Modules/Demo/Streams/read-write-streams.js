// HTTP response is a writable stream
const server = require('http').createServer();
const fs = require('fs');
const path = require('path');
const port = 5000;

let filePath = path.normalize(path.join('./', __dirname, 'file.txt'));

server.on('request', (req, res) => {
  const src = fs.createReadStream(filePath);
  src.on('data', data => res.write(data));
  src.on('end', () => res.end());
});

server.listen(port);

console.log(`Server listening on port ${port}...`);
