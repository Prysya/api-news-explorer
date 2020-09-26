const bcrypt = require('bcryptjs');
const escape = require('escape-html');
const { createToken, messages } = require('../utils');
const User = require('../models/user');
const { BadRequestError, NotFoundError } = require('../errors');

module.exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      () => new NotFoundError(messages.user.idIsNotFound),
    );
    res.send({ data: { name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: escape(name),
      email,
      password: hash,
    });

    res.send({
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(new BadRequestError(err.message));
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);

    const token = await createToken(user);

    await res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    });

    await res.status(200).send({ message: messages.auth.authIsSuccess });
  } catch (err) {
    next(err);
  }
};
