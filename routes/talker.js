const express = require('express');
const rescue = require('express-rescue');
const STATUS_CODE = require('../constants/httpStatus');
const { getTalkers } = require('../helpers/fs');

const router = express.Router();

router.route('/').get(
  rescue(async (_req, res) => {
    const talkers = await getTalkers();
    res.status(STATUS_CODE.OK).json(talkers);
  }),
);

module.exports = router;
