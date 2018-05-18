// Load all the handlers:
const homeHandler = require('./home');
const staticFilesHandler = require('./static-files');
const productsHandler = require('./product');

module.exports = [homeHandler, staticFilesHandler, productsHandler];
