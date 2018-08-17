const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('mongoose').model('User');

module.exports = () => {
  passport.use(new LocalPassport(async (username, password, done) => {
    // console.log(username);
    let user = await User.findOne({ username: username });
    // console.log('*************');
    // console.log(user);
    
    if (!user) {
      return done(null, false);
    }

    if (!user.checkPassword(password)) {
      return done(null, false);
    }

    return done(null, user);
  }));

  passport.serializeUser((user, done) => {
    // console.log('Serialize: ');
    // console.log(user);
    if (user) {
      return done(null, user._id);
    }
    return done(null, false);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await User.findById(id);

    // console.log('Desera: ');
    // console.log(user);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  });
};
