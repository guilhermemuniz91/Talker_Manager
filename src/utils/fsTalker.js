const fs = require('fs').promises;
const path = require('path');

async function readTalker() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, '..', 'talker.json'), 'utf-8');
        console.log(data);
    } catch (error) {
        console.error(`Erro na leitura do arquivo ${error}`);
    }
}

readTalker();