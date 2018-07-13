const Joi = require('joi');

const validateGenre = (input) => {
  const scheme = {
    name: Joi.string().min(2).max(50).required()
  };
  return Joi.validate(input, scheme);
};

const validateCustomer = (input) => {
  const scheme = {
    name: Joi.string().min(2).max(127).required(),
    phone: Joi.string().min(6).max(15).required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(input, scheme);
};

module.exports = {
  validateGenre,
  validateCustomer
};

