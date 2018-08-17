const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  username: {
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
  name: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    required: true
  }],
  blockedUsers: [{
    type: mongoose.SchemaTypes.ObjectId,
    default: []
  }],
  threads: [{
    type: mongoose.SchemaTypes.ObjectId,
    default: []
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
    let hashedPassword = encryption.generateHashedPassword(salt, 'admin1234');

    let admin = await User.create({
      username: 'admin',
      salt: salt,
      hashedPass: hashedPassword,
      name: 'admin',
      roles: [ 'Admin', 'User' ]
    });

    console.log(admin);
  }

  administrate();
};
