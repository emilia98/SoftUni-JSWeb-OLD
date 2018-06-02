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
    .limit(3)
    .exec()
    .then(cats => console.log(cats));

  Cat
    .find({})
    .where('age').lt(5)
    .where('name').equals('Ivan')
    .limit(1)
    .exec()
    .then(cats => {
      console.log(cats);
    })
    .catch(err => console.log(err));
});
