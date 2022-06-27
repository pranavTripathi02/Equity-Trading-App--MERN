const { createJWT } = require('./createVerifyJWT');

const attachCookies = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });
  const day = 1000 * 60 * 60 * 24;

  res
    .cookie('accessToken', accessTokenJWT, {
      httpOnly: true,
      signed: true,
      expires: new Date(Date.now() + day),
    })
    .cookie('refreshToken', refreshTokenJWT, {
      httpOnly: true,
      signed: true,
      expires: new Date(Date.now() + day * 30),
    });
};

module.exports = attachCookies;
