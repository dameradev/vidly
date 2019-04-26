const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  isGold: {
    type:Boolean,
    default: false
  }
}));

function validateCustomer(customer) {
  const customerSchema = {
    name: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(5).max(255).required(),
    isGold: Joi.boolean()
  }

  return Joi.validate(customer, customerSchema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;