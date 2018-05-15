const http = require('http');
const url = require('url');
const port = 3000;
const handlers = require('./handlers');
/* Note that we did not specified to search in "./handlers/index"? It will search for "index.js"
file by default.
const handlers = require('./handlers/index');
*/

http.createServer((req, res) => {
  // COULD CAUSE AN ERROR
  req.pathname = url.parse(req.url).pathname;
  for (let handler of handlers) {
    if (!handler(req, res)) {
      break;
    }
  }
}).listen(port);

console.log(`The server is listening on port ${port}...`);
