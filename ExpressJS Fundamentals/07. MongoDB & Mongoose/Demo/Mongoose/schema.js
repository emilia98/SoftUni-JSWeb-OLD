const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

// Use the NodeJS Promise, because mongoose's one will be deprecated
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/CatDB', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  let catSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true, default: 0},
    owner: {type: ObjectId}
  });

  let ownerSchema = mongoose.Schema({
    name: {type: String, required: true}
  });

  let Cat = mongoose.model('Cat', catSchema);
  let Owner = mongoose.model('Owner', ownerSchema);

  /*
  let owner = new Owner({
    name: 'Tosho'
  });

  owner
    .save()
    .then(owner => {
        let ownerId = owner._id;

        let cat = new Cat({
            name: 'Ricki',
            age: 1,
            owner: ownerId
          });

        cat
         .save()
         .then(cat => console.log(cat))
         .catch(err => console.log(err));
    })
    .catch(err => {
      let errors = err.errors;

      for (let errorProp in errors) {
        console.log(errors[errorProp].message);
      }
    });
*/
  Owner
    .find({})
    .exec()
    .then(owners => {
      for (let owner of owners) {
        Cat.find({owner: owner._id})
          .then(cats => {
            console.log(owner.name);
            console.log(cats);
          })
          .catch(err => console.log(err));
      }
    });
});
