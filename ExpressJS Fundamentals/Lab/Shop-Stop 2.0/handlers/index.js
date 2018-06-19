// Load all the handlers:
const homeHandler = require('./home');
const staticFilesHandler = require('./static-files');
const productsHandler = require('./product');
const categoryHandler = require('./category');

module.exports = [
  homeHandler,
  staticFilesHandler,
  productsHandler,
  categoryHandler
];
