const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
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
    Book
      .find({})
      .then(books => {
        res.render('home', {
          booksCount: books.length
        });
      })
      .catch(err => {
        res.render('error', {
          error: err
        });
      });
  });

  app.get('/add/book', (req, res) => {
    res.render('create-book');
  });

  app.get('/edit/book/:id', (req, res) => {
    let id = req.params.id;

    updateBook();
    async function updateBook () {
      let book = await Book.findById(id);

      let authors = await Author.where('_id').in(book.authors);
      authors = authors.map(el => el.name);

      let loadedBook = {
        authors: authors.join(', '),
        title: book.title,
        year: book.releaseYear,
        id: book._id
      };

      res.render('update-book', {
        book: loadedBook
      });
    }
  });

  app.get('/viewAll', (req, res) => {
    console.log(req.body);
  });

  app.listen(port, () => {
    console.log(`App is listening on port ${port}...`);
  });
});
