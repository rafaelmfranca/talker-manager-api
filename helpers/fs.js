const fs = require('fs').promises;

async function getTalkers() {
  try {
    const talkers = await fs.readFile('talker.json', 'utf8');
    return JSON.parse(talkers);
  } catch (err) {
    throw Error(err.message);
  }
}

async function addTalker(talker) {
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

async function editTalker(updatedTalker, id) {
  try {
    const talkers = await getTalkers();

    const updatedTalkers = talkers.map((talker) => {
      if (talker.id === Number(id)) {
        return {
          ...talker,
          ...updatedTalker,
        };
      }

      return talker;
    });

    await fs.writeFile('talker.json', JSON.stringify(updatedTalkers));
  } catch (err) {
    throw Error(err.message);
  }
}

async function deleteTalker(id) {
  try {
    const talkers = await getTalkers();

    const updatedTalkers = talkers.filter((talker) => talker.id !== Number(id));

    await fs.writeFile('talker.json', JSON.stringify(updatedTalkers));
  } catch (err) {
    throw Error(err.message);
  }
}

module.exports = { getTalkers, addTalker, editTalker, deleteTalker };
