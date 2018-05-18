const fs = require('fs');
const path = require('path');
const database = require('../config/database');
const qs = require('querystring');

module.exports = (req, res) => {
  /* ???
  req.pathname = req.pathname || url.parse(req.url).pathname;
  */
  // req.pathname = url.parse(req.url).pathname;

  if (req.pathname === '/' && req.method === 'GET') {
    let filePath = path.normalize(
      path.join(__dirname, '../views/home/index.html')
    );

    // let products = database.products.getAll();
    /*
    database.products.getAll()
    .then(dbData => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(404, {
            'Content-Type': 'text/plain'
          });
  
          res.write('Error 404: Not Found!');
          res.end();
          return;
        }
  
        let products = dbData;
        let content = '';
    
        for (let product of products) {
          content +=
          `<div class="product-card">
            <img class = "product-img" src="${product.image}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
           </div>`;
        }
    
        let html = data.toString().replace('{content}', content);
    
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        
        res.write(html);
        console.log('AAAAA');
        res.end();
      });

      //console.log("not ended");
      
    })
    .catch(err => {
      console.log(err);
      res.end();
    });
    */
    fs.readFile(filePath, 'utf8', (err, data) => {
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
      console.log(queryData);
      console.log(queryData.query);
      let products = database.products.getAll();
      
      let content = '';
  
      for (let product of products) {
        content +=
        `<div class="product-card">
          <img class = "product-img" src="${product.image}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
         </div>`;
      }
  
      let html = data.toString().replace('{content}', content);
  
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      
      res.write(html);
      res.end();
    }); 
    
  } else {
    return true;
  }
};
