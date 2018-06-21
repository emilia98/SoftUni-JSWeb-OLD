const controllers = require('../controllers');
const multer = require('multer');
const auth = require('./auth');

let upload = multer({dest: './content/images'}).single('image', 1);

module.exports = (app) => {
  app.get('/', controllers.home.index);

  app.get('/product/add', auth.isAuthenticated, controllers.product.addGet);
  app.post('/product/add', auth.isAuthenticated, upload, controllers.product.addPost);

  app.get('/category/add', auth.isInRole('Admin'), controllers.category.addGet);
  app.post('/category/add', auth.isInRole('Admin'), controllers.category.addPost);

  app.get('/category/:category/products', controllers.category.productByCategory);

  app.get('/product/delete/:id', auth.isAuthenticated, controllers.product.deleteGet);
  app.post('/product/delete/:id', auth.isAuthenticated, controllers.product.deletePost);

  app.get('/product/edit/:id', auth.isAuthenticated, controllers.product.editGet);
  app.post('/product/edit/:id', auth.isAuthenticated, upload, controllers.product.editPost);

  app.get('/product/buy/:id', auth.isAuthenticated, controllers.product.buyGet);
  app.post('/product/buy/:id', auth.isAuthenticated, controllers.product.buyPost);

  app.get('/user/register', auth.isNotAuthenticated, controllers.user.registerGet);
  app.post('/user/register', auth.isNotAuthenticated, controllers.user.registerPost);

  app.get('/user/login', auth.isNotAuthenticated, controllers.user.loginGet);
  app.post('/user/login', auth.isNotAuthenticated, controllers.user.loginPost);

  app.post('/user/logout', auth.isAuthenticated, controllers.user.logout);
};
