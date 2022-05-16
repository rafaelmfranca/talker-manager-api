const STATUS_CODE = require('../constants/httpStatus');
const MESSAGE = require('../constants/messages');

const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

function validateName(name, res) {
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
}

function validateAge(age, res) {
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
}

function validateTalkRate(rate, res) {
  if (rate < 1 || rate > 5) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.INVALID_RATE });
  }
}

function validateTalk(talk, res) {
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.MANDATORY_TALK });
  }

  if (!dateRegex.test(talk.watchedAt)) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: MESSAGE.INVALID_DATE });
  }

  validateTalkRate(talk.rate, res);
}

function validateCreateTalker(req, res, next) {
  const { name, age, talk } = req.body;

  validateName(name, res);
  validateAge(age, res);
  validateTalk(talk, res);

  req.talker = { name, age, talk };

  next();
}

module.exports = validateCreateTalker;
