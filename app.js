const express = require('express');

const genres = require('./genres');
const utils = require('./utils');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to Vidly");
});

app.post('/api/genres', (req, res) => {
  const {error} = utils.validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

const port = proces.env.port || 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}...`);
});