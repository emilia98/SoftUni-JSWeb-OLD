const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const imageSchema = mongoose.Schema({
  url: {type: mongoose.SchemaTypes.String, required: true},
  creationDate: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now},
  title: {type: mongoose.SchemaTypes.String, required: true},
  description: {type: mongoose.SchemaTypes.String, required: true},
  tags: [{type: ObjectId}]
});

let Image = mongoose.model('Image', imageSchema);

module.exports = Image;
