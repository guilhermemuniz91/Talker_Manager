const fs = require('fs').promises;
const path = require('path');

async function readTalkerData() {
  try {
    const response = await fs.readFile(path.resolve(__dirname, '..', 'talker.json'), 'utf-8');
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.error(`Erro na leitura do arquivo ${error}`);
  }
}

const getAllTalkers = async () => {
  const data = await readTalkerData();
  return data;
};
  
const getTalkersById = async (id) => {
  const data = await readTalkerData();
  const talker = data.find((element) => element.id === Number(id));
  return talker;
};

const writeNewTalker = async (newTalker) => {
  try {
    const oldTalkerData = await readTalkerData();
    oldTalkerData.push(newTalker);
    const updatedTalkerData = JSON.stringify(oldTalkerData);
    await fs.writeFile(path.resolve(__dirname, '..', 'talker.json'), updatedTalkerData, 'utf-8');
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
  }
};

module.exports = {
  getAllTalkers,
  getTalkersById,
  writeNewTalker,
};
