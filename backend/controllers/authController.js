const express = require('express');
const Token = require('../models/Token');
const User = require('../models/User');
const customError = require('../error');
const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');
const {
  attachCookies,
  sendVerificationEmail,
  createTokenUser,
} = require('../utils/index');
require('dotenv').config();

const register = async (req, res) => {
  const { email, name, password } = req.body;
  // console.log('*****************', email, name, password);
  const emailExists = await User.findOne({ email });
  if (emailExists)
    throw new customError.BadRequestError('Email already exists');
  const firstAccount = (await User.countDocuments({})) === 0;
  const role = firstAccount ? 'admin' : req.body.role;

  const verificationToken = crypto.randomBytes(20).toString('hex');
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const PORT = process.env.PORT || 5000;
  const origin = `http://localhost:${PORT}/api/v1`;

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  });
};

const verifyEmail = async (req, res) => {
  const { token, email } = req.query;
  console.log(req.body);
  // console.log('***********VerifyEmail: ', verificationToken, email);
  const user = await User.findOne({ email });
  if (!user || user.verificationToken != token)
    throw new customError.UnauthorizedError('Verification Failed');

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new customError.BadRequestError(
      'Please provide both email and password'
    );

  const user = await User.findOne({ email });
  if (!user) throw new customError.BadRequestError('User does not exist');

  if (!user.isVerified)
    throw new customError.BadRequestError('User not verified');

  const isPassCorrect = await user.comparePassword(password);
  if (!isPassCorrect)
    throw new customError.UnauthorizedError('Incorrect Password. Try again');

  const tokenUser = createTokenUser(user);

  let refreshToken = '';

  const tokenExists = await Token.findOne({ user: user._id });
  if (tokenExists) {
    const { isValid } = tokenExists;
    if (!isValid)
      throw new customError.UnauthorizedError('Invalid Credentials');
    refreshToken = tokenExists.refreshToken;
    attachCookies({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }
  refreshToken = crypto.randomBytes(12).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;

  const userToken = { refreshToken, ip, userAgent, user: user._id };
  await Token.create(userToken);
  attachCookies({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  console.log(req.user);
  await Token.findOneAndDelete({ user: req.user.userID });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'User logged out!' });
};

module.exports = { register, verifyEmail, login, logout };
