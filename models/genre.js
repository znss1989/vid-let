const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', genreSchema);

const validateGenre = (input) => {
  const scheme = {
    name: Joi.string().min(2).max(50).required()
  };
  return Joi.validate(input, scheme);
};

module.exports = {
  Genre,
  genreSchema,
  validateGenre
};