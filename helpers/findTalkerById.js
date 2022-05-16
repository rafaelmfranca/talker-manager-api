const { getTalkers } = require('./fs');

async function findTalkerById(id) {
  const talkers = await getTalkers();

  const specifiedTalker = talkers.find((talker) => talker.id === Number(id));

  return specifiedTalker;
}

module.exports = findTalkerById;
