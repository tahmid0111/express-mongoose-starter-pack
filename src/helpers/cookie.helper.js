
exports.SetCookie = async (res, cookieName, cookieValue) => {
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 6060 * 1000),
      httpOnly: false,
    };
  
    res.cookie(cookieName, cookieValue, cookieOption);
  };
  