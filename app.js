const express = require('express');
const mongoose = require('mongoose');

const index = require('./routes/index');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/vid-let')
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch(err => {
    console.log("Connection to MongoDB failed...");
  });

app.use('/', index);
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}...`);
});