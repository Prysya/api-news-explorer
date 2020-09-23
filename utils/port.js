const { NODE_ENV, PORT } = process.env;

module.exports.port = NODE_ENV === 'production' ? PORT : 3000;
