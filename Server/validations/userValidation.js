const Joi = require('joi');

// Define the schema for user validation
const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match.'
  }),
  role: Joi.string().valid('customer', 'beekeeper').required(),
});
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  
  module.exports = { userSchema, loginSchema }; 
