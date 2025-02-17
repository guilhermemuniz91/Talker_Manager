const express = require('express');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const talkerRouter = require('./routes/talkerRouter');
const loginRouter = require('./routes/loginRouter');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Online, running on ${PORT}`);
});

app.use('/talker', talkerRouter);
app.use('/login', loginRouter);