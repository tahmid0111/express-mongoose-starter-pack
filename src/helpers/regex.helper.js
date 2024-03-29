exports.ValidateEmail = (email) => {
  // This regular expression is quite complex and allows for a wide range of email address formats, including those with special characters and IP addresses in the domain part. It's very inclusive and aims to match most email addresses conforming to standards.
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
};

exports.ValidatePassword = (password) => {
  // Contains at least one lowercase letter.
  // Contains at least one uppercase letter.
  // Contains at least one digit.
  // Contains at least one special character from the specified set.
  // Is at least 8 characters long.
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return passwordRegex.test(password);
};

exports.ValidatePhoneNumber = (phone) => {
  // this regex allows only valid bangladeshi numbers
  const bangladeshMobileRegex = /^(?:\+?880)?01[3-9]\d{8}$/;

  return bangladeshMobileRegex.test(phone);
};
