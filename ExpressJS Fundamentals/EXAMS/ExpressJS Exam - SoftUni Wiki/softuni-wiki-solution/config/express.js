const hbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const isAdmin = require('../middlewares/admin').isAdmin;
const isAuth = require('../middlewares/auth').isAuth;
const isNotAuth = require('../middlewares/isNotAuth').isAnonymous;

const Article = require('../models/Article');

const publicFolder = path.normalize(
  path.join(__dirname, '../', '/public')
);

const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const articleController = require('../controllers/article');
const searchController = require('../controllers/search');

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
  app.use(async (req, res, next) => {
    let currentUser = req.user;

    let article;
      let latestArticleId;

      try {
        article = await Article.find().sort('-creationDate').limit(1);
        latestArticleId = article[0]._id;
      } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting the latest article!';
        return res.render('errors/server-error');
      }

      if (!article) {
        latestArticleId = null;
      }
      res.locals.latestArticleId = latestArticleId;
      
    if (currentUser) {
      res.locals.user = currentUser;

      let currentUserRoles = currentUser.roles;
      let isAdmin = currentUserRoles.indexOf('Admin') > -1;
      res.locals.isAdmin = isAdmin;
      res.locals.name = currentUser.name;
    }
    next();
  });

  app.get('/', (req, res) => homeController.getHome(req, res));

  app.get('/articles', (req, res) => articleController.getAllArticles(req, res));
  app.get('/register', isNotAuth, (req, res) => authController.registerGet(req, res));
  app.post('/register', isNotAuth, (req, res) => authController.register(req, res));

  app.get('/login', isNotAuth, (req, res) => authController.loginGet(req, res));
  app.post('/login', isNotAuth, (req, res) => authController.login(req, res));

  app.get('/logout', isAuth, (req, res) => authController.logout(req, res))

  app.get('/article/create', isAuth, (req, res) => articleController.getCreateForm(req, res));
  app.post('/article/create', isAuth, (req, res) => articleController.createArticle(req, res));

  app.get('/article/details/:id', (req, res) => articleController.showArticleDetails(req, res));

  app.get('/article/edit/:id', isAuth, (req, res) => articleController.showArticleToEdit(req, res));
  app.post('/article/edit/:id', isAuth, (req, res) => articleController.editArticle(req, res));

  app.get('/article/lock/:id', isAdmin, (req, res) => articleController.lockArticle(req, res));

  app.get('/article/history/:id', isAuth, (req, res) => articleController.showArticleHistory(req, res));
  app.get('/article/review/edit/:id', isAuth, (req, res) => articleController.showEditReview(req, res));

  app.get('/search', (req, res) => searchController.searchArticles(req, res));
};
