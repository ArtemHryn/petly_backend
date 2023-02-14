const Joi = require("joi");

const RegisterUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(32).required(),
  name: Joi.string(),
  city: Joi.string(),
  phone: Joi.string(),
});

module.exports = RegisterUserSchema;
