const express = require('express');

const router = express.Router();

const { 
  getAllTalkers, 
  getTalkersById,
  writeNewTalker,
  deleteTalker,
  // updateTalkerData,
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
      const actualTalkerData = await getAllTalkers();
      const newTalker = {
        name,
        age,
        id: actualTalkerData.length + 1,
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

// router.put(
//   '/:id',
//   tokenValidation,
//   nameValidation,
//   ageValidation,
//   talkValidation,
//   watchedAtValidation,
//   rateValidation,
//   rateValueValidation, async (req, res) => {
//     const { id } = req.params;
//     const { name, age, talk } = req.body;
//     const { watchedAt, rate } = talk;
//     try {
//       const updatedTalker = {
//         name,
//         age,
//         id: Number(id),
//         talk: {
//           watchedAt,
//           rate,
//         },
//       };
//       await updateTalkerData(Number(id), updatedTalker);
//       return res.status(200).json(updatedTalker);
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
//   },
// );

router.delete('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(Number(id));
  return res.status(204).end();
});

module.exports = router;