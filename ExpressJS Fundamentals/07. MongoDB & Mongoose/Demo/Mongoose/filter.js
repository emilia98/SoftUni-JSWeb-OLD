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

  // Variant 1: Simple Filtering
  Cat
    .find({age: {$gte: 5}})
    .exec()
    .then(cats => {
      console.log('1.1');
      console.log(cats);
    })
    .catch(err => console.log(err));

  // Variant 2: Simple Filtering
  Cat
    .find({})
    .where('age').gte(5)
    .exec()
    .then(cats => {
      console.log('1.2');
      console.log(cats);
    })
    .catch(err => console.log(err));

  // Variant 1: Several filtering options
  Cat
    .find({
      $or: [
        {age: {$gte: 5}},
        {name: 'Tosho'}
      ]
    })
    .exec()
    .then(cats => {
      console.log('2.1');
      console.log(cats);
    })
    .catch(err => console.log(err));

  // Variant 2: Several filtering options
  Cat
    .find({})
    .or([{age: {$gte: 5}}, {name: 'Tosho'}])
    .exec()
    .then(cats => {
      console.log('2.2');
      console.log(cats);
    })
    .catch(err => console.log(err));

  // Variant 1: Chained Filtering
  Cat
    .find({age: {$lt: 5}})
    .find({name: 'Ivan'})
    .exec()
    .then(cats => {
      console.log('3.1');
      console.log(cats);
    })
    .catch(err => console.log(err));

  // Variant 2: Chained Filtering
  Cat
    .find({})
    .where('age').lt(5)
    .where('name').equals('Ivan')
    .exec()
    .then(cats => {
      console.log('3.2');
      console.log(cats);
    })
    .catch(err => console.log(err));
});
