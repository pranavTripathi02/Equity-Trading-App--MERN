const createTokenUser = (user) => {
  return {
    name: user.name,
    userID: user._id,
    role: user.role,
    investedCompanies: user.investedCompanies,
  };
};

module.exports = createTokenUser;
