const fs = require('fs');
const path = require('path');
const filePath = path.normalize(
  path.join(__dirname, './products.json')
);

module.exports.products = {};

function getProducts () {
  let isExisting = false;
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    isExisting = true;
  } catch (err) {
  }

  // If the products.json file does not exist, create it
  if (isExisting === false) {
    fs.writeFileSync(filePath, '[]');
    return JSON.parse('[]');
  }
  
  let allProducts = fs.readFileSync(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    return data;
  });
  
  /* 
     If our file is empty or is in incorrect format, we'll
     write/overwrite it with an empty array
  */
  try {
    allProducts = JSON.parse(allProducts);
  } catch (err) {
    fs.writeFileSync(filePath, '[]');
    allProducts = JSON.parse('[]');
  }
  return allProducts;
}

function saveProducts (products) {
  fs.writeFileSync(filePath, JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Product was sucessfully added!');
  });
}

module.exports.products.getAll = () => {
  let allProducts = getProducts();
  return allProducts;
};

module.exports.products.add = (product) => {
  let allProducts = getProducts();
  let lastProduct = allProducts[allProducts.length - 1];

  lastProduct === undefined ? product.id = 0 : product.id = lastProduct.id + 1;
  allProducts.push(product);
  saveProducts(allProducts);
};

module.exports.products.findByName = (name) => {
  let allProducts = getProducts();
  return allProducts.filter(p => p.name.toLowerCase().includes(name))
};
