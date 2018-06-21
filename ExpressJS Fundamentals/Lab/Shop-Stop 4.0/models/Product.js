const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: {type: String, default: ''},
  price: {
    type: Number,
    min: 0,
    max: Number.MAX_VALUE,
    default: 0
  },
  image: {type: String, required: true},
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyer: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;
