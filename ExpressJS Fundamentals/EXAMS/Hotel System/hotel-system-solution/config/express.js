const hbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const auth = require('../routes/auth');
const adminCategories = require('../routes/admin/category');
const home = require('../routes/home');
const addHotel = require('../routes/hotel/add');
const list = require('../routes/hotel/list');
const hotel = require('../routes/hotel/details');

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
    let currentUser = req.user;

    if (currentUser) {
      res.locals.user = currentUser;

      let currentUserRoles = currentUser.roles;
      let isAdmin = currentUserRoles.indexOf('Admin') > -1;
      res.locals.isAdmin = isAdmin;
    }
    next();
  });

  app.use('/', home);
  app.use('/auth', auth);
  app.use('/admin/category', adminCategories);
  app.use('/add', addHotel);
  app.use('/list', list);
  app.use('/hotel', hotel);
};
