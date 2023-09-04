const fs = require('fs').promises;
const path = require('path');

async function readTalkerData() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, '..', 'talker.json'), 
        'utf-8');
        const dataTratada = JSON.parse(data);
        console.log(dataTratada);
        return dataTratada;
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

module.exports = {
    getAllTalkers,
    getTalkersById,
};
