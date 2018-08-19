const express = require('express');
const port = 5000;
const app = express();

const config = require('./config/config');
const db = require('./config/database');
const appConfig = require('./config/express');
const passportConfig = require('./config/passport');

const environment = process.env.NODE_ENV || 'development';

db(config[environment]);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

appConfig(app, config.development);
passportConfig();
