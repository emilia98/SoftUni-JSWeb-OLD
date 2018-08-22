const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  edits: [{
    type: mongoose.SchemaTypes.ObjectId,
    default: [],
    ref: 'Edit'
  }],
  creationDate: {
    type: mongoose.SchemaTypes.Date,
    required: true
  }
});

module.exports = mongoose.model('Article', articleSchema);
