const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/mongodbplayground';

const Tag = require('./../models/TagSchema');
const Image = require('./../models/ImageSchema');

mongoose.Promise = global.Promise;

module.exports = mongoose.connect(connectionString, () => {

});