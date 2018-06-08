const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const tagSchema = mongoose.Schema({
  tagName: {type: mongoose.SchemaTypes.String, required: true},
  creationDate: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now()},
  images: [{type: ObjectId}]
});

tagSchema.methods.nameToLowerCase = function () {
  return this.name;
};

let Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
