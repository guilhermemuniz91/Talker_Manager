const express = require('express');

const router = express.Router();

const getToken = require('../utils/generateToken');

const { emailValidation, passwordValidation } = require('../validations/loginValidation');

router.post('/', emailValidation, passwordValidation, (req, res) => {
  try {
    return res.status(200).json({ token: getToken() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;