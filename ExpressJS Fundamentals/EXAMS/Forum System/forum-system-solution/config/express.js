const hbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const auth = require('../routes/auth');

const publicFolder = path.normalize(
  path.join(__dirname, '../', '/public')
);

module.exports = (app, config) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/public', express.static(publicFolder));

    app.engine('.hbs', hbs({
        extname: '.hbs',
        partialsDir: 'views/partials'
    }));
    app.set('view engine', '.hbs');

    app.get('/', (req, res) => {
        res.render('index');
    })

    app.use('/auth', auth);
}