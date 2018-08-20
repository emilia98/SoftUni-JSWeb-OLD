const Review = require('../models/Review');
const Hotel = require('../models/Hotel');

async function sendReview (req, res) {
  let redirectTo = req.headers.referer;
  let hotelId = req.body.hotelId;
  let text = req.body.review;
  let currentUser = req.user;

  let review;
  let hotel;

  try {
    hotel = await Hotel.findById(hotelId);
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while getting a hotel!';
    return res.render('errors/server-error');
  }

  if (!hotel) {
    res.locals.error = 'This hotel does not exist!';
    return res.render('errors/page-not-found');
  }

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

  if (text.length === 0) {
    res.locals.hasError = true;
    res.locals.error = 'The text should be at least one character long!';
    res.locals.hotel = reformatedHotel;
  }
  try {
    review = await Review.create({
      text: text,
      creationDate: Date.now(),
      creatorId: currentUser._id,
      hotelId: hotel._id
    });
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while creating new review!';
    return res.render('errors/server-error');
  }
  res.redirect(redirectTo);
}

async function getReviewToEdit (req, res) {
  let id = req.params.id;
  let referer = req.headers.referer;
  let review;

  try {
    review = await Review.findById(id);
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while getting a review!';
    return res.render('errors/server-error');
  }

  if (!review) {
    res.locals.error = 'This review does not exist!';
    return res.render('error/page-not-found')
  };

  res.locals.review = review;
  res.locals.referer = referer;
  res.render('review/edit');
}

async function editReview (req, res) {
  let redirectTo = req.body.referer;
  let text = req.body.text;
  let id = req.params.id;

  let review;

  try {
    review = await Review.findById(id);
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while getting a review!';
    return res.render('errors/server-error');
  }

  if (!review) {
    res.locals.error = 'This review does not exist!';
    return res.render('error/page-not-found');
  }

  if (text.length === 0) {
    res.locals.hasError = true;
    res.locals.error = 'The text should be at least one character long!';
    res.locals.review = review;
    res.locals.referer = redirectTo;
    return res.render('review/edit');
  }

  review.text = text;

  try {
    await review.save();
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while saving the edited review!';
    return res.render('errors/server-error');
  }
  res.redirect(redirectTo);
}

async function deleteReview (req, res) {
  let id = req.params.id;
  let referer = req.headers.referer;
  let review;

  try {
    review = await Review.findById(id);
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while getting a review!';
    return res.render('errors/server-error');
  }

  if (!review) {
    res.locals.error = 'This review does not exist!';
    return res.render('errors/page-not-found');
  }

  try {
    await review.remove();
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while deleting a review!';
    return res.render('errors/server-error');
  }

  res.redirect(referer);
}

module.exports.sendReview = sendReview;
module.exports.getReviewToEdit = getReviewToEdit;
module.exports.editReview = editReview;
module.exports.deleteReview = deleteReview;
