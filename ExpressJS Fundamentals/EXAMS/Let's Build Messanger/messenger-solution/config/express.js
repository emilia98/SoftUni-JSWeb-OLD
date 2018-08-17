const hbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const auth = require('../routes/auth');
const explore = require('../routes/explore');
const thread = require('../routes/thread');
const message = require('../routes/message');
const users = require('../routes/users');

const publicFolder = path.normalize(
  path.join(__dirname, '../', '/public')
);

module.exports = (app, config) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/public', express.static(publicFolder));

  app.use(cookieParser());
  app.use(session({
    secret: 'mY-sE44ioN',
    resave: false,
    saveUninitialized: false
  }));
  app.engine('.hbs', hbs({
    extname: '.hbs',
    partialsDir: 'views/partials',
    defaultLayout: 'main'
  }));
  app.set('view engine', '.hbs');

  app.use(passport.initialize());
  app.use(passport.session());

  /*
   Middleware  which attaches a user (if one exists) on response,
   so we could access nad use it in a template
  */
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.user = req.user;
    }
    next();
  });

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.use('/auth', auth);
  app.use('/explore', explore);
  app.use('/thread', thread);
  app.use('/message', message);
  app.use('/users', users);
};
