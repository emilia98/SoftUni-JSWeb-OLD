const passport = require('passport');

module.exports.getUser = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    //console.log(user);
    if (err || !user) {
      res.locals.user = null;
    } else {
      res.locals.user = user;
    }
    next();
  })(req, res, next);
};
