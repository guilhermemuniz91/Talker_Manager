const express = require('express');

const router = express.Router();

const { 
    getAllTalkers, 
    getTalkersById, 
 } = require('../utils/fsTalker');

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
  
// router.post('/login', (req, res) => {
//     const newLogin = { ...req.body };
//     logins.push(newLogin);
//   });

  module.exports = router;