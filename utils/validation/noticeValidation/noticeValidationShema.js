const Joi = require('joi');

const NoticeJoiSchema = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  category: Joi.string()
    .valid('lost-found', 'in-good-hands', 'sell')
    .required(),
  name: Joi.string().min(2).max(16),
  birthdate: Joi.date().greater('1-1-1980').less('now'),
  breed: Joi.string().min(2).max(24),
  sex: Joi.string().valid('male', 'female'),
  location: Joi.string().min(2).max(50),
  comments: Joi.string().min(8).max(120).required(),
  price: Joi.number().integer().min(1).max(1000000),
  imgURL: Joi.string(),
});

module.exports = NoticeJoiSchema;