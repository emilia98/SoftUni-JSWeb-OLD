const mongoose = require('mongoose');

// Use the NodeJS Promise, because mongoose's one will be deprecated
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/CatDB', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  let studSchema = mongoose.Schema({
    name: {type: String, require: true}
  });

  let personSchema = mongoose.Schema({
    name: { type: String, require: true },
    age: { type: Number, require: true }
  });

  let Student = mongoose.model('Student', studSchema);
  let Person = mongoose.model('Person', personSchema);

  //  This is how we create a collection in the database
  let student = new Student({
    name: 'Pesho'
  });

  let person = new Person({
    name: 'Pesho',
    age: 23
  });

  /*
   Until we do this, we won't have this collections created.
   The mongoose create a collection itself -
   the name of collection is the name of the model pluralized

   -> Student -> students
   -> Person -> people
   -> P -> ps
  */
  student
    .save()
    .then((s) => console.log(s));

  person
    .save()
    .then((p) => console.log(p));
});
