const Hotel = require('../models/Hotel');
const Category = require('../models/Category');
const Review = require('../models/Review');

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

  let reviews;

  try {
    reviews = await Review.find({hotelId: hotel._id}).populate('creatorId');
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while getting reviews!';
    return res.render('errors/server-error');
  }

  let formatedReviews = [];

  for (let review of reviews) {
    formatedReviews.push({
      username: review.creatorId.username,
      text: review.text,
      creationDate: review.creationDate.toLocaleString(),
      id: review._id
    });
  }

  res.locals.reviews = formatedReviews;
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

async function getHotelToEdit (req, res) {
  let id = req.params.id;
  let hotel;
  let categories;

  try {
    hotel = await Hotel.findById(id).populate('categoryId');
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while getting hotels!';
    return res.render('errors/server-error');
  }

  if (!hotel) {
    res.locals.error = 'This hotel does not exist!';
    return res.render('errors/page-not-found');
  }

  try {
    categories = await Category.find();
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while getting categories!';
    return res.render('errors/server-error');
  }

  console.log(hotel);
  res.locals.data = hotel;
  res.locals.categories = categories;
  res.locals.selectedCategory = hotel.categoryId;
  res.render('hotel/edit');
}

async function editHotel (req, res) {
  let id = req.params.id;
  let hotel;

  try {
    hotel = await Hotel.findById(id).populate('categoryId');
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while getting hotels!';
    return res.render('errors/server-error');
  }

  if (!hotel) {
    res.locals.error = 'This hotel does not exist!';
    return res.render('errors/page-not-found');
  }

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

  hotel.title = title;
  hotel.description = description;
  hotel.categoryId = categoryId;
  hotel.location = location;
  hotel.imageUrl = imageUrl;

  await hotel.save();
  res.redirect('/');
}

async function deleteHotel (req, res) {
  let id = req.params.id;
  let hotel;

  try {
    hotel = await Hotel.findById(id);
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while getting a hotel!';
    return res.render('errors/server-error');
  }

  if (!hotel) {
    res.locals.error = 'This hotel does not exist!';
    return res.render('errors/page-not-found');
  }

  try {
    await hotel.remove();
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while deleting a hotel!';
    return res.render('errors/server-error');
  }
  
  res.redirect('/list');
}

module.exports.showDetails = showDetails;
module.exports.likeHotel = likeHotel;
module.exports.getHotelToEdit = getHotelToEdit;
module.exports.editHotel = editHotel;
module.exports.deleteHotel = deleteHotel;
