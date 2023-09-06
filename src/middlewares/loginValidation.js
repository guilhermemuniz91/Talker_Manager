const emailValidation = (req, res, next) => {
    const inputedEmail = req.body.email;
    if (!inputedEmail || inputedEmail.length === 0) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/i;
    if (!emailRegex.test(inputedEmail)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
  };
  
  const passwordValidation = (req, res, next) => {
    const inputedPassword = req.body.password;
    if (!inputedPassword || inputedPassword.length === 0) {
   return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
  }
    if (inputedPassword.length < 6) {
   return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
    next();
  };
  
  module.exports = { emailValidation, passwordValidation };