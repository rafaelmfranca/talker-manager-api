const STATUS_CODE = require('../constants/httpStatus');

function errorMiddleware(err, _req, res, _next) {
  if (err.code && err.status) {
    return res.status({ message: err.message, code: err.code });
  }
  res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    message: err.message,
  });
}

module.exports = errorMiddleware;
