const STATUS_CODE = require('../constants/httpStatus');
const MESSAGE = require('../constants/messages');

function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ message: MESSAGE.MANDATORY_TOKEN });
  }

  if (authorization.length !== 16) {
    return res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ message: MESSAGE.INVALID_TOKEN });
  }

  next();
}

module.exports = validateToken;
