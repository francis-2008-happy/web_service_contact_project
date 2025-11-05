const express = require('express');
const mongodb = require('./data/database');
const app = express();
require ('dotenv').config();
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
   app.listen(port);
  console.log(`Database is Listening and Server is running on port ${port}`);
};
  }
);

