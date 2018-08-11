const express = require('express');
const router = express.Router();


router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', (req, res) => {
  // console.log(req);
  let user = req.body;
  let errors = {
    username: null,
    password: null,
    confirm: null,
    name: null,
    email: null
  };

  let username, password, name, email;
  let hasError = false;

  if (user.username && user.username.length > 0) {
    username = user.username;
  } else {
    errors.username = 'Username is required!';
    hasError = true;
  }

  if (user.password && user.password.length > 0) {
    password = user.password;

    if(user.password !== user.confirm) {
      errors.confirm = 'Both passwords should match';
      hasError = true;
    }
  } else {
    errors.password = 'Password is required!';
    hasError = true;
  }
  
  if (user.name && user.name.length > 0) {
    name = user.name;
  } else {
    errors.name = 'Full Name is required!';
    hasError = true;
  }

  if (user.email && user.email.length > 0) {
    email = user.email;
  } else {
    errors.email = 'Email is required!';
    hasError = true;
  }

  if(hasError) {
    //console.log('errasfjsaf');
    res.render('auth/register', {
      hasError: hasError,
      errors: errors,
      user: user
    });
    return;
  }

  console.log(req.body);
})

router.get('/login', (req, res) => {
  res.render('auth/login');
});


module.exports = router;
