const mongoose = require('mongoose');
const User = mongoose.model('User');
const Thread = require('../models/Thread');
const Message = require('../models/Message');

async function getThread (req, res) {
  let username = req.params.username;
  let currentUser = req.user;
  let user;
  let info = {};

  try {
    user = await User.findOne({ username: username });
  } catch (err) {
    console.log(err);
    res.locals.error = 'Something went wrong!';
    return res.render('errors/server-error');
  }

  if (!user) {
    res.locals.hasError = true;
    res.locals.error = 'Cannot start a thread with non-existent user!';
    return res.render('users/thread');
  }

  if (user._id.toString() === currentUser._id.toString()) {
    res.locals.hasError = true;
    res.locals.error = 'Cannot start a thread with yourself!';
    return res.render('users/thread');
  }

  res.locals.threadPath = user.username;
  info = {
    senderId: currentUser._id,
    recipientId: user._id
  };

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
        dateCreated: Date.now()
      });
      info.threadId = newThread._id;

      currentUser.threads.push(newThread._id);
      user.threads.push(newThread._id);
      await currentUser.save();
      await user.save();
    } catch (err) {
      console.log(err);
      res.locals.error = 'Something went wrong!';
      return res.render('errors/server-error');
    }

    res.locals.info = info;
    res.locals.messages = [];
    res.locals.isBlocked = newThread.isBlocked;
    return res.render('users/thread');
  }

  let messages;
  info.threadId = thread._id;

  try {
    messages = await Message
      .find({ threadId: thread._id })
      .populate('recipientId')
      .populate('senderId');
  } catch (err) {
    console.log(err);
    res.locals.hasError = true;
    res.locals.error = 'Error occurred while getting your messages!';
    return res.render('users/thread');
  }

  let formatedMsgs = [];

  for (let msg of messages) {
    let format = {};

    if (req.user._id.toString() === msg.senderId._id.toString()) {
      format.isIncoming = false;
      format.sender = msg.senderId.username;
    } else {
      format.isIncoming = true;
      format.sender = msg.senderId.username;
    }

    let isLink = false;
    let isImage = false;

    if (msg.text.startsWith('http') || msg.text.startsWith('https')) {
      isLink = true;
    }

    if (/^(http|https):/.test(msg.text) && /(jpg|jpeg|png)$/.test(msg.text)) {
      isImage = true;
    }

    format.isLink = isLink;
    format.isImage = isImage;
    format.onlyText = !isLink && !isImage;
    format.date = msg.dateSent.toLocaleString();
    format.text = msg.text;
    format.isLiked = msg.isLiked;
    format.id = msg._id;
    format.isLiked = msg.isLiked;
    formatedMsgs.push(format);
  }

  res.locals.isBlocked = thread.isBlocked;
  res.locals.partnerUsername = user.username;
  res.locals.messages = formatedMsgs;
  res.locals.info = info;
  return res.render('users/thread');
}

async function sendMessage (req, res) {
  let { message, senderId, recipientId, threadId } = req.body;
  let user = await User.findById(recipientId);
  let thread = await Thread.findById(threadId);

  if (thread.isBlocked) {
    // res.locals.hasError = true;
    // res.locals.error = 'Cannot send a message to a blocked thread!';
    return res.redirect('/thread' + req.url);
  }

  if (message.length === 0) {
    res.locals.invaidMessage = true;
    res.locals.errorMsg = 'Message should contains at least one character!';
    return res.render('users/thread');
  }

  if (message.length > 1000) {
    res.locals.invaidMessage = true;
    res.locals.errorMsg = 'Message should contains at most 1000 characters!';
    res.locals.message = message;
    res.locals.info = {
      senderId, recipientId, threadId
    };
    return res.render('users/thread');
  }

  await Message.create({
    senderId: senderId,
    recipientId: recipientId,
    dateSent: Date.now(),
    text: message,
    threadId: threadId
  });

  res.redirect(`/thread/${user.username}`);
}

module.exports.getThread = getThread;
module.exports.sendMessage = sendMessage;
