const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/CatDB', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  /* index -> optimized for searching, but not for creating
       when we have a blog, it's helpful
  */

  let Cat = mongoose.model('Cat', {
    name: {type: String, required: true, index: true},
    age: { type: Number, default: 0 }
  });

  let cat = new Cat({
    name: 'Tosho',
    age: 4
  });

  cat
    .save()
    .then(data => console.log(data))
    .catch(err => {
      console.log(err);
    });
});
