const express = require('express');
const Joi = require('joi');

const genres = require('./genres');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to Vidly");
});

const port = proces.env.port || 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}...`);
});