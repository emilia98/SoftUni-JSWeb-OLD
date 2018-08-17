const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const threadSchema = new mongoose.Schema({
  userOne: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  userTwo: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  dateCreated: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now()
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
