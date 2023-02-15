const Joi = require("joi");

const addPetSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  date: Joi.string().required(),
  breed: Joi.string().min(3).max(16).required(),
  avatarURL: Joi.string(),
  comments: Joi.string().min(8).max(160),
});

module.exports = addPetSchema;
