const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Customer, validate} = require('../models/customer')



router.get('/', async(req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  
  res.send(customers);
});

router.post('/', auth, async (req, res) => {

  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  let customer = new Customer({ 
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold 
  });
  customer = await customer.save();
  res.send(customer);

});

router.put('/:id', auth,  async(req, res)=>{

  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findOneAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold 
  }, { new: true });
  if (!customer) return res.status(404).send("The customer with the given ID doesn't exist");

  res.send(customer);
})

router.get('/:id', async(req, res) => {
  let customer = await Customer.find(req.params.id);
  if (!customer) return res.status(404).send("The customer with the given ID doesn't exist");
  res.send(customer);
});

router.delete('/:id', async(req, res) => {
  let customer = await Customer.findOneAndDelete(req.params.id);
  if (!customer) return res.status(404).send("The customer with the given ID doesn't exist");
  res.send(customer);
})


module.exports = router;