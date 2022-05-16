const express = require('express');
const rescue = require('express-rescue');
const STATUS_CODE = require('../constants/httpStatus');
const MESSAGE = require('../constants/messages');
const { getTalkers } = require('../helpers/fs');

const router = express.Router();

router.route('/').get(
  rescue(async (_req, res) => {
    const talkers = await getTalkers();
    res.status(STATUS_CODE.OK).json(talkers);
  }),
);

router.route('/:id').get(
  rescue(async (req, res) => {
    const { id } = req.params;

    const talkers = await getTalkers();
    const specifiedTalker = talkers.find((talker) => talker.id === Number(id));

    if (!specifiedTalker) {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGE.TALKER_NOT_FOUND });
    }

    res.status(STATUS_CODE.OK).json(specifiedTalker);
  }),
);

module.exports = router;
