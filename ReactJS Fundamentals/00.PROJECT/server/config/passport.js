const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('../models/User');

module.exports = () => {
    // console.log('local');
    passport.use(new LocalPassport(async (username, password, done) => {
        let user;
        
        // console.log('here');
        // console.log('Username = ' + username);
        // console.log('WRONG PLACE');
        try {
            user = await User.findOne({username: username});
        } catch (err) {
            // console.log(err);
            return done(null, false);
        }

        if (!user) {
           // console.log('user do not exist');
           // console.log(user);
            return done(null, { username: null });
        }

        // console.log('shit');
        if(!user.authenticate(password)) {
            return done(null, { password: null });
        }

        return done(null, user);
    }));
    // console.log('WRONG PLACE');
    /*
    passport.serializeUser((user, done) => {
        // console.log(user);
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(async (id, done) => {
        let user = await User.findById(id);

        // console.log('sy');
        if(!user) {
            return done(null, false);
        }

        return done(null, user);
    });
    */
}
