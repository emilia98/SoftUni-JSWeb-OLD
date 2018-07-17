const passport = require('passport');

module.exports.isAdministrated = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
            return res.status(401).json({hasPermission: false}); 
        }
        if (!user) {
            return res.status(401).json({hasPermission: false}); 
        }

        // console.log(req.body);
        if (user.role === 'Admin') {
            next();
            return;
        }
        // console.log(user);
        //res.locals.user = user;
        // req.user = user;
        return res.status(401).json({hasPermission: false}); 
      })(req, res, next); 
};
