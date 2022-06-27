const express = require('express');
const { StatusCodes } = require('http-status-codes');
const customError = require('../error');
const Company = require('../models/Company');
const User = require('../models/User');

const getAllCompanies = async (req, res) => {
  // const unregCompanies = await Company.find({ isVerified: false });
  // const regCompanies = await Company.find({ isVerified: true });
  const queryObj = {};
  const { opt } = req.query;
  if (opt) queryObj.isVerified = opt;
  const companies = await Company.find(queryObj);
  const investedCompanies = await User.find({ user: req.user });
  // console.log('invC', investedCompanies);
  res.status(StatusCodes.OK).json({ companies, investedCompanies });
};

const getCompany = async (req, res) => {
  const { id: companyID } = req.query;
  // console.log(req.query);
  // console.log(companyID);
  const company = await Company.findById({ _id: companyID });
  if (!company)
    throw new customError.NotFoundError(
      `No companies match with id ${companyID}`
    );
  res.status(StatusCodes.OK).json(company);
};

const updateCompany = async (req, res) => {
  const { user, id: companyID, role } = req.body;
  console.log(req.body);
  const company = await Company.findById({ _id: companyID });
  if (company.shareholder && role === 'shareholder') {
    throw new customError.BadRequestError(`Company Shareholder Exists`);
  } else if (!company.shareholder && role === 'shareholder') {
    await company.update({ isVerified: true, shareholder: user });
  } else if (role === 'investor') {
    await company.update({ investors: [...investors, user] });
  }
  console.log(data);
  res.end();
};

module.exports = { getAllCompanies, getCompany, updateCompany };
