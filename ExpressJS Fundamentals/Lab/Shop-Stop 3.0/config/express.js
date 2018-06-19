const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = (app, config) => {
  // Set up a view engine
  app.set('view engine', 'pug');
  app.set('views', path.join(config.rootPath, 'views'));

  // Parsing the form data
  app.use(bodyParser.urlencoded({ extended: true }));

  // Set "public" folder
  app.use((req, res, next) => {
    if (req.url.startsWith('/content')) {
      req.url = req.url.replace('/content', '');
    }

    next();
  }, express.static(path.normalize(
    path.join(config.rootPath, 'content'))));
};
