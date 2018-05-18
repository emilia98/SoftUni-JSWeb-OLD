const fs = require('fs');
const path = require('path');

let productsAvailable = [];
const filePath = path.normalize(
  path.join(__dirname, './products.json')
);
// let count = 0;

module.exports.products = {};

module.exports.products.getAll = () => {
  // return new Promise(
  
  /* fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('-'.repeat(20));
    productsAvailable = JSON.parse(data);
  });
  return productsAvailable;
  */
  /*const getData = (fileName, type) => {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, type, (err, data) => {
        // console.log('hey');
        // console.log(data);
        return err ? reject(err) : resolve(data);
      }
      );
    }
    );
  };

  return getData(filePath, 'utf8')
    .then(data => {
      return JSON.parse(data);
    })
    .catch(error => {
      console.log('Error: ', error);
      return error;
    });*/
};

module.exports.products.add = (product) => {
  // product.id = ++count;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let allProducts = JSON.parse(data.toString());
    let lastProduct = allProducts[allProducts.length - 1];
    product.id = lastProduct.id + 1;
    allProducts.push(product);
    
    /*
    productsAvailable = JSON.parse(data.toString());

    let lastProduct = productsAvailable[productsAvailable.length - 1];
    product.id = lastProduct.id + 1;
    productsAvailable.push(product);
    */

    fs.writeFile(filePath, JSON.stringify(allProducts), (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Product was sucessfully added!');
    });
  });
};

module.exports.products.findByName = (name) => {
  let productFound = null;
  for (let product of productsAvailable) {
    if (product.name === name) {
      return product;
    }
  }
  return productFound;
};