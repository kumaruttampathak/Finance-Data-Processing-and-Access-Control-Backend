const Joi = require('joi');

const userValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Admin', 'Analyst', 'Viewer').required(),
  status: Joi.string().valid('Active', 'Inactive')
});

const recordValidation = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  notes: Joi.string()
});

module.exports = { userValidation, recordValidation };