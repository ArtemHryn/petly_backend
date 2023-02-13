const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (email, verificationToken) => {
  const msg = {
    // to: email,
    // from: "olyanegrych@gmail.com",
    // subject: "Thank you for the registration",
    // text: `Please, confirm your email address http://localhost:3000/auth/verify/${verificationToken}`,
    // html: `Please, <a href="http://localhost:3000/auth/verify/${verificationToken}">confirm</a> your email address`,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully!");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendMail;
