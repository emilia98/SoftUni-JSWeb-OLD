const Category = require('../models/Category');
const Hotel = require('../models/Hotel');

async function getAllHotels (req, res) {
  let hotels = await Hotel.find().sort('-creationDate');
  res.locals.hotels = hotels;
  res.render('hotel/listAll');
}

async function getHotelsByCategory (req, res) {
  let categoryTitle = req.params.title;
  
  let category;
  let hotels;

  try {
    category = await Category.findOne({title: categoryTitle});
  } catch (err) {
    console.log(err);
    res.locals.error = 'Error occurred while getting category!';
    return res.render('errors/server-error');
  }

  if (!category) {
    res.locals.error = 'This category does not exist!';
    return res.render('errors/page-not-found');
  }
  
  try {
    hotels = await Hotel.find({categoryId: category._id});
  } catch (err) {
    console.log(err);
    res.locals.error = 'Error occurred while getting hotels!';
    return res.render('errors/server-error');
  }

  res.locals.category = categoryTitle;
  res.locals.hotels = hotels;
  res.render('hotel/category-all');
}

module.exports.getAllHotels = getAllHotels;
module.exports.getHotelsByCategory = getHotelsByCategory;
