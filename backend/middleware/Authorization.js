const customError = require('../error');
const Token = require('../models/Token');
const { isTokenValid, attachCookies } = require('../utils');

const authoriseUser = async (req, res, next) => {
  // console.log(req);
  const { refreshToken, accessToken } = req.signedCookies;
  // console.log(refreshToken, accessToken);

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);
    const existingToken = await Token.findOne({
      user: payload.user.userID,
      refreshToken: payload.refreshToken,
    });
    if (!existingToken || !existingToken?.isValid) {
      throw new customError.UnauthorizedError('Authentication Invalid');
    }
    attachCookies({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new customError.UnauthorizedError('Authentication Invalid');
  }
};

const authoriseRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new customError.UnauthorizedError('Not authorized to access');
    }
    next();
  };
};

module.exports = { authoriseUser, authoriseRoles };
