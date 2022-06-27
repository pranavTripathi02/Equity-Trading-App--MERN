const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  CIN: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  shareholder: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  investors: [
    {
      type: Array,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Company', CompanySchema);
