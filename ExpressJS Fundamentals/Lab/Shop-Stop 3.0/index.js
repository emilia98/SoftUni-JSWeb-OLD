const express = require('express');

// Require custom modules
const config = require('./config/config');
const database = require('./config/database');

const port = 3000;
let environment = process.env.NODE_ENV || 'development';

const app = express();

database(config[environment]);
require('./config/express')(app, config[environment]);
require('./config/routes')(app);

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
