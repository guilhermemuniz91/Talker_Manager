const express = require('express');

const router = express.Router();

const { 
  getAllTalkers, 
  getTalkersById,
  writeNewTalker,
} = require('../utils/fsTalker');

const { 
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  rateValueValidation,
} = require('../middlewares/talkerValidation');
 
router.get('/', async (req, res) => {
  const talkerData = await getAllTalkers();  
  return res.status(200).json(talkerData); 
});
  
router.get('/:id', async (req, res) => {
  const talkerData = await getTalkersById(req.params.id);
  if (talkerData) {
    return res.status(200).json(talkerData);
  } 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});
  
router.post(
  '/',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  rateValueValidation, async (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    try {
      const existingData = await getAllTalkers();
      const newTalker = {
        name,
        age,
        id: existingData.length + 1,
        talk: {
          watchedAt,
          rate,
        },
      };
      await writeNewTalker(newTalker);
      return res.status(201).json(newTalker);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
);

module.exports = router;