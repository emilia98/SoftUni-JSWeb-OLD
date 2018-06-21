const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
  res.render('category/add');
};

module.exports.addPost = (req, res) => {
  let category = req.body;
  category.creator = req.user._id;
  Category.create(category).then(category => {
    res.redirect('/');
  }).catch(err => {
    console.log(err);
  });
};

module.exports.productByCategory = (req, res) => {
  let categoryToShow = req.params.category;

  Category.findOne({name: categoryToShow})
    .populate('products')
    .then(category => {
      if (!category) {
        res.sendStatus(404);
        return;
      }

      res.render('category/showProducts', {
        category: category
      });
    }).catch(err => {
      console.log(err);
    });
};
