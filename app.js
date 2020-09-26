require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { dbOptions, dbUrl, port } = require('./utils');

const middlewaresRouter = require('./middlewares');
const { errorsHandler } = require('./middlewares/errors-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(dbUrl, dbOptions);

app.use(middlewaresRouter);

app.use(requestLogger);

app.use(router);

router.use(errorLogger);

router.use(errors());

router.use(errorsHandler);

app.listen(port);
