const User = require('mongoose').model('User');

async function exploreUsers (req, res) {
  let username = null;
  let allUsers = await User.find();
  let filteredUsers = [];
  let currentUserBlacklist = req.user.blockedUsers;

  if (req.query.username !== undefined) {
    username = req.query.username.toLowerCase();

    for (let user of allUsers) {
      let customizedUser = {};
      if (user._id.toString() === req.user._id.toString()) {
        continue;
      }

      if (user.username.toLowerCase().includes(username) === true) {
        let indexInBlacklist = currentUserBlacklist.indexOf(user._id);

        customizedUser['username'] = user.username;
        customizedUser['id'] = user._id;
        customizedUser['isBlocked'] = false;

        if (currentUserBlacklist.indexOf(user._id) > -1) {
          customizedUser['isBlocked'] = true;
          currentUserBlacklist.splice(indexInBlacklist, 1);
        }

        filteredUsers.push(customizedUser);
      }
    }
  }

  res.locals.exploreUrl = req.url;
  res.locals.users = filteredUsers;
  res.locals.username = username;

  res.render('users/explore');
}

module.exports.exploreUsers = exploreUsers;
