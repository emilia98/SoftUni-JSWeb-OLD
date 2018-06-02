const mongodb = require('mongodb');

let connection = 'mongodb://localhost:27017';

mongodb.MongoClient.connect(connection, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }

  let db = client.db('CatDB');
  let cats = db.collection('cats');

  // find with no criteria -> will return all of the data
  cats.find({}).toArray((err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(data);
  });

  cats.find({name: 'Sharo'}).toArray((err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  });

  // Finds the first one, that fulfills the criteria
  cats.findOne({}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  });

  // Finds the first one and deletes it
  cats.findOneAndDelete({'name': 'Sharo'}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  });
});
