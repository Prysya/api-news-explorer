const router = require('express').Router();

const { logout } = require('../controllers/users');

router.post('/', logout);

router.exports = router;
