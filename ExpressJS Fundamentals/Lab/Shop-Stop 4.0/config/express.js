const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

module.exports = (app, config) => {
  // Set up a view engine
  app.set('view engine', 'pug');
  app.set('views', path.join(config.rootPath, 'views'));

  // Parsing the form data
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(session({
    secret: 's3cr3t',
    saveUninitialized: false,
    resave: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.user = req.user;
    }
    next();
  });
  // Set "public" folder
  app.use((req, res, next) => {
    if (req.url.startsWith('/content')) {
      req.url = req.url.replace('/content', '');
    }

    next();
  }, express.static(path.normalize(
    path.join(config.rootPath, 'content'))));
};
