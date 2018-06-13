const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/bookLibrary';

const Book = require('./../models/Book');
const Author = require('./../models/Author');

mongoose.Promise = global.Promise;

module.exports = mongoose.connect(connectionString, () => {

});