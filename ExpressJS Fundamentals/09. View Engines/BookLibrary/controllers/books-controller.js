const express = require('express');
const formidable = require('formidable');
const path = require('path');

let router = express.Router();
let uploadsFolder = path.normalize(
  path.join(__dirname, '/public/uploads')
);

router
  .route('/books')
  .get((req, res) => {
    res.send(req.path);
  })
  .post((req, res) => {
    let form = formidable.IncomingForm({
      uploadDir: uploadsFolder,
      keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }

      let title = fields.bookTitle;
      let year = fields.bookYear;
      let author = fields.bookAuthor;
      console.log(fields);
      console.log(files);

      //TODO: Make each field validations
      if (fields.bookTitle.length === 0) {
        res.status(400).json({message: 'Title cannot be empty'});
      } else {
        res.json({message: 'Testvam'});
      }
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

module.exports = router;