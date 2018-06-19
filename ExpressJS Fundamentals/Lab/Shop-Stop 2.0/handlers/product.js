const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const shortid = require('shortid');
const Product = require('../models/Product');
const Category = require('../models/Category');

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

        Category.find()
          .then(categories => {
            let replacement = '<select class="input-field" name="category">';

            for (let category of categories) {
              replacement +=
                `<option value="${category._id}">${category.name}</option>`;
            }
            
            replacement += '</select>';

            let html = data.toString().replace('{categories}', replacement);
            res.writeHead(200, {
              'Content-Type': 'text/html'
            });
            res.write(html);
            res.end();
          }).catch(err => {
            console.log(err);
          });
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
        let categoryId = product.category;
        Product.create(product)
          .then((createdProduct) => {
            Category.findById(categoryId).then(category => {
              category.products.push(createdProduct._id);
              category.save();

              res.writeHead(302, {
                Location: '/'
              });
              res.end();
            }).catch(err => {
              console.log(err);
            });
          })
          .catch(err => {
            console.log(err);
          });
      });

      form.parse(req);
    }
  } else {
    return true;
  }
};
