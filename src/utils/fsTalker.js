const fs = require('fs').promises;
const path = require('path');

async function readTalker() {
    try {
        // const data = JSON.parse(await fs.readFile(path.resolve(__dirname, '..', 'talker.json'), 
        // 'utf-8'));
        // console.log(data);
        // return data;
        const data = await fs.readFile(path.resolve(__dirname, '..', 'talker.json'), 
        'utf-8');
        const dataTratada = JSON.parse(data);
        console.log(dataTratada);
        return dataTratada;
    } catch (error) {
        console.error(`Erro na leitura do arquivo ${error}`);
    }
}

module.exports = {
    readTalker,
};
