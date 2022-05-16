const { getTalkers } = require('./fs');

async function filterTalkersByName(query) {
  const talkers = await getTalkers();

  const filteredTalkers = talkers.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase()));

  return filteredTalkers;
}

module.exports = filterTalkersByName;
