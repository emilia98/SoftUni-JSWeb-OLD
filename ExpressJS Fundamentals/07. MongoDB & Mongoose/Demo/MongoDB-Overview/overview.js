const mongodb = require('mongodb');

let connection = 'mongodb://localhost:27017';

mongodb.MongoClient.connect(connection, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }

  let db = client.db('CatDB');
  let cats = db.collection('cats');

  cats.insertMany([
    {name: 'Pesho', age: 10},
    {name: 'Mishka', age: 5},
    {name: 'Sharo', age: 1},
    {name: 'Daro', age: 15, color: 'brown'}
  ], (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(data);
  });
});
