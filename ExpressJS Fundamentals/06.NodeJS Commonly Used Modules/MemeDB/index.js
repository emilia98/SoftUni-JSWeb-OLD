const http = require('http');
const url = require('url');
const handlers = require('./handlers/index');
const port = 3000;

http.createServer((req, res) => {
  let path = url.parse(req.url).path;

  req.pathname = path;

  for (let handler of handlers) {
    if (!handler(req, res)) {
      break;
    }
  }
}).listen(port);

console.log(`The server is listening on port ${port}...`);