const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/CatDB', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  let catSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true}
  });

  let Cat = mongoose.model('Cat', catSchema);
  let cat = new Cat();

  cat
    .save()
    .then(data => console.log(data))
    .catch(err => {
      let errors = err.errors;

      for (let errorProp in errors) {
        console.log(errors[errorProp].message);
      }
    });
});
