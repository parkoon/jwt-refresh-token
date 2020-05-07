const jwt = require('jsonwebtoken');

const { refreshTokens } = require('./auth');

exports.protect = (req, res, next) => {
  console.log('!!', req.user);
  if (!req.user) {
    return res.status(401).json({
      status: 'failure',
      message: 'You are not authorized to access resources',
    });
  }

  next();
};

exports.checkAuth = (req, res, next) => {
  const accessToken = req.cookies['access_token'];
  if (accessToken) {
    try {
      const id = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      req.user = id;
      console.log('ACCESS 토큰이 유효한 사용자 입니다.');
      next();
    } catch (err) {
      // TokenExpiredError
      console.log('ACCESS 토큰이 유효하지 않은 사용자 입니다.');
      console.log('REFRESH 토큰을 발급합니다.');

      const refreshToken = req.cookies['refresh_token'];

      const tokens = refreshTokens(refreshToken);

      res.cookie('access_token', tokens.accessToken);
      res.cookie('refresh_token', tokens.refreshToken);

      req.user = tokens.id;

      next();
    }
  }
  next();
};
