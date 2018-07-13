const express = require('express');

const {Customer, validateCustomer} = require('../models/customer');

const router = express.Router();

router.post('/', async (req, res) => {
  const {error} = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {name, phone='000000', isGold=false} = req.body;
  let customer = new Customer({
    name,
    phone,
    isGold
  });
  customer = await customer.save();
});

router.get('/', async (req, res) => {
  const customers = await Customer
    .find()
    .sort('name');
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send("Customer not found.");
  res.send(customer);
})

router.put('/:id', async (req, res) => {
  const {error} = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {name, phone='000000', isGold=false} = req.body;
  const customer = await Customer.findByIdAndUpdate(req.body.id, {
    name,
    phone,
    isGold
  }, {
    new: true
  });

  if (!customer) return res.status(404).send("Customer not found.");
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send("Customer not found");
  res.send(customer)
});

module.exports = router;