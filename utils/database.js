const { NODE_ENV, DATABASE_URL } = process.env;

module.exports.dbUrl = NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/newsexplorerdb';

module.exports.dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
