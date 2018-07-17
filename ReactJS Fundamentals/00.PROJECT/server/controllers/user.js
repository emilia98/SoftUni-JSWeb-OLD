const User = require('../models/User');
const Profile = require('../models/Profile');
const LocalUserCountries = require('../models/UserCountries/LocalUser_Countries');
// const Activator = require('../models/Activator');
// const sendEmail = require('../utilities/send_email_2');
 const encryption = require('../utilities/encryption');
// const voucherCodes = require('../utilities/voucher_codes');
// const shortid = require('short-id');
// const passportTokens = require('passport-jwt');
//const jwt = require('jsonwebtoken');



// const passport = require('passport');

module.exports.registerPost = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let repeat = req.body.repeat;
  let email = req.body.email;

  let salt = encryption.generateSalt();
  let hashedPassword = encryption.generateHashedPassword(salt, password);

  let result = {};
  result.errors = {};
  result.success = null;

  // let passwordsMatch = true;
  // let errors = {};
  // console.log(req.body);
  if (repeat !== password) {
    result.errors.repeat = 'Both passwords should match';
    //return res.status(401).json(result);
    // res.end();
    // return;
    // result.errors.repeat = 'Both passwords should match';
    // passwordsMatch = false;
    // errors.push('Both passwords should match');
  }

  if (password.length < 3 || password.length > 30) {
    // res.status(402).json('The password should be between 3 and 30 characters long!');

    // res.end();
    // return;
    result.errors.password = 'The password should be between 3 and 30 characters long!';
   // errors.push('The password should be between 3 and 30 characters long!');
  }

  let userFoundByUsername;
  let userFoundByEmail;
  try {
    userFoundByUsername =  await User.findOne({username: username});
    userFoundByEmail = await  User.findOne({email: email});
  } catch (err) {
    return res.status(401).json({
      error: 'Something went wrong!'
    })
  }

  if (userFoundByUsername) {
    result.errors.username = 'User already exists!';
  }

  if (userFoundByEmail) {
    result.errors.email = 'User with this email already exists!';
  }

  if (Object.keys(result.errors).length > 0) {
    return res.status(401).json(result);
  }

  let user = new User({
    username: username,
    hashedPassword: hashedPassword,
    email: email,
    salt: salt
  });

  let newUser;
  // let activationLink = shortid.generate();
  // let activationCode = voucherCodes.generateForActivation();
  try {
    newUser = await user.save();
    // sendEmail();
  } catch (err) {
    // let errors = [];

    for (let error in err.errors) {
      let errorField = err.errors[error].properties.path;
      let errorMsg = err.errors[error].message;
      result.errors[errorField] = errorMsg;
      // console.log(err.errors[error].properties.path);
      // errors.push(err.errors[error].message);
    }
    res.status(401).json(result);
    return;
  }

  // console.log(user);

  let localUserCountries;
  let profile;

  try {
    profile = await Profile.create({
      userId: newUser._id
    });
    localUserCountries = await LocalUserCountries.create({
      userId: newUser._id
    });
    // sendEmail();
  } catch (err) {
    // let errors = [];

    // console.log(err);

    for (let error in err.errors) {
      let errorField = err.errors[error].properties.path;
      let errorMsg = err.errors[error].message;
      result.errors[errorField] = errorMsg;
      // console.log(err.errors[error].properties.path);
      // errors.push(err.errors[error].message);
    }
    res.status(401).json(result);
    return;
  }

  //console.log(profile);

  await newUser.update({ $set:
    {
     profileId: profile._id
    }
  });

  /*
  let activator;
  // let modifiedCode =



  try {
    activator = await new Activator({
      activationLink: activationLink,
      userId: newUser._id,
      activationCode: activationCode
    }).save();
  } catch (err) {
    res.status(402).json({ server: 'Error while sending confirmation email. Contact us to solve this problem!'});
    return;
  }
*/
  // sendEmail(email, activationLink, activationCode);
  // console.log(activator);

  //res.status(200).json('Successfully created a user!');
  res.status(200).json(result);
  /*
  req.login(user, (error, user) => {
    if (error) {
      res.status(402).json('Authentication is unsuccessful!');
      return;
    }

   // console.log(req.user);
     // req.user.profilePicture = 'https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg';
    // res.redirect('/');
   // console.log(req.user);

   // res.cookie('session', value, { expires: Date + 1800000 });
  });
  res.status(200).json('Successfully created a user');*/
};


module.exports.loginPost = async (req, res) => {
  //  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;

  console.log('Username: ' + username);

  let user = await User.findOne({username: username});
  // console.log()
  let result = {};
  result.errors = {};
  result.success = null;
  result.token = null;
  result.user = null;

  if (!user) {
    result.errors.username = 'This user does not exist!';
    res.status(402).json(result);
    return;
    /* console.log('username');
    res.status(402).json('Incorrect username!');
    */
    //return;
  }

  if (!user.authenticate(password)) {
    result.errors.password = 'Incorrect password!';
    res.status(402).json(result);
    return;
    /*
    console.log('password');
    res.status(402).json('Incorrect password!');
    */
    //return;
  }

  // console.log(result);
  /* if (Object.keys(result.errors).length > 0) {
    res.status(402).json(result.errors);
    return;
  } */


  req.login(user, {session: false}, (error) => {
    if (error) {
      res.status(402).json('Authentication is unsuccessful!');
      return;
    }

     console.log(user);
    let userData = {
      username: user.username,
      profilePicture: 'https://4.bp.blogspot.com/-L9CtV6gR8GI/WtgKA619aEI/AAAAAAAAF9c/CubtyZE94o076qCShJN_D2bdNiHoeIRxACEwYBhgL/s1600/cool%2Bprofile%2Bimages.png'
    };
    const token = jwt.sign(userData, 'my_react_app', {
      expiresIn: '3d'
    });
    console.log(token);

    result.user = userData;
    result.token = token;

    return res.json(result);
    /*
    const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
    res.json('Logged in!');
    */
  });
};

module.exports.activatePost = async (req, res) => {
  //console.log(req.url);
  let activationId = req.params.id;
  let activation = await Activator.findOne({
    activationLink: activationId
  });

  // console.log(req)
  //console.log(window.location.href);

  if (!activation) {
    //console.log('*'.repeat(''))
    res.status(402).json({
      singleError: 'Wrong or expired link for profile activation!'
    });
    return;
  }


// console.log('*'.repeat(20));
  console.log(req.body);
  console.log(activation);
};
