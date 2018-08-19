const Hotel = require('../models/Hotel');

async function showDetails (req, res) {
  let currentUser = req.user;
  let id = req.params.id;
  let title = req.params.title;
  let hotel = await Hotel.findOne({_id: id, title: title}).populate('categoryId').populate('creatorId');

  if (!hotel) {
    res.locals.error = 'This hotel does not exist!';
    return res.render('errors/page-not-found');
  }

  hotel.views += 1;
  await hotel.save();

  let isLiked = false;
  if (currentUser) {
    let indexInLikesList = hotel.likes.indexOf(currentUser._id);

    if (indexInLikesList > -1) {
      isLiked = true;
    }
  }

  let reformatedHotel = {
    description: hotel.description,
    title: hotel.title,
    category: hotel.categoryId.title,
    creator: hotel.creatorId.username,
    views: hotel.views,
    location: hotel.location,
    imageUrl: hotel.imageUrl,
    isLiked,
    id: hotel._id,
    totalLikes: hotel.likes.length
  };

  res.locals.hotel = reformatedHotel;
  res.render('hotel/details');
}

async function likeHotel (req, res) {
  let currentUser = req.user;
  let referer = req.headers.referer;
  let id = req.params.id;
  let hotel = await Hotel.findById(id);

  if (!hotel) {
    res.locals.error = 'This hotel does not exist!';
    return res.render('errors/page-not-found');
  }

  let indexInLikesList = hotel.likes.indexOf(currentUser._id);

  if (indexInLikesList === -1) {
    hotel.likes.push(currentUser._id);
  } else {
    hotel.likes.splice(indexInLikesList, 1);
  }

  await hotel.save();
  res.redirect(referer);
}

module.exports.showDetails = showDetails;
module.exports.likeHotel = likeHotel;
