const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

// Use the NodeJS Promise, because mongoose's one will be deprecated
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/CatDB', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  /* We could create methods to the schema... */
  let catSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true, default: 0},
    owner: {type: ObjectId}
  });

  catSchema.methods.sayHello = function () {
    return `Hello from ${this.name}. I'm ${this.age} years old.`;
  };

  let ownerSchema = mongoose.Schema({
    name: {type: String, required: true}
  });

  let Cat = mongoose.model('Cat', catSchema);
  let Owner = mongoose.model('Owner', ownerSchema);

  Cat
    .find({})
    .exec()
    .then((cats) => {
      for (let cat of cats) {
        console.log(cat.sayHello());
      }
    });
});
