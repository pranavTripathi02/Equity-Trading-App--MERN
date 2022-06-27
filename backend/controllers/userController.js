const { StatusCodes } = require('http-status-codes');
const { find } = require('../models/User');
const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};

const getCurrentUser = async (req, res) => {
  console.log('usercontroller', req.user);
  // const user = await User.findById({ _id: req.user });
  // console.log(user);
  res.status(StatusCodes.OK).json({ user: req.user });
};

// const getCurrentUserCompanies = async (req, res) => {
//   // console.log('usercontroller', req.user);
//   res.status(StatusCodes.OK).json({ user: req.user });
// };

module.exports = { getCurrentUser, getAllUsers };
