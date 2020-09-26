const { ObjectId } = require('mongodb');
const messages = require('../utils/messages');
const { BadRequestError } = require('../errors/index');

module.exports.verifyArticleId = (req, res, next) => (ObjectId.isValid(req.params.articleId)
  ? next()
  : next(new BadRequestError(messages.article.idIsNotValid)));
