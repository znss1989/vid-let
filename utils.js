const Joi = require('joi');

const validateGenre = (input) => {
  const scheme = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(input, scheme);
};

module.exports = {
  validateGenre
};

