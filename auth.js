const jwt = require('jsonwebtoken');

const userModel = require('./model/user');

const createTokens = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });

  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

  const tokens = {
    accessToken,
    refreshToken,
  };

  return tokens;
};

const refreshTokens = (token) => {
  let userId = -1;

  try {
    const { id } = jwt.decode(token);
    userId = id;
  } catch (err) {
    console.log('REFRESH 토큰도 만료 되었습니다. 다시 로그인을 해야 합니다.');
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = userModel.id === userId;
  if (!user) {
    return {};
  }

  try {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return {};
  }

  const newToken = createTokens(userId);

  return {
    ...newToken,
    id: userId,
  };
};

module.exports = {
  createTokens,
  refreshTokens,
};
