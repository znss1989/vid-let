const mongoose = require('mongoose');
const Joi = require('joi');

const {genreSchema} = require('./genre');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    requried: true
  },
  numberInStock: {
    type: Number,
    default: 0
  },
  dailyRentalRate: {
    type: Number,
    default: 0
  }
});

const Movie = mongoose.model('Movie', movieSchema);

const validateMovie = (input) => {
  const scheme = {
    name: Joi.string.min(1).requried(),
    genre: Joi.required(),
    // numberInStock: Joi.number(),
    // dailyRentalRate: Joi.number()
  };
};

module.exports = {
  Movie,
  validateMovie
};