const express = require('express');
const rescue = require('express-rescue');
const STATUS_CODE = require('../constants/httpStatus');
const MESSAGE = require('../constants/messages');
const { getTalkers, updateTalkers } = require('../helpers/fs');
const { validateToken, validateCreateTalker } = require('../middlewares');

const router = express.Router();

router
  .route('/')
  .get(
    rescue(async (_req, res) => {
      const talkers = await getTalkers();

      res.status(STATUS_CODE.OK).json(talkers);
    }),
  )
  .post(
    validateToken,
    validateCreateTalker,
    rescue(async (req, res) => {
      const { talker } = req;

      const talkerWithId = await updateTalkers(talker);

      res.status(STATUS_CODE.CREATED).json(talkerWithId);
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
