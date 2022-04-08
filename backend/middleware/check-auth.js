const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) next(new HttpError('Please authenticate!'));
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.userData = { userId: decodedToken.userId };
  next();
};
