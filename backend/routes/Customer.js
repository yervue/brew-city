const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer')


router.post('/create', async (req, res) => {
    try {
      const customer = new Customer(req.body);
      await customer.save();
      res.status(201).send(customer);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });


 router.get('/', async (req, res) => {
    try {
      const customers = await Customer.find();
      res.send(customers);
    } catch (err) {
      res.status(500).send('Error fetching customers');
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).send('Customer not found');
      }
      res.send(customer);
    } catch (err) {
      res.status(500).send('Error fetching customer');
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!customer) {
        return res.status(404).send('Customer not found');
      }
      res.send(customer);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const customer = await Customer.findByIdAndDelete(req.params.id);
      if (!customer) {
        return res.status(404).send('Customer not found');
      }
      res.send(customer);
    } catch (err) {
      res.status(500).send('Error deleting customer');
    }
  });
  

  module.exports = router;
