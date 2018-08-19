const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
