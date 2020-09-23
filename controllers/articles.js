const escape = require('escape-html');
const Article = require('../models/article');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors/index');
const { messages } = require('../utils');

module.exports.getUserArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res.send(articles);
  } catch (err) {
    next(err);
  }
};

module.exports.createArticle = async (req, res, next) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;

    await Article.create({
      keyword: escape(keyword),
      title: escape(title),
      text: escape(text),
      date: escape(date),
      source: escape(source),
      link,
      image,
      owner: req.user._id,
    });
    await res.status(201).send({ message: messages.article.isCreated });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(messages.article.isNotValid));
    }

    next(err);
  }
};

module.exports.deleteUserArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId)
      .orFail(() => new NotFoundError(messages.article.idIsNotFound))
      .select('+owner');

    if (String(article.owner._id) !== req.user._id) {
      throw new UnauthorizedError(messages.auth.notAuthorised);
    }

    await Article.deleteOne(article);
    res.send({ message: messages.article.isDeleted });
  } catch (err) {
    next(err);
  }
};
