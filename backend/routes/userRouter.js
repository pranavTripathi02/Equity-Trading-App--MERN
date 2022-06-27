const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getCurrentUser,
} = require('../controllers/userController');
const {
  authoriseUser,
  authoriseRoles,
} = require('../middleware/Authorization');

router.route('/all').get(authoriseUser, authoriseRoles('admin'), getAllUsers);
router.route('/me').get(authoriseUser, getCurrentUser);

module.exports = router;
