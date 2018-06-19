const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const Category = require('../models/Category');

module.exports = (req, res) => {
  if (req.pathname === '/category/add') {
    if (req.method === 'GET') {
      let filePath = path.normalize(
        path.join(__dirname, '../views/category/add.html')
      );

      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        res.write(data);
        res.end();
      });

      return;
    } else if (req.method === 'POST') {
      let queryData = '';

      req.on('data', (data) => {
        queryData += data;
      });

      req.on('end', () => {
        let category = qs.parse(queryData);

        Category.create(category).then(() => {
          res.writeHead(302, {
            Location: '/'
          });
          res.end();
          return;
        }).catch(err => {
          console.log(err);
        });
      });
    } 
  }
  return true;
};
