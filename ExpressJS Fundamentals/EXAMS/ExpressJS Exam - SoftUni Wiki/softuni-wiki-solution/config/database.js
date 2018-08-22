const mongoose = require('mongoose');
const User = require('../models/User');
mongoose.Promise = global.Promise;

module.exports = (config) => {
  mongoose.connect(config.connectionString, { useNewUrlParser: true });
  let database = mongoose.connect;

  if (database.readyState === 0) {
    throw new Error('Error connecting to database!');
  }

  User.generateAdmin();
  console.log('Connected to database...');
};
