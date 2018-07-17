const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const multer = require('multer');
const single = multer().single();
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./passport');
require('../config/tokens');

const publicFiles = path.normalize(
  path.join(__dirname, '../public')
);

module.exports = (app, config) => {
  app.use('/public', express.static(publicFiles));

  app.use(logger('dev'));
  app.use(cookieParser());
  
  app.use(session({
    secret: 's3cr3t',
    saveUninitialized: false,
    resave: false
  })); 
  // console.log('passof');
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(single);
  
  // Set up the view engine
  app.engine('.hbs', hbs({
    extname: '.hbs',
    partialsDir: 'views/partials'
  }));
  app.set('view engine', '.hbs');

  
  const auth = require('../routes/auth');
  const user = require('../routes/user');
  const visited = require('../controllers/user/visited');
  const admin = require('../routes/admin');
  const explore = require('../routes/explore');
  const country = require('../routes/country');
  const search = require('../routes/search');
  const authMiddleware = require('../middlewares/authentication');


  app.use('/auth', auth);
  app.use('/user', user);
  app.use('/visited', authMiddleware.isAuthenticated, visited);
  app.use('/admin', admin);
  app.use('/country', country);
  app.use('/search', search);
  app.use('/explore', explore);

  app.get('/logout', function (req, res){
    req.session.destroy(function (err) {
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  });
};
