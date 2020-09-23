const router = require('express').Router();

const bodyParser = require('./body-parser');
const cookieParser = require('./cookie-parser');
const helmet = require('./helmet');
const rateLimiter = require('./rate-limiter');
const cors = require('./cors');

router.use(cors);
router.use(bodyParser);
router.use(cookieParser);
router.use(helmet);
router.use(rateLimiter);

module.exports = router;
