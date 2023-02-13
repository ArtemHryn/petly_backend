const Joi = require("joi");

const RegisterUserSchema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
});

module.exports = RegisterUserSchema;
