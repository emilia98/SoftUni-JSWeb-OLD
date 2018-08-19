const Category = require('../models/Category');
const Hotel = require('../models/Hotel');

async function getAddForm (req, res) {
  let categories = await Category.find();

  console.log(categories);
  res.locals.categories = categories;
  res.render('hotel/add');
}

async function addHotel (req, res) {
  let title = req.body.title;
  let description = req.body.description;
  let location = req.body.location;
  let categoryId = req.body.category;
  let imageUrl = req.body.imageUrl;

  let hasErrors = false;
  let errors = {};

  if (title.length === 0) {
    hasErrors = true;
    errors.title = true;
  }

  if (description.length === 0) {
    hasErrors = true;
    errors.description = true;
  }

  if (location.length === 0) {
    hasErrors = true;
    errors.location = true;
  }

  if (imageUrl.length === 0) {
    hasErrors = true;
    errors.imageUrl = true;
  }

  let category = await Category.findById(categoryId);
  if (!category) {
    hasErrors = true;
    errors.category = true;
  }

  if (hasErrors) {
    res.locals.hasErrors = hasErrors;
    res.locals.errors = errors;
    res.locals.data = req.body;

    let categories = await Category.find();
    res.locals.categories = categories;
    return res.render('hotel/add');
  }

  let hotel = await Hotel.create({
    title,
    description,
    categoryId,
    location,
    imageUrl,
    creationDate: Date.now(),
    creatorId: req.user._id
  });

  res.redirect('/');
}

module.exports.getAddForm = getAddForm;
module.exports.addHotel = addHotel;
