const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
  recipientId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
  threadId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  dateSent: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now()
  },
  text: {
    type: String,
    required: true
  },
  isLiked: {
    type: Boolean,
    default: false
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
