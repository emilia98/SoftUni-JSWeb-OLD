const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
// const formidable = require('formidable');
const path = require('path');

const app = express();
const port = 5000;

const db = require('./config/dbConfig');
const Book = require('./models/Book');
const Author = require('./models/Author');

 // Set up the golder, where to search for static content
 const publicFilesPath = path.normalize(
  path.join(__dirname, 'public')
);
app.use('/public', express.static(publicFilesPath));

db.then(() => {
  console.log('Connected to DB...');

  let router = require('./controllers/books-controller');
 

  // Set up the view engine -> Handlebars (in this case)
  app.engine('.hbs', hbs({
    extname: '.hbs',
    partialsDir: 'views/partials'
  }));
  app.set('view engine', '.hbs');
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing 

  app.use('/', router);

  app.get('/', (req, res) => {
    console.log(req);
    res.render('home');
  });

  app.get('/add/book', (req, res) => {
    res.render('create-book');
  });

  app.get('/home', (req, res) => {
      // Send Data: 
      // res.json({message: 'Hello from API!'});
  
      // Send Error:
      // res.status(400).json({message: 'Error message'});
  });
  
  app.listen(port, () => {
    console.log(`App is listening on port ${port}...`)
  });
});
