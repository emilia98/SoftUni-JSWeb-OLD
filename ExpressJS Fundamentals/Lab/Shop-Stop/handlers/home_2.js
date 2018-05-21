const fs = require('fs');
const path = require('path');
const database = require('../config/database');
const qs = require('querystring');
const url = require('url');

module.exports = (req, res) => {
  /* ???
  req.pathname = req.pathname || url.parse(req.url).pathname;
  */
  // req.pathname = url.parse(req.url).pathname;

  if (req.pathname === '/' && req.method === 'GET') {
    let filePath = path.normalize(
      path.join(__dirname, '../views/home/index.html')
    );

    /*
    fs.readFileSync(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });

        res.write('Error 404: Not Found!');
        res.end();
        return;
      }

      let queryData = qs.parse(url.parse(req.url).query);
      let filteringString = queryData.query;
      /* GET THE PRODUCTS FROM THE DATABASE */
      let products = database.products.getAll();
      let content = '';
      // CASE-INSENSITIVE SEARCHING
      if (filteringString) {
        filteringString = filteringString.toLowerCase();
        products = database.products.findByName(filteringString);
        /*
        products = products.filter(p => {
          let productName = p.name.toLowerCase();
          return productName.includes(filteringString);
        });
        */
      }

      for (let product of products) {
        content +=
        `<div class="product-card">
          <img class = "product-img" src="${product.image}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
         </div>`;
      }
      /* ACTS LIKE PRIMITIVE TEMPLATING ENGINE */
      let html = data.toString().replace('{content}', content);
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(html);
      res.end();
    });
    */
  } else {
    return true;
  }
};