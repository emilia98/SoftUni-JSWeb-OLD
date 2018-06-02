const http = require('http');
const url = require('url');
const port = 8080;
const handlers = require('./handlers');

http.createServer((req, res) => {
    req.pathname = url.parse(req.url).pathname;
    // console.log(url.parse(req.url));
    //console.log(req.pathname);
    for(let handler of handlers) {
        // console.log(req);
        if(!handler(req, res)) {
            return;
        }
        /* let result = async function() {
            let r = await handler(req, res);
            return r;
        };*/
        // console.log(handler(req, res));
        // let func = () => handler(req, res);
         // console.log(func);
        /* console.log(handler(req, res));
        */
    }

    // notFoundError(req, res);
       
}).listen(port);

console.log(`The server is listening on port ${port}...`);
