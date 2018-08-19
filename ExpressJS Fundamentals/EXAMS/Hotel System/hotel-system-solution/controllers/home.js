const Hotel = require('../models/Hotel');

async function getLatestHotels (req, res) {
  let hotels = await Hotel.find().sort('-creationDate').limit(20);
  res.locals.hotels = hotels;
  res.render('index');
}

module.exports.getLatestHotels = getLatestHotels;
