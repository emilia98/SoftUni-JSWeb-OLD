const cluster = require('cluster');
// cpus -> plural for CPU
const cpus = require('os').cpus().length;
const http = require('http');

if (cluster.isMaster) {
  for (let index = 1; index <= cpus; index++) {
    console.log(`Forking process on ${index}`);
    cluster.fork();
  }
} else {
  let server = http.createServer();

  server.on('request', (req, res) => {
    res.end('Hello');
  });
  server.listen(5000);
}
