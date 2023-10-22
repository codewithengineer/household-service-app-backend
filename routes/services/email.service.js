const nodemailer = require("nodemailer");
const { MAILUSER, MAILPASSWORD } = require("../../config/credits.env");

module.exports = async function email(email, subject, message, file) {
  const transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    requireTLS: true,
    secure: false,
    service: "outlook",
    port: 587,
    auth: {
      user: `${MAILUSER}`,
      pass: `${MAILPASSWORD}`,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  const mailOpions = {
    from: MAILUSER,
    to: email,
    subject: `${subject}`,
    html: `${message}`,
  };

  if (file?.name) {
    mailOpions.attachments = [
      {
        filename: file.name,
        href: file.path,
        contentType: "application/pdf",
      },
    ];
  }

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOpions, (err, result) => {
      if (err) {
        console.log("Error in Mail: ", err);
        reject(err);
      } else {
        console.log("Email sent: ", result.response);
        resolve(true);
      }
    });
  });
};
