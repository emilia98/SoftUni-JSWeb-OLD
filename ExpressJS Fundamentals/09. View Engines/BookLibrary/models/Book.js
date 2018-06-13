const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

let bookSchema = mongoose.Schema({
  title: {type: String, required: true},
  releaseYear: {type: Number, required: true},
  authors: [{type: ObjectId}],
  imageSrc: {type: String, required: true}
});

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;
