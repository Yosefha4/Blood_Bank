const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, sendTo, sendForm) => {
  const transPorter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: "535",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const emailOptions = {
    from: sendForm,
    to: sendTo,
    subject: subject,
    html: message,
  };

  //Send Email
  transPorter.sendMail(emailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
module.exports = sendEmail;
