const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, SECRET);

module.exports = { createJWT, isTokenValid };
