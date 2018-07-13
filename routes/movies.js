const express = require('express');

const {Movie, validateMovie} = require('../models/movie');

const router = express.Router();

router.post('/', async (req, res) => {
  const {error} = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {title, genre, numberInStock=0, dailyRentalRate=0} = req.body;
  let movie = new Movie({
    title,
    genre,
    numberInStock,
    dailyRentalRate
  });
  movie = await movie.save();
});

router.get('/', async (req, res) => {
  const movies = await Movie
    .find();
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send("Movie not found.");
  res.send(movie);
})

router.put('/:id', async (req, res) => {
  const {error} = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {title, genre, numberInStock=0, dailyRentalRate=0} = req.body;
  const movie = await Movie.findByIdAndUpdate(req.body.id, {
    title,
    genre,
    numberInStock,
    dailyRentalRate
  }, {
    new: true
  });

  if (!movie) return res.status(404).send("Movie not found.");
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Moive.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send("Movie not found");
  res.send(movie)
});

module.exports = router;