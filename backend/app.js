const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const options = {
  origin: [
    'http://localhost:3000',
    'http://maria-silver2015.nomorepartiesxyz.ru',
    'https://maria-silver2015.nomorepartiesxyz.ru',
    'http://maria-silver2015-back.nomorepartiesxyz.ru',
    'https://maria-silver2015-back.nomorepartiesxyz.ru',
    'https://github.com/Maria-Serebrennikova',
  ],
  credentials: true,
};

const regular = /(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/;

const { PORT = 3001 } = process.env;

const app = express();

app.use('*', cors(options));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regular),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);

app.use((req, res, next) => {
  next(new NotFound('Непредвиденная ошибка'));
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
