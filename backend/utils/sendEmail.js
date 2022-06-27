const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerTransportConfig');

const sendEmail = async ({ to, subject, html }) => {
  // let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Equity Trading" <noreply@equity-trading.com>',
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
