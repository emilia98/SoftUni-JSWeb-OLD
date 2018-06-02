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

  catSchema.path('age').validate(value => {
    return value >= 0 && value <= 20;
  }, 'The age must be between 0 and 20');

  let ownerSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  });

  let Cat = mongoose.model('Cat', catSchema);
  let Owner = mongoose.model('Owner', ownerSchema);

  let cat = new Cat({
    name: 'Rocky',
    age: -10
  });

  cat
    .save()
    .then(cat => console.log(cat))
    .catch(err => console.log(err.message));
});
