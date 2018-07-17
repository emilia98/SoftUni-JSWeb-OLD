let router = require('express').Router();
const passport = require('passport');
const isAuthenticated = require('../middlewares/authentication').isAuthenticated;
const Profile = require('../models/Profile');

router.get('/here',  (req, res) => 
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        
        // console.log(user);
        if (user) {
          let userPofile = await Profile.findById(user.profileId);
          // console.log(userPofile);  
          // console.log('Profile');
          let dataToSend = {
              //user: user._id,
              username: user.username,
              profilePicture: userPofile.profilePicture
          };
          return res.json({user: dataToSend});
        } 

        return res.json(false);
    })(req, res)
);

router.get('/roles', (req, res) => {
    
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (user) {
          return res.json({isAdmin: user.role === 'Admin'});
        } 
        return res.json(false);
    })(req, res)
    

    // res.redirect('/');
});

router.get('/profile/me', isAuthenticated, (req, res) => {
    let userData = res.locals.user;

    console.log(userData);
    res.json({
        isAuth: req.isAuthenticated()
    });
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.status(200).json({
        isOk: true
    });
});


module.exports = router;
