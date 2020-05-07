const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const { createTokens } = require('./auth');
const { protect, checkAuth } = require('./middleware');

const user = require('./model/user');
const fruits = require('./model/fruits');

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(checkAuth);

app.post('/login', (req, res) => {
  const { id, password } = req.body;

  if (user.id === id && user.password === password) {
    const tokens = createTokens(id);

    res.cookie('access_token', tokens.accessToken);
    res.cookie('refresh_token', tokens.refreshToken);

    res.set('x-token', 'newTokens.token');
    res.set('x-refresh-token', 'newTokens.refreshToken');

    return res.status(200).json({
      status: 'success',
      tokens,
    });
  }

  res.status(401).json({
    status: 'failure',
    message: 'Invalid id or password!',
  });
});

app.use(protect);

app.get('/secure', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      fruits,
    },
  });
});

module.exports = app;
