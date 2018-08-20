const Category = require('../models/Category');
const Hotel = require('../models/Hotel');

async function getAllCategories (req, res) {
  let categories = await Category.find();
  res.locals.categories = categories;
  res.render('category/list-all');
}

module.exports.getAllCategories = getAllCategories;
