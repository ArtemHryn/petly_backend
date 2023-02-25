const Joi = require('joi');

const ResetPasswordSchema = Joi.object({
  password: Joi.string().min(7).max(32).required(),
});

module.exports = ResetPasswordSchema;
