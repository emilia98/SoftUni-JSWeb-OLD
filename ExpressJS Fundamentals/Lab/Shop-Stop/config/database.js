let productsAvailable = [];
let count = 0;

module.exports.products = {};

module.exports.products.getAll = () => {
  return productsAvailable;
};

module.exports.products.add = (product) => {
  product.id = ++count;
  productsAvailable.push(product);
};

module.exports.products.findByName = (name) => {
  let productsFound = [];
  for (let product of productsAvailable) {
    if (product.name.toLowerCase().includes(name)) {
      productsFound.push(product);
    }
  }
  return productsFound;
};
