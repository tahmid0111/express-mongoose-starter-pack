const nodemailer = require("nodemailer");

exports.SendEmail = async (EmailTo, EmailText, EmailSubject) => {
  let transport = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: { user: "info@teamrabbil.com", pass: "~sR4[bhaC[Qs" },
    tls: { rejectUnauthorized: false },
  });

  let mailOption = {
    from: "Mediuum <info@mediuum.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };
  return await transport.sendMail(mailOption);
};
// ============================================================
// OTP related helpers
exports.CreateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

exports.SendOTP = async (email, code) => {
  let EmailText = `Your Verification Code is : ${code}`;
  let EmailSubject = "Email Verification";
  // sending user a verification code using node mailer package
  return await SendEmail(email, EmailText, EmailSubject);
};
