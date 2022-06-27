const express = require('express');
const router = express.Router();

const {
  register,
  verifyEmail,
  login,
  logout,
} = require('../controllers/authController');
const { authoriseUser } = require('../middleware/Authorization');

router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/login', login);
router.delete('/logout', authoriseUser, logout);

module.exports = router;
