const http = require('http');
const url = require('url');
const port = 8080;
const handlers = require('./handlers');

http.createServer((req, res) => {
    req.pathname = url.parse(req.url).pathname;

    for(let handler of handlers) {
        if(!handler(req, res)) {
            break;
        }
    }
  /*
  console.log(req.url);

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<h1>Hello, MovieDB!</h1>');
  */
  // res.end();
}).listen(port);

console.log(`The server is listening on port ${port}...`);
