const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide Name'],
    maxlength: 20,
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      massage: 'Please provide a valid email address',
    },
    required: [true, 'Please provide email'],
    maxlength: 20,
    unique: [true, 'Email exists'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  role: {
    type: String,
    enum: ['admin', 'investor', 'shareholder'],
    default: 'investor',
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  investedCompanies: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Company',
    },
  ],
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
