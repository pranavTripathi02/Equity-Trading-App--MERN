const attachCookies = require('./attachCookies');
const { createJWT, isTokenValid } = require('./createVerifyJWT');
const sendEmail = require('./sendEmail');
const sendVerificationEmail = require('./sendVerificationEmail');
const createTokenUser = require('./createToken');

module.exports = {
  attachCookies,
  createJWT,
  isTokenValid,
  sendEmail,
  sendVerificationEmail,
  createTokenUser,
};
