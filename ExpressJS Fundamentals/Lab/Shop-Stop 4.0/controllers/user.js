const User = require('mongoose').model('User');
const encryption = require('../utilities/encryption');

module.exports.registerGet = (req, res) => {
  res.render('user/register');
};

module.exports.registerPost = (req, res) => {
  let user = req.body;

  if (user.password && user.password !== user.confirmedPassword) {
    user.error = 'Passwords do not match.';
    res.render('user/register', user);
    return;
  }

  let salt = encryption.generateSalt();
  user.salt = salt;

  if (user.password) {
    let hashedPassword = encryption.generateHashedPassword(salt, user.password);
    user.password = hashedPassword;
  }

  user.roles = ['User'];
  User.create(user)
    .then(user => {
      req.login(user, (error, user) => {
        if (error) {
          res.render('users/register', {
            error: 'Authentication does not work!'
          });
          return;
        }
        res.redirect('/');
      });
    }).catch(errors => {
      let allErrors = errors.errors;
      let customErrors = [];
 
      for (let error in allErrors) {
        customErrors.push(allErrors[error].message);
      }
      user.error = customErrors;
      res.render('user/register', user);
    });
};

module.exports.loginGet = (req, res) => {
  res.render('user/login');
};

module.exports.loginPost = async (req, res) => {
  let userToLogin = req.body;
  let user = await User.findOne({username: userToLogin.username});

  if (!user) {
    res.render('user/login', {error: 'Invalid username'});
    return;
  }

  if (!user.authenticate(userToLogin.password)) {
    res.render('user/login', {error: 'Invalid password'});
    return;
  }

  req.login(user, (error, user) => {
    if (error) {
      res.render('user/login', {
        error: 'Authentication is not working!'
      });
      return;
    }

    res.redirect('/');
  });
};

module.exports.logout = (req, res) => {
  let success = encodeURIComponent('Successfulyy logged out!');
  req.logout();
  res.redirect('/?success=' + success);
};
