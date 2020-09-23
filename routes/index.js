const { errors } = require('celebrate');
const router = require('express').Router();

const middlewaresRouter = require('../middlewares');
const { errorsHandler } = require('../middlewares/errors-handler');
const register = require('./registration');
const authorization = require('./authorization');
const users = require('./users');
const articles = require('./articles');
const error = require('./errors');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(middlewaresRouter);

router.use(requestLogger);

router.use('/signin', authorization);
router.use('/signup', register);
router.use('/articles', articles);
router.use('/users', users);
router.use('*', error);

router.use(errorLogger);

router.use(errors());

router.use(errorsHandler);

module.exports = router;
