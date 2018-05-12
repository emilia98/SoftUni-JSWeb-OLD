const homeHandler = require('./home-handler.js');
const staticHandler = require('./static-file-handler.js');
const errorHandler = require('./error-handler.js');

module.exports = [homeHandler, staticHandler, errorHandler];