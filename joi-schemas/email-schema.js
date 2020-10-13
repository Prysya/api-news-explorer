const { Joi } = require('celebrate');
const validator = require('validator');
const { messages } = require('../utils');

const checkEmail = (value) => {
  if (!validator.isEmail(value)) {
    throw new Error(messages.schemas.emailIsNotValid);
  }
  return value;
};

module.exports.emailSchema = Joi.string()
  .required()
  .custom(checkEmail, 'Валидация email')
  .messages({
    'string.empty': messages.schemas.isEmpty,
    'any.required': messages.schemas.isRequired,
  });
