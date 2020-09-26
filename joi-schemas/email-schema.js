const { Joi } = require('celebrate');
const { messages } = require('../utils');

module.exports.emailSchema = Joi.string().required().email().messages({
  'string.empty': messages.schemas.isEmpty,
  'any.required': messages.schemas.isRequired,
  'string.email': messages.schemas.emailIsNotValid,
});
