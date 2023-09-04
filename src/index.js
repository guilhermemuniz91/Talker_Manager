const express = require('express');
const { getAllTalkers,
  getTalkersById } = require('./utils/fsTalker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Online, running on ${PORT}`);
});

app.get('/talker', async (req, res) => {
  const talkerData = await getAllTalkers();

  return res.status(200).json(talkerData); 
});

app.get('/talker/:id', async (req, res) => {
    const talkerData = await getTalkersById(req.params.id);
    if (talkerData) {
      return res.status(200).json(talkerData);
    } 
   return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});