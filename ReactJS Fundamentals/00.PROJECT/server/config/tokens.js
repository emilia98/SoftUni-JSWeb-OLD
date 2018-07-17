const passport = require('passport');
const passportJWT = require('passport-jwt');
const extractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const User = require('./../models/User');

module.exports = () => {
  passport.use(new JWTStrategy({
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'my_react_app'
  },
  async function (tokenPayload, callback) {
    let userFound;

    try {
      userFound = await User.findById(tokenPayload.userId);
  
      if (userFound) {
        return callback(null, userFound);
      }
  
      return callback(null, null);
      
    } catch (err) {
      return callback(err);
    }
  }
  ));
}
