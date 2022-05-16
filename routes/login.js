const express = require('express');
const STATUS_CODE = require('../constants/httpStatus');
const generateToken = require('../helpers/generateToken');
const { validateLogin } = require('../middlewares');

const router = express.Router();

router.route('/').post(validateLogin, (_req, res) => {
  const token = generateToken();
  res.status(STATUS_CODE.OK).json({ token });
});

module.exports = router;
