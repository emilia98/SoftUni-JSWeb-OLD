const express = require('express');
const formidable = require('formidable');
const ObjectId = require('mongoose').Types.ObjectId;
const path = require('path');
const qs = require('querystring');
const url = require('url');
const fs = require('fs');

const promisify = require('../custom-modules/promisify');
const unlink = promisify(fs.unlink);

const Book = require('../models/Book');
const Author = require('../models/Author');

let router = express.Router();
let uploadsFolder = path.normalize(
  path.join(__dirname, '../public/uploads')
);

async function deleteFile (image) {
  let dir = image.path;
  await unlink(dir);
}

async function saveData (res, bookObj) {
  let authors = bookObj.authors.split(/\s*,\s*/).filter(el => el !== '');
  let authorIds = [];

  // Search for the names of this authors in the database
  for (let authorName of authors) {
    let author = await Author.findOne({name: authorName});

    if (!author) {
      let registerAuthor = new Author({
        name: authorName,
        books: []
      });
      author = await registerAuthor.save();
    }
    authorIds.push(author._id);
  }

  // Map all author ids, so we could add it to the newly created book
  let ids = authorIds.map(el => ObjectId(el));
  let book = new Book({
    title: bookObj.title,
    authors: ids,
    imageSrc: bookObj.image,
    releaseYear: bookObj.year
  });

  let registerBook = await book.save();

  for (let authorId of ids) {
    let updated = await Author.findById(authorId);

    updated.books.push(registerBook._id);
    await updated.save();
  }

  res.json({message: 'New book created'});
}

router
  .route('/books')
  .get((req, res) => {
    Book.find().then(books => {
      res.render('list-books', {
        books: books
      });
    });
    //let query = qs.parse(url.parse(req.url).query);
    //console.log(parsed);
    
  })
  .post((req, res) => {
    let form = formidable.IncomingForm({
      uploadDir: uploadsFolder,
      keepExtensions: true
    });

    let title, year, authors, image;
    let messages = {};
    let hasInvalidField = false;
    let parsedYear;

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }

      title = fields.bookTitle;
      year = fields.bookYear;
      authors = fields.bookAuthor;
      image = files.bookPoster;

      if (title.length === 0) {
        hasInvalidField = true;
        messages.title = 'Title cannot be empty';
      }
      
      if (authors.length === 0) {
        hasInvalidField = true;
        messages.author = 'There should be at least 1 author';
      }

      parsedYear = parseInt(year);
      if (year.length === 0) {
        hasInvalidField = true;
        messages.year = 'Year cannot be empty';
      } else if (isNaN(parsedYear) || parsedYear !== +year || parsedYear < 0) {
        
        hasInvalidField = true;
       /*  if (!messages.year) {
          messages.year = [];
        }
        messages.year.push('Year should be a positive integer'); */
        //messages.forYear.push('Year should be an integer');
        messages.year = 'Year should be a positive integer';
      }

      if (image.name === '') {
        hasInvalidField = true;
        messages.image = 'Please, choose a file...';
      }

      if (hasInvalidField) {
        deleteFile(image);

        res.status(400).json(messages);
      } else {
        let imagePath = image.path.match(/\\public\\uploads\\.+/)[0];
      
        let book = {
          title: title,
          authors: authors,
          image: imagePath,
          year: parsedYear
        };
      //console.log(book);
      saveData(res, book);
    }
      //year = parseInt(year);
      
    });
        /*
        let form =  formidable.IncomingForm();
  
        // console.log('here');
        form.parse(req, (err, fields, files) => {
            console.log(fields);
            console.log(files);
  
            let title = fields.bookTitle;
            let bookYear = fields.bookYear;
            let bookAuthor = fields.bookAuthor;
            
            if(title.length === 0 || bookYear.length === 0 ||
              bookAuthor.length === 0) {
                  //res.status(400).json({message: 'Error message'});
                  //return;
                  res.json({message: 'Testvam'});
                  return;
              }
        }) ;

        form.on('end', () => {
          //res.json({message: 'Restvam'});
        })
       */
  });

router
  .route('/books/:id')
  .get((req, res) => {
    console.log('ID = ');
    console.log(req.params.id);
  });

// TODO: PUT:

//TODO: DELETE:
module.exports = router;
