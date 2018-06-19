const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
  res.render('category/add');
};

module.exports.addPost = (req, res) => {
  let category = req.body;
  Category.create(category).then(category => {
    res.redirect('/');
  }).catch(err => {
    console.log(err);
  });
};
