const User = require('mongoose').model('User');
const encryption = require('../utilities/encryption');

async function registerGet(req, res) {
  res.render('auth/register');
}

async function loginGet(req, res) {
  res.render('auth/login');
}

async function register (req, res) {
    let userData = req.body;

    let errors = {
      name: null,
      password: null,
      email: null,
      repeat: null
    };
  
    let email, password, name;
    let hasError = false;
  
    if (userData.email && userData.email.length > 0) {
      email = userData.email;
    } else {
      errors.email = 'Email is required!';
      hasError = true;
    }

    if (userData.name && userData.name.length > 0) {
      name = userData.name;
    } else {
      errors.name = 'Name is required!';
      hasError = true;
    }
  
    if (userData.password && userData.password.length > 0) {
      password = userData.password;
  
      if (password !== userData.repeatPass) {
        errors.repeat = 'Both passwords should match';
        hasError = true;
      }
    } else {
      errors.password = 'Password is required!';
      hasError = true;
    }

    if (hasError) {
      res.render('auth/register', {
        hasError: hasError,
        errors: errors,
        userData: userData
      });
      return;
    }
  
    let user = await User.findOne({ email: email });
  
    if (user) {
      return res.render('auth/register', {
        cannotRegister: true,
        userData: user
      });
    }
  
    let salt = encryption.generateSalt();
    let hashedPassword = encryption.generateHashedPassword(salt, userData.password);
  
    let newUser = await User.create({
      name: name,
      email: email,
      salt: salt,
      hashedPass: hashedPassword
    });
  
    req.logIn(newUser, (err, user) => {
      if (err) {
        return res.render('auth/register', {
          userData: user
        });
      }
  
      res.redirect('/');
    });
  }

async function login (req, res) {
  let userData = req.body;

  let errors = {
    email: null,
    password: null
  };

  let email;
  let password;
  let hasError = false;

  if (userData.email && userData.email.length > 0) {
    email = userData.email;
  } else {
    errors.email = 'Email is required!';
    hasError = true;
  }

  if (userData.password && userData.password.length > 0) {
    password = userData.password;
  } else {
    errors.password = 'Password is required!';
    hasError = true;
  }

  if (hasError) {
    console.log(errors);
    res.render('auth/login', {
      hasError: hasError,
      errors: errors,
      userData: userData
    });
    return;
  }

  let user = await User.findOne({ email: email });

  if (!user) {
    res.locals.invalidUser = true;
    return res.render('auth/login', {
      userData: user
    });
  }

  if (!user.checkPassword(password)) {
    res.locals.invalidUser = true;
    return res.render('auth/login', {
      userData: user
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

async function logout (req, res) {
  req.logout();
  res.redirect('/');
}

module.exports = {
  registerGet,
  loginGet,
  register,
  login,
  logout
};
