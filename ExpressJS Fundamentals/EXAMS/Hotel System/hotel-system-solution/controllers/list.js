const Hotel = require('../models/Hotel');

async function getAllHotels (req, res) {
  let hotels = await Hotel.find().sort('-creationDate');
  res.locals.hotels = hotels;
  res.render('hotel/listAll');
}

module.exports.getAllHotels = getAllHotels;
