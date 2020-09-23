const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  deleteUserArticle,
  getUserArticles,
  createArticle,
} = require('../controllers/articles');
const { articleSchema, objectIdSchema } = require('../joi-schemas/index');
const { verifyArticleId } = require('../middlewares/object-id');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/', getUserArticles);

router.post(
  '/',
  celebrate({
    body: articleSchema,
  }),
  createArticle,
);

router.delete(
  '/:articleId',
  celebrate({ params: objectIdSchema }),
  verifyArticleId,
  deleteUserArticle,
);

module.exports = router;
