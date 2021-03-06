const express = require('express');

const {Genre, validateGenre} = require('../models/genre');

const router = express.Router();

router.post('/', async (req, res) => {
  const {error} = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({name: req.body.name});
  genre = await genre.save(); // fetch result from database with _id
  res.send(genre);
});

router.get('/', async (req, res) => {
  const genres = await Genre
    .find()
    .sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("Genre not found.");
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const {error} = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, {
    new: true
  });

  if (!genre) return res.status(404).send("Genre not found.");
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send("Genre not found.");
  res.send(genre);
});

module.exports = router;