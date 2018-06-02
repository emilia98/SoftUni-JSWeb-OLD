const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
/* We could create methods to the schema... */
let catSchema = mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true, default: 0},
  owner: {type: ObjectId}
});

catSchema.methods.sayHello = function () {
  return `Hello from ${this.name}. I'm ${this.age} years old.`;
};

let Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
/* OR
module.exports = mongoose.model('Cat');
*/
