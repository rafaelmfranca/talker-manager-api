const express = require('express');
const rescue = require('express-rescue');
const STATUS_CODE = require('../constants/httpStatus');
const MESSAGE = require('../constants/messages');
const findTalkerById = require('../helpers/findTalkerById');
const { getTalkers, addTalker, editTalker } = require('../helpers/fs');
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

      const talkerWithId = await addTalker(talker);

      res.status(STATUS_CODE.CREATED).json(talkerWithId);
    }),
  );

router
  .route('/:id')
  .get(
    rescue(async (req, res) => {
      const { id } = req.params;

      const talker = await findTalkerById(id);

      if (!talker) {
        res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ message: MESSAGE.TALKER_NOT_FOUND });
      }

      res.status(STATUS_CODE.OK).json(talker);
    }),
  )
  .put(
    validateToken,
    validateCreateTalker,
    rescue(async (req, res) => {
      const { id } = req.params;
      const { talker } = req;

      await editTalker(talker, id);

      res.status(STATUS_CODE.OK).json({ id: Number(id), ...talker });
    }),
  );

module.exports = router;
