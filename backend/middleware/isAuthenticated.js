const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  // ? get the token from the header
  const headerObj = req.headers;
  //   console.log(headerObj);

  const token = headerObj?.authorization?.split(" ")[1];
  //   console.log(token);
  // ? verify token
  const verifyToken = jwt.verify(token, "raptor", (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
  if (verifyToken) {
    // ? save the user req obj
    req.user = verifyToken.id;
    next();
  } else {
    throw new Error("Token invalid , Login again");
    next(err);
  }
};

module.exports = isAuthenticated;
