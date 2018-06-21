const handlers = require('../handlers');
const multer = require('multer');

let upload = multer({dest: './content/images'}).single('image', 1);

module.exports = (app) => {
  app.get('/', handlers.home.index);

  app.get('/product/add', handlers.product.addGet);
  app.post('/product/add', upload, handlers.product.addPost);

  app.get('/category/add', handlers.category.addGet);
  app.post('/category/add', handlers.category.addPost);

  app.get('/category/:category/products', handlers.category.productByCategory);

  app.get('/product/delete/:id', handlers.product.deleteGet);
  app.post('/product/delete/:id', handlers.product.deletePost);

  app.get('/product/edit/:id', handlers.product.editGet);
  app.post('/product/edit/:id', upload, handlers.product.editPost);

  app.get('/product/buy/:id', handlers.product.buyGet);
};
