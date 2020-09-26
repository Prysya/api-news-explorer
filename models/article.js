const mongoose = require('mongoose');
const validator = require('validator');
const { messages } = require('../utils');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Длинна ключевого слова должна быть от 2 до 30 символов'],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(text) {
        return !validator.isEmpty(text, { ignore_whitespace: true });
      },
      message: messages.schemas.isEmpty,
    },
  },
  title: {
    type: String,
    required: [true, 'Длинна заголовка должна быть от 2 до 30 символов'],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(text) {
        return !validator.isEmpty(text, { ignore_whitespace: true });
      },
      message: messages.schemas.isEmpty,
    },
  },
  text: {
    type: String,
    required: [true, 'Длинна статьи должна быть от 2 символов'],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(text) {
        return !validator.isEmpty(text, { ignore_whitespace: true });
      },
      message: messages.schemas.isEmpty,
    },
  },
  date: {
    type: String,
    required: [true, 'Длинна даты должна быть от 2 символов'],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(text) {
        return !validator.isEmpty(text, { ignore_whitespace: true });
      },
      message: messages.schemas.isEmpty,
    },
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: messages.schemas.wrongUrl,
    },
    required: [true, 'Ссылка на статью обязательна'],
  },
  image: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: messages.schemas.wrongUrl,
    },
    required: [true, 'Ссылка на изображение обязательна'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('articles', articleSchema);
