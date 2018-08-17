const User = require('mongoose').model('User');

async function login (req, res) {
  let userData = req.body;
  let errors = {
    username: null,
    password: null
  };

  let username;
  let password;
  let hasError = false;

  if (userData.username && userData.username.length > 0) {
    username = userData.username;
  } else {
    errors.username = 'Username is required!';
    hasError = true;
  }

  if (userData.password && userData.password.length > 0) {
    password = userData.password;
  } else {
    errors.password = 'Password is required!';
    hasError = true;
  }

  if (hasError) {
    res.render('auth/login', {
      hasError: hasError,
      errors: errors,
      user: userData
    });
    return;
  }

  let user = await User.findOne({ username });

  if (!user) {
    res.locals.invalidUser = true;
    return res.render('auth/login', {
      user: user
    });
  }

  if (!user.checkPassword(password)) {
    res.locals.invalidUser = true;
    return res.render('auth/login', {
      user: user
    });
  }

  req.logIn(user, (err, user) => {
    if (err) {
      res.locals.serverError = err;
      return res.render('auth/login', {
        user: user
      });
    }

    res.redirect('/');
  });
}

module.exports.login = login;
