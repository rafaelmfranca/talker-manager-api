const express = require('express');
const STATUS_CODE = require('./constants/httpStatus');
const errorMiddleware = require('./middlewares/error');

const PORT = '3000';
const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.status(STATUS_CODE.OK).send();
});

app.use('/talker', require('./routes/talker'));
app.use('/login', require('./routes/login'));

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
