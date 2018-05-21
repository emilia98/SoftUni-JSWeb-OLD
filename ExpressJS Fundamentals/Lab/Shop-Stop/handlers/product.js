const fs = require('fs');
const path = require('path');
const database = require('../config/database');
const multiparty = require('multiparty');
const shortid = require('shortid');

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
      let form = new multiparty.Form();
      let product = {};
      
      form.on('part', (part) => {
        // If this is a file <-> in this case an image
        if (part.filename) {
          let dataString = '';

          part.setEncoding('binary');
          part.on('data', (data) => {
            dataString += data;
          });

          part.on('end', () => {
            /* Uncomment, if you want to generate an unique id 
               for each photo */
            // let fileName = shortid.generate();
            let fileName = '';
            let filePath = path.normalize(
              path.join('./content/images', fileName + part.filename)
            );

            product.image = filePath;

            // Copy the file from the current destination folder to the content/images
            fs.writeFile(
              `${filePath}`, dataString,
              {encoding: 'ascii'}, (err) => {
                if (err) {
                  console.log(err);
                }
              });
          });
        } 
        // If this is not a file
        else {
          part.setEncoding('utf-8');
          let field = '';

          // Get the value from the input field
          part.on('data', (data) => {
            field += data;
          });

          // Add to product object a key (part.name) and a value (the value of field)
          part.on('end', () => {
            product[part.name] = field;
          });
        }
      });

      /*
        After processing all the data from the input fields,
        add this product and then redirect to home
      */
      form.on('close', () => {
        database.products.add(product);
        res.writeHead(302, {
          Location: '/'
        });
        res.end();
      });
      
      form.parse(req);
    }
  } else {
    return true;
  }
};
