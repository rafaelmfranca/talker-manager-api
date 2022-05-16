const fs = require('fs').promises;

async function getTalkers() {
  try {
    const talkers = await fs.readFile('talker.json', 'utf8');
    return JSON.parse(talkers);
  } catch (err) {
    throw Error(err.message);
  }
}

async function updateTalkers(talker) {
  try {
    const talkers = await getTalkers();

    const talkerWithId = {
      id: talkers.length + 1,
      ...talker,
    };

    talkers.push(talkerWithId);
    await fs.writeFile('talker.json', JSON.stringify(talkers));

    return talkerWithId;
  } catch (err) {
    throw Error(err.message);
  }
}

module.exports = { getTalkers, updateTalkers };
