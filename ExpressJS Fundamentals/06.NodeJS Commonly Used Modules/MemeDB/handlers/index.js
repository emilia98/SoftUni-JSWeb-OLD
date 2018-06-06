const homeHandler = require('./home');
const staticFileHandler = require('./static-files');
const addMemeHandler = require('./meme').addMeme;
const showDetailsHandler = require('./meme').showDetails;
const getAllMemesHandler = require('./meme').getAll;
const downloadFileHandler = require('./download');

module.exports = [
  homeHandler,
  staticFileHandler,
  addMemeHandler,
  showDetailsHandler,
  getAllMemesHandler,
  downloadFileHandler
];
