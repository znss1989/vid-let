const mongoose = require('mongoose');
const Joi = require('joi');

const {genreSchema} = require('./genre');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    requried: true
  },
  numberInStock: {
    type: Number,
    default: 0,
    min: 0,
    max: 999
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 999
  }
});

const Movie = mongoose.model('Movie', movieSchema);

const validateMovie = (input) => {
  const scheme = {
    name: Joi.string().min(1).max(255).requried(),
    genreId: Joi.string().required(), // different from mongoose schema since this is for client
    numberInStock: Joi.number().min(0).max(999),
    dailyRentalRate: Joi.number().min(0).max(999)
  };
};

module.exports = {
  Movie,
  validateMovie
};