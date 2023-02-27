const sgMail = require('@sendgrid/mail');
const resetPasswordTeamplate = require("../email/resetPasswordTeamplate")
const verificationAccountTeamplate = require('../email/verificationAccount')
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (email, way, verificationToken) => {
  const msg = {
    to: email,
    from: process.env.SENDER,
    subject: 'Thank you for the registration',
    html: verificationAccountTeamplate(way, verificationToken),
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent successfully!');
    })
    .catch(error => {
      console.error(error);
    });
};

const sendLinkResetPassword = async (email, way, resetToken) => {
  const msgReset = {
    to: email,
    from: process.env.SENDER, // Use the email address or domain you verified above
    subject: 'Reset your password',
    html: resetPasswordTeamplate(way, resetToken),
  };
  await sgMail
    .send(msgReset)
    .then(() => {
      console.log('Email sent successfully!');
    })
    .catch(error => {
      console.error(error);
    });
}


module.exports = { sendMail, sendLinkResetPassword };
