// Load all the handlers:
const homeHandler = require('./home');
const productsHandler = require('./product');
const categoryHandler = require('./category');
const userHandler = require('./user');

module.exports = {
  home: homeHandler,
  product: productsHandler,
  category: categoryHandler,
  user: userHandler
};
