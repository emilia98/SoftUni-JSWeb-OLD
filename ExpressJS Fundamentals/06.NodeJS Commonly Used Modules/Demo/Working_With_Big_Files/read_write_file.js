// SLOWER solution
const fs = require('fs');
const server = require('http').createServer();
const path = require('path');

let filePath = path.normalize(path.join('./', __dirname, 'bigFile.txt'));

server.on('request', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
      return;
    }
    res.end(data);
  });
});

server.listen(5000);
