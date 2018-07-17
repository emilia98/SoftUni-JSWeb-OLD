const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");


router.get('/google', //(req,res) => {
  passport.authenticate('google', {
    scope: ['email'],
    prompt: 'select_account'
  })
  
)

// ORIGINAL
/*
router.get('/google', function(req, res) {

  passport.authenticate('google', {
    scope: ['email'],
    prompt: 'select_account'
  }, function (err, profile, info) {
    res.json({
      'da': 'da'
    })
  })(req, res)

}
  */
 



router.get('/google/login',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/user/profile/me');
  }
);

/*
router.get('/google/login', // (req, res) => {
  // console.log('da');
  // passport.authenticate('google')
  
  passport.authenticate('google', function(err, user, info) {
    console.log(user);
    console.log('passed');
    res.status(200).json({
    message: 'Logged in'
    });
  })
  
)
*/
/*
  passport.authenticate('google'), (req, res) => {
    res.status(200).json({
      message: 'Tochno e!'
    });
  }
*/
  



router.post('/login', function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

   // console.log('fuck be');
  passport.authenticate('local', { session: false }, (err, user) => {
    let result = {};
    result.errors = {};
    result.success = null;
    result.token = null;
    result.user = null;

    console.log(user);

   // console.log(req.body);

   // console.log(user);
    if (err) {
      // console.log('here');
      res.status(402).json('Authentication is unsuccessful!');
      return;
    }
    
    if (user.username === null) {
      // console.log('hereeee');
      result.errors.username = 'This user does not exist!';
      res.status(402).json(result);
      return;
    }

    if (user.password === null) {
      // console.log(`password = ${password}`);
      result.errors.password = 'Incorrect password!';
      res.status(402).json(result);
      return;
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        res.status(402).json('Authentication is unsuccessful!');
        return;
      }

      // console.log('da');
      // console.log(user);

      let userData = {
        username: user.username,
        profilePicture: 'https://4.bp.blogspot.com/-L9CtV6gR8GI/WtgKA619aEI/AAAAAAAAF9c/CubtyZE94o076qCShJN_D2bdNiHoeIRxACEwYBhgL/s1600/cool%2Bprofile%2Bimages.png'
      };
      const token = jwt.sign({
        userId: user._id
      }, 'my_react_app', {
        expiresIn: '3d'
      });

      result.user = userData;
      result.token = token;

      console.log(token);
      /* res.cookie('user', {
        token: token,
        user: userData
      });*/
      // console.log(token);

      return res.json(result);
    });
  })(req, res);
});



module.exports = router;
