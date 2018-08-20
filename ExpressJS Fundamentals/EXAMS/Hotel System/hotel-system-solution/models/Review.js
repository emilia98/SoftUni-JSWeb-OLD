const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  creationDate: {
    type: mongoose.SchemaTypes.Date,
    required: true
  },
  creatorId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
  hotelId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Hotel'
  }
});

module.exports = mongoose.model('Review', reviewSchema);
