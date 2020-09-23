const { Joi } = require('celebrate');
const { messages } = require('../utils');

module.exports.passwordSchema = Joi.string().required().min(8).messages({
  'string.empty': messages.schemas.isEmpty,
  'any.required': messages.schemas.isRequired,
  'string.min': messages.user.passwordTooShort,
});
