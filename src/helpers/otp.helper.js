const SendEmail = require("./email.helper");

exports.CreateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

exports.SendOTP = async (email, code) => {
    let EmailText = `Your Verification Code is : ${code}`;
    let EmailSubject = "Email Verification";
    // sending user a verification code using node mailer package
    return await SendEmail(email, EmailText, EmailSubject);
}

