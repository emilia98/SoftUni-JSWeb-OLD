const User = require('mongoose').model('User');
const Thread = require('../models/Thread');

async function showAllStartedThreads(req, res) {
  let currentUser = req.user;
  let thread;

  try {
    thread = await Thread.findOne({
      $or: [
            { userOne: currentUser._id },
            { userTwo: currentUser._id }
           ]
    });
    } catch (err) {
        console.log(err);
        res.locals.error = 'Something went wrong!';
        return res.render('errors/server-error');
    }

  let username = null;
  let allUsers = await User.find();
  let filteredUsers = [];
  let currentUserBlacklist = req.user.blockedUsers;

  res.locals.exploreUrl = req.url;
  res.locals.users = filteredUsers;
  res.locals.username = username;
  res.render('users/explore');
}

module.exports.exploreUsers = exploreUsers;
