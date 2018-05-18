const fs = require('fs');
// const url = require('url');
const path = require('path');
const database = require('../config/database');
const qs = require('querystring');

module.exports = (req, res) => {
  if (req.pathname === '/product/add') {
    if (req.method === 'GET') {
      let filePath = path.normalize(
        path.join(__dirname, '../views/products/add.html'));
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(404, {
            'Content-Type': 'text/html'
          });
          res.write('<h1>The resource is missing!</h1>');
          res.end();
        }
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
      });
    } else if (req.method === 'POST') {
      let dataString = '';
      let body = [];
      req.on('data', (data) => {
        dataString += data;
        body.push(data);
      });

      req.on('end', () => {
        let product = qs.parse(dataString);
        database.products.add(product);

        res.writeHead(302, {
          Location: '/'
        });

        res.end();
        // body = Buffer.concat(body).toString();
        // console.log(body);
      });
    }
  } else {
    return true;
  }
};
