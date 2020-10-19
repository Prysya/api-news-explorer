const escape = require('escape-html');
const Article = require('../models/article');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/index');
const { messages } = require('../utils');

module.exports.getUserArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });

    res
      .status(200)
      .send({ status: '200', data: articles, totalResults: articles.length });
  } catch (err) {
    next(err);
  }
};

module.exports.createArticle = async (req, res, next) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;

    const article = await Article.create({
      keyword: escape(keyword),
      title: escape(title),
      text: escape(text),
      date: escape(date),
      source: escape(source),
      link,
      image,
      owner: req.user._id,
    });
    await res.status(201).send({
      status: '201',
      message: messages.article.isCreated,
      data: {
        id: article._id,
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      },
    });
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
      throw new ForbiddenError(messages.auth.notAuthorised);
    }

    await Article.deleteOne(article);
    res
      .status(200)
      .send({ status: '200', message: messages.article.isDeleted });
  } catch (err) {
    next(err);
  }
};
