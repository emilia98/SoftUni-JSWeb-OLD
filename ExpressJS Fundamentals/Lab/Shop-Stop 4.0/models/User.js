const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
// const propertyIsRequired = '{0} is required.';
const propertyIsRequired = function (property) {
  return `${property} is required`;
};

const userSchema = mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: propertyIsRequired('User'),
    unique: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: propertyIsRequired('Password'),
  },
  salt: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  firstName: {
    type: mongoose.Schema.Types.String,
    required: propertyIsRequired('First Name')
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: propertyIsRequired('Last Name')
  },
  age: {
    type: mongoose.Schema.Types.Number,
    min: [0, 'Age must be between 0 and 120'],
    max: [120, 'Age must be between 0 and 120']
  },
  gender: {
    type: mongoose.Schema.Types.String,
    enum: {
      values: ['Male', 'Female'],
      message: 'Gender should be either "Male" or "Female".'
    }
  },
  roles: [{
    type: mongoose.Schema.Types.String
  }],
  boughtProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

userSchema.method({
  authenticate: function (enteredPass) {
    let hashedPassword = encryption.generateHashedPassword(this.salt, enteredPass);

    if (hashedPassword === this.password) {
      return true;
    }

    return false;
  }
});

const User = mongoose.model('User', userSchema);

module.exports.seedAdminUser = () => {
  User.find({username: 'admin'}).then(users => {
    if (users.length === 0) {
      let salt = encryption.generateSalt();
      let hashedPassword = encryption.generateHashedPassword(salt, 'Admin123');

      User.create({
        username: 'admin',
        firstName: 'Johnny',
        lastName: 'Test',
        salt: salt,
        password: hashedPassword,
        age: 31,
        gender: 'Male',
        roles: ['Admin']
      });
    }
  });
};

// module.exports = User;
