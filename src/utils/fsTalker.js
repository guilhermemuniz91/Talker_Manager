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
    console.error(`Error writing file: ${err.message}`);
  }
};

const updateTalkerData = async (id, updatedTalker) => {
  const oldTalkerData = await readTalkerData();
  const updatedTalkerData = { id, ...updatedTalker };
  const updatedTalkersData = oldTalkerData.reduce((talkersList, currentTalker) => {
    if (currentTalker.id === updateTalkerData.id) return [...talkersList, updatedTalkerData];
    return [...talkersList, currentTalker];
  }, []);
  
  const updatedData = JSON.stringify(updatedTalkersData);
  try {
    await fs.writeFile(path.resolve(__dirname, '..', 'talker.json'), updatedData, 'utf-8');
    console.log(`Atualizou o talker com o id ${id}`);
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
  }
};

const deleteTalker = async (id) => {
  const oldTalkerData = await readTalkerData();
  const updatedTalkerData = oldTalkerData.filter((currentTalker) => currentTalker.id !== id);

  const updatedTalkersList = JSON.stringify(updatedTalkerData);
  try {
    await fs.writeFile(path.resolve(__dirname, '..', 'talker.json'), updatedTalkersList, 'utf-8'); 
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
  }
};

const searchTalkers = async (searchTerm) => {
  const talkersData = await getAllTalkers();
  const searchedTalkers = talkersData.filter((element) => element.name.includes(searchTerm));
  return searchedTalkers;
};

module.exports = {
  getAllTalkers,
  getTalkersById,
  writeNewTalker,
  updateTalkerData,
  deleteTalker,
  searchTalkers,
};
