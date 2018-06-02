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

  let ownerSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  });

  let Cat = mongoose.model('Cat', catSchema);
  let Owner = mongoose.model('Owner', ownerSchema);

  Cat
    .find({age: {$gte: 5}})
    .sort('-age')
    .exec()
    .then(cats => {
      console.log('FIRST');
      console.log(cats);
    })
    .catch(err => console.log(err));

  Cat
    .find({age: {$lt: 5}})
    .sort('age name')
    .exec()
    .then(cats => {
      console.log(cats);
    })
    .catch(err => console.log(err));
});
