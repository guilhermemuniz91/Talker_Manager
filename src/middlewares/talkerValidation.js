const tokenValidation = (req, res, next) => {
  const authenticationToken = req.headers.authorization;
  if (!authenticationToken) return res.status(401).json({ message: 'Token não encontrado' });
  if (authenticationToken.length !== 16 || typeof authenticationToken !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const nameValidation = (req, res, next) => {
  const inputedName = req.body.name;
  if (!inputedName || inputedName === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (inputedName.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = (req, res, next) => {
  const inputedAge = req.body.age;
  if (!inputedAge) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
    // if (typeof inputedAge !== 'number' || inputedAge < 18 || !Number.isInteger(inputedAge)) {
  if (!Number.isInteger(inputedAge) || inputedAge < 18) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const inputedTalk = req.body.talk;  
  if (!inputedTalk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const watchedAtValidation = (req, res, next) => {
  const inputedWatchedAt = req.body.talk.watchedAt;
  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;  
  if (!inputedWatchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateRegex.test(inputedWatchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }  
  next();
};

const rateValidation = (req, res, next) => {
  const inputedRate = req.body.talk.rate;
  if (inputedRate === undefined || inputedRate === '') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
};

const rateValueValidation = (req, res, next) => { // foi preciso fazer outra função pois dava erro de https://eslint.org/docs/latest/rules/complexity
  const inputedRate = req.body.talk.rate;
  if (inputedRate < 1 || inputedRate > 5 || !Number.isInteger(inputedRate)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5', 
    });
  }
  next(); 
};

module.exports = { 
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  rateValueValidation,
};