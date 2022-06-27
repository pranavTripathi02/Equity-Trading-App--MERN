const express = require('express');
const router = express.Router();

const {
  register,
  verifyEmail,
  login,
  logout,
} = require('../controllers/authController');

router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/login', login);
router.delete('/logout', logout);

module.exports = router;
