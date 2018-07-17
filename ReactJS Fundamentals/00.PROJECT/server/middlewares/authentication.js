const passport = require('passport');

module.exports.isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        //
        
        console.log(user);
        console.log('da');
       // console.log(req);
        if (err) {
            return res.status(401).json({isAuthenticated: false}); 
        }
        if (!user) {
            return res.status(401).json({isAuthenticated: false}); 
        }
        res.locals.user = user;
        // req.user = user;
        next();
      })(req, res, next); 
};
