const express = require('express');

const genres = require('./genres');
const utils = require('./utils');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to Vid-Let");
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

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");

  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");

  const {error} = utils.validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  genre.name = req.body.name;
  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}...`);
});