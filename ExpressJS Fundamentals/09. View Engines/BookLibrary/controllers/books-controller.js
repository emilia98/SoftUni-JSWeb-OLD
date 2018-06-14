const express = require('express');
const formidable = require('formidable');
const ObjectId = require('mongoose').Types.ObjectId;
const path = require('path');
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

async function saveData (res, bookObj, messages) {
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

  res.json({message: 'New book created', messages});
}

async function loadBooks (req, res) {
  let id = req.params.id;
  let loadedBook;

  try {
    loadedBook = await Book.findById(id);
  } catch (err) {
    res.render('error', {
      error: `This book does not exist!`
    });
    return;
  }

  if (loadedBook == null) {
    res.render('error', {
      error: `This book does not exist!`
    });
  } else {
    let authorIds = loadedBook.authors;
    let authors = [];

    for (let authorId of authorIds) {
      let author = await Author.findById(authorId);
      authors.push({
        name: author.name,
        id: author._id
      });
    }

    res.render('details', {
      authors: authors,
      book: loadedBook
    });
  }
}

async function updateBook (res, bookObj, messages) {
  let loadedBook = await Book.findById(bookObj.id);
  let oldIds = loadedBook.authors;

  // Get the new authors
  let authors = bookObj.authors.split(/\s*,\s*/).filter(el => el !== '');
  // Here we will store the ids of new authors
  let newIds = [];

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
    newIds.push(author._id);
  }

  let idsToString = newIds.map(i => i.toString());

  oldIds = oldIds.map(el => el.toString());
  for (let id of oldIds) {
    if (idsToString.indexOf(id) === -1) {
      let missingAuthor = await Author.findById(id);
      let bookToRemove = missingAuthor.books.indexOf(bookObj.id);
      missingAuthor.books.splice(bookToRemove, 1);
      await missingAuthor.save();
    }
  }
  // Map all author ids, so we could add them to the newly created book
  let ids = newIds.map(el => ObjectId(el));

  loadedBook.authors = ids;
  loadedBook.title = bookObj.title;
  loadedBook.releaseYear = bookObj.year;

  await loadedBook.save();

  for (let authorId of ids) {
    if (oldIds.includes(authorId.toString()) === false) {
      let updated = await Author.findById(authorId);
      updated.books.push(loadedBook._id);
      await updated.save();
    }
  }

  res.json({message: 'The book was edited', messages});
}

router
  .route('/books')
  .get((req, res) => {
    Book.find().then(books => {
      res.render('list-books', {
        books: books
      });
    });
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

        messages.title = '';
        messages.author = '';
        messages.year = '';
        messages.image = '';
        saveData(res, book, messages);
      }
    });
  });

router
  .route('/books/:id')
  .get((req, res) => {
    loadBooks(req, res);
  })
  .put((req, res) => {
    let bookId = req.params.id;

    let form = formidable.IncomingForm();

    let title, year, authors;
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
        messages.year = 'Year should be a positive integer';
      }

      if (hasInvalidField) {
        res.status(400).json(messages);
      } else {
        let book = {
          id: bookId,
          title: title,
          authors: authors,
          year: parsedYear
        };

        messages.title = '';
        messages.author = '';
        messages.year = '';
        messages.image = '';
        updateBook(res, book, messages);
      }
    });
  })
  .delete((req, res) => {
    let resourceId = req.params.id;
    let authorIds;

    deleteResource();

    async function deleteResource () {
      let book;

      try {
        book = await Book.findById(resourceId);
        authorIds = book.authors;
      } catch (err) {
        res.status(400).json({message: 'Cannot find this book!'});
        return;
      }

      try {
        await book.remove();
      } catch (err) {
        res.status(400).json({message: 'Error occured while deleting a book!'});
        return;
      }

      let authors;
      try {
        authors = await Author.where('_id').in(authorIds);

        for (let author of authors) {
          let bookIndex = author.books.indexOf(book._id);
          author.books.splice(bookIndex, 1);
          await author.save();
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Error occured while deleting a book!'});
        return;
      }

      res.json({message: 'Book deleted successfully!'});
    }
  });

module.exports = router;
