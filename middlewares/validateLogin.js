const STATUS_CODE = require('../constants/httpStatus');
const MESSAGE = require('../constants/messages');

const emailRegex = /^\S+@\S+\.\S+$/;

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      message: MESSAGE.MANDATORY_LOGIN_FIELD(email),
    });
  }
  if (!emailRegex.test(email)) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.INVALID_EMAIL });
  }
  if (password.length < 6) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.INVALID_PASSWORD });
  }

  next();
}

module.exports = validateLogin;
