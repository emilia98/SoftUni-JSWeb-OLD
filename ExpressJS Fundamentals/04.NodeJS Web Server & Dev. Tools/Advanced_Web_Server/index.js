// Use build-in modules in NodeJS
const http = require('http');
const url = require('url');
const handlers = require('./handlers/loadAll');
const port = 1337;

http.createServer((req, res) => {
    let urlObj = url.parse(req.url);
    // let path = urlObj.pathname;
    req.path = urlObj.pathname;
    
    for(let index = 0; index < handlers.length; index++){
        let handler = handlers[index];
        let result = handler(req, res);

        if(!result){
            break;
        }
    }
}).listen(port);

console.log(`Server is listening to port ${port}...`);