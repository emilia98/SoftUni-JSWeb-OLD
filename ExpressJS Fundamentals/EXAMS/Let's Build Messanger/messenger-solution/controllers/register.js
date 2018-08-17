const encryption = require('../utilities/encryption');
const User = require('mongoose').model('User');

async function register (req, res) {
  let userData = req.body;
  let errors = {
    username: null,
    password: null,
    confirm: null,
    name: null
  };

  let username, password, name;
  let hasError = false;

  if (userData.username && userData.username.length > 0) {
    username = userData.username;
  } else {
    errors.username = 'Username is required!';
    hasError = true;
  }

  if (userData.password && userData.password.length > 0) {
    password = userData.password;

    if (password !== userData.confirm) {
      errors.confirm = 'Both passwords should match';
      hasError = true;
    }
  } else {
    errors.password = 'Password is required!';
    hasError = true;
  }

  if (userData.name && userData.name.length > 0) {
    name = userData.name;
  } else {
    errors.name = 'Full Name is required!';
    hasError = true;
  }

  if (hasError) {
    res.render('auth/register', {
      hasError: hasError,
      errors: errors,
      user: userData
    });
    return;
  }

  let user = await User.findOne({ username });

  if (user) {
    return res.render('auth/register', {
      cannotRegister: true,
      user: user
    });
  }

  let salt = encryption.generateSalt();
  let hashedPassword = encryption.generateHashedPassword(salt, userData.password);

  let newUser = await User.create({
    username: userData.username,
    salt: salt,
    hashedPass: hashedPassword,
    name: name
  });

  req.logIn(newUser, (err, user) => {
    if (err) {
      return res.render('auth/register', {
        user: user
      });
    }

    res.redirect('/');
  });
}

module.exports.register = register;
