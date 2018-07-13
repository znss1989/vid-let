const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 15
  },
  isGold: {
    type: Boolean,
    default: false
  }
});

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (input) => {
  const scheme = {
    name: Joi.string().min(2).max(127).required(),
    phone: Joi.string().min(6).max(15).required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(input, scheme);
};

module.exports = {
  Customer,
  validateCustomer
};