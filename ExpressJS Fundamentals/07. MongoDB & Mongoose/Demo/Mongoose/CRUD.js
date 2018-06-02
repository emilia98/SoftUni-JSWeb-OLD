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

/* Uncomment to test this part:
  // Read
  Cat
  .findOne({name: 'Pesho'})
  .then((cat) => {
    console.log('first');
     console.log(cat);
  })
  .catch(err => console.log(err));
*/

/* Uncomment to test this part:
  // Read + Update
  Cat
  .findOne({name: 'Pesho'})
  .then((cat) => {
      cat.age++;
      cat
      .save()
      .then(cat => {
          console.log('second');
          console.log(cat);
        });
    });
*/

/* Uncomment to test this part:
    // Read->Update
    Cat
    .findByIdAndUpdate('5b0fe26ddcff102288ef79f2', {
        $set: {age: 0}
    })
    .then(cat => {
        console.log('third');
        // Returns the non-updated value
        console.log(cat);
    })
    .catch(err => console.log(err));
*/

/* Uncomment to test this part:
// Update multiple objects
  Cat.update(
    {name: 'Pesho'},
    { $set: {name: 'Ivan'} },
    {
      // if set to false -> it will get the first found only
      multi: true
    }
  )
  .then(data => console.log(data))
  .catch(err => console.log(err));
*/

/* Uncomment to test this part:
  // Find and remove one entry
  Cat.findOneAndRemove({name: 'Ricki'})
  .then(cat => console.log(cat))
  .catch(err => console.log(err));
*/

/*
  // Remove all the entries that meet this condition
  Cat.
    remove(
      {name: 'Ricki'}
    )
    .then(data => console.log(data))
    .catch(err => console.log(err))
*/
});
