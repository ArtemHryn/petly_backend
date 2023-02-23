const Joi = require('joi');

const resendVerificationValidationSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = { resendVerificationValidationSchema };
