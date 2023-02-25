const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (email, way, verificationToken) => {
  const msg = {
    to: email,
    from: 'fsdeveloper@meta.ua',
    subject: 'Thank you for the registration',
    text: `You have been registered on Petly, please, confirm your email address https://https://artemhryn.github.io/petly_frontend/${way}/${verificationToken}`,
    html: `You have been registered on Petly, please, <a href="https://https://artemhryn.github.io/petly_frontend/${way}/${verificationToken}">Confirm</a> your email address`,
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
    from: 'fsdeveloper@meta.ua', // Use the email address or domain you verified above
    subject: 'Reset your password',
    text: `You have been reset password on Petly, please, confirm your email address https://https://artemhryn.github.io/petly_frontend/${way}/${resetToken}`,
    html: `You have been reset password on Petly, please, <a href="https://https://artemhryn.github.io/petly_frontend/${way}/${resetToken}">Reset password</a> your email address`,
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
