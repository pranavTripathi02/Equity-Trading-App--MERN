const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const url = `${origin}/auth/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<h2>Hello ${name}, welcome to Equity-Trading</h2><p>Please confirm your email address by clicking on the following link : <a href="${url}">Confirm Email</a></p>`;

  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `${message}`,
  });
};

module.exports = sendVerificationEmail;
