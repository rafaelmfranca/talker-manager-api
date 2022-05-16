const STATUS_CODE = require('../constants/httpStatus');
const MESSAGE = require('../constants/messages');

const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

function validateName(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.MANDATORY_NAME });
  }

  if (name.length < 3) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.INVALID_NAME });
  }

  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.MANDATORY_AGE });
  }

  if (age < 18) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.INVALID_AGE });
  }

  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.MANDATORY_TALK });
  }

  if (!dateRegex.test(talk.watchedAt)) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.INVALID_DATE });
  }

  next();
}

function validateTalkRate(req, res, next) {
  const {
    talk: { rate },
  } = req.body;

  if (rate < 1 || rate > 5) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.INVALID_RATE });
  }

  next();
}

const validateCreateTalker = [
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
];

module.exports = validateCreateTalker;
