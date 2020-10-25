const { Joi } = require('celebrate');
const { emailSchema } = require('./email-schema');
const { linkSchema } = require('./link-schema');
const { objectId } = require('./object-id-schema');
const { passwordSchema } = require('./password-schema');
const { textSchema } = require('./text-schema');

const registrationSchema = Joi.object().keys({
  name: textSchema.max(30),
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
});

const objectIdSchema = Joi.object().keys({
  articleId: objectId,
});

const articleSchema = Joi.object().keys({
  keyword: textSchema.max(30),
  title: textSchema,
  text: textSchema,
  date: textSchema.max(30),
  source: textSchema.max(30),
  link: linkSchema,
  image: linkSchema,
});

module.exports = {
  registrationSchema,
  loginSchema,
  objectIdSchema,
  articleSchema,
};
