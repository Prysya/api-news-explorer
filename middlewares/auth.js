const { verifyToken } = require('../utils/token');
const { UnauthorizedError } = require('../errors/index');
const { messages } = require('../utils/messages');

module.exports = (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError(messages.auth.notAuthorised);
    }

    token = authorization.replace('Bearer ', '');
  }

  let payload;

  try {
    payload = verifyToken(token);
  } catch (err) {
    return next(new UnauthorizedError(messages.auth.notAuthorised));
  }

  req.user = payload;

  return next();
};
