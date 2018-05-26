// FASTER solution
const fs = require('fs');
const server = require('http').createServer();
const path = require('path');

let filePath = path.normalize(path.join('./', __dirname, 'bigFile.txt'));

server.on('request', (req, res) => {
  const source = fs.createReadStream(filePath);

  source.on('data', (data) => {
    res.write(data);
  });

  source.on('end', () => res.end());
});

server.listen(5000);
