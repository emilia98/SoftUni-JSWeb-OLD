const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
  Category.find()
    .then(categories => {
      res.render('product/add', {
        categories: categories
      });
    }).catch(err => {
      console.log(err);
    });
};

module.exports.addPost = (req, res) => {
  let product = req.body;
  product.image = '\\' + req.file.path;
  
  console.log(req.body);
  console.log(req.file);
  let categoryId = product.category;

  Product.create(product)
    .then((createdProduct) => {
      Category.findById(categoryId).then(category => {
        category.products.push(createdProduct._id);
        category.save();

        res.redirect('/');
      }).catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
};
