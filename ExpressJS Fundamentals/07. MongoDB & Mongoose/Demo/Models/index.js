const mongoose = require('mongoose');

const Cat = require('./Cat');
const Owner = require('./Owner');

// Use the NodeJS Promise, because mongoose's one will be deprecated
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/CatDB', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  let cat = new Cat({
    name: 'Ricki Junior',
    age: 4
  });

  let owner = new Owner({
    name: 'Ricki Senior'
  });

  cat
    .save()
    .then((cat) => console.log(cat))
    .catch((err) => console.log(err));

  owner
    .save()
    .then((owner) => console.log(owner))
    .catch((err) => console.log(err));
});
