const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  hashedPass: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    default: [ 'User' ]
  }]
});

userSchema.method({
  checkPassword: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.generateAdmin = () => {
  async function administrate () {
    let users = await User.find();

    if (users.length > 0) {
      return;
    }

    let salt = encryption.generateSalt();
    let hashedPassword = encryption.generateHashedPassword(salt, 'admin');

    await User.create({
      email: 'admin@admin.com',
      salt: salt,
      hashedPass: hashedPassword,
      name: 'admin',
      roles: [ 'Admin', 'User' ]
    });
  }

  administrate();
};
