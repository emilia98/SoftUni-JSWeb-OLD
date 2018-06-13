const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

let authorSchema = mongoose.Schema({
  name: {type: String, required: true},
  books: [{type: ObjectId}]
});

let Author = mongoose.model('Author', authorSchema);

module.exports = Author;
