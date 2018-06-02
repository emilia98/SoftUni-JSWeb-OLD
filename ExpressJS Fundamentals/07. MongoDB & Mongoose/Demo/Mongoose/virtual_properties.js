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

  /* This should be done before creating the model */
  ownerSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
  });

  ownerSchema.virtual('fullName').set(function (value) {
    this.age = value;
  });

  let Cat = mongoose.model('Cat', catSchema);
  let Owner = mongoose.model('Owner', ownerSchema);

  /*
   //  Create a new owner
   new Owner({
    firstName: 'Pesho',
    lastName: 'Toshev'})
    .save()
    .then(owner => {
        console.log(owner.fullName);
    });
  */

  // For every owner, do this ->
  Owner
    .find({})
    .exec()
    .then(owners => {
      for (let owner of owners) {
        console.log(owner);
        console.log(owner.fullName);
        owner.age = parseInt(Math.random() * 100);
        console.log(owner.age);
      }
    });
});
