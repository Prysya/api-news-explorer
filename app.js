require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { dbOptions, dbUrl, port } = require('./utils');

const app = express();

mongoose.connect(dbUrl, dbOptions);

app.use(router);

app.listen(port, () => console.log(`Слушаю порт ${port}`));
