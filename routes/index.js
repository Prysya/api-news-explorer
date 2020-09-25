const router = require('express').Router();

const register = require('./registration');
const authorization = require('./authorization');
const users = require('./users');
const articles = require('./articles');
const error = require('./errors');

router.use('/signin', authorization);
router.use('/signup', register);
router.use('/articles', articles);
router.use('/users', users);
router.use('*', error);

module.exports = router;
