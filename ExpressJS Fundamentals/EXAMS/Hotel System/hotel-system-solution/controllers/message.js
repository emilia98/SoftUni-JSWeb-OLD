const Message = require('../models/Message');

async function likeMessage (req, res) {
  let messageId = req.params.id;
  let thread = req.body.threadPath;
  let message;

  try {
    message = await Message.findById(messageId);
  } catch (err) {
    res.locals.error = 'The page your requested cannot be found!';
    return res.render('errors/page-not-found');
  }

  message.isLiked = !message.isLiked;
  await message.save();

  res.redirect(`/thread/${thread}`);
}

module.exports.likeMessage = likeMessage;
