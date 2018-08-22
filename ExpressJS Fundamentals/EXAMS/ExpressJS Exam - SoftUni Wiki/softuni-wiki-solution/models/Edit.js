const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const editSchema = new mongoose.Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
  creationDate: {
    type: mongoose.SchemaTypes.Date,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  articleId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Article'
  }
});

module.exports = mongoose.model('Edit', editSchema);
