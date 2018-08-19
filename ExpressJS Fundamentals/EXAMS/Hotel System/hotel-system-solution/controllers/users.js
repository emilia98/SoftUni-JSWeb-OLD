const User = require('../models/User');
const Thread = require('../models/Thread');

async function blockUser (req, res) {
  let currentUser = req.user;
  let userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    res.locals.hasError = true;
    res.locals.error = 'Error occurred while trying to block user!';
    return res.render('errors/server-error');
  }

  if (!user) {
    res.locals.error = 'Error occurred while trying to block user!';
    return res.render('errors/page-not-found');
  }

  let indexInBlacklist;
  let blockedFromCurrentUser = false;
  indexInBlacklist = currentUser.blockedUsers.indexOf(user._id);

  if (indexInBlacklist === -1) {
    currentUser.blockedUsers.push(user._id);
    blockedFromCurrentUser = true;
  } else {
    currentUser.blockedUsers.splice(user._id, 1);
  }

  await currentUser.save();

  let thread;

  try {
    thread = await Thread.findOne({
      $and: [
        {
          $or: [
            { userOne: currentUser._id },
            { userTwo: currentUser._id }
          ]
        },
        {
          $or: [
            { userOne: user._id },
            { userTwo: user._id }
          ]
        }
      ]
    });
  } catch (err) {
    console.log(err);
    res.locals.error = 'Something went wrong!';
    return res.render('errors/server-error');
  }

  if (!thread) {
    let newThread;

    try {
      newThread = await Thread.create({
        userOne: req.user.id,
        userTwo: user._id,
        dateCreated: Date.now(),
        isBlocked: blockedFromCurrentUser
      });
      console.log(newThread);

      currentUser.threads.push(newThread._id);
      user.threads.push(newThread._id);
      await currentUser.save();
      await user.save();
    } catch (err) {
      console.log(err);
      res.locals.error = 'Something went wrong!';
      return res.render('errors/server-error');
    }
  } else {
    let currentUserIndexInBlackList = user.blockedUsers.indexOf(currentUser._id);
    let blockedFromOtherUser = false;
    if (currentUserIndexInBlackList > -1) {
      blockedFromOtherUser = true;
    }

    thread.isBlocked = blockedFromCurrentUser || blockedFromOtherUser;
    await thread.save();
  }

  res.redirect('/explore' + req.body.exploreUrl);
}

module.exports.blockUser = blockUser;
