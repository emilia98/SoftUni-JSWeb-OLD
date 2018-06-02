const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CatDB', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  let Cat = mongoose.model('Cat', {
    name: {type: String, required: true},
    age: { type: Number, default: 0 }
  });

  Cat
    .find({})
    .exec()
    .then(cats => console.log(cats));

  Cat
    .findById('5b0ff1472169e02e945cb928')
    .then(data => console.log(data));
});
