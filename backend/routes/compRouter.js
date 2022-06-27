const express = require('express');
const router = express.Router();

const {
  getAllCompanies,
  getCompany,
  updateCompany,
} = require('../controllers/compController');

router.route('/').get(getAllCompanies);
router.route('/details').get(getCompany).patch(updateCompany);
module.exports = router;
