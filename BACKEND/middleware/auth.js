const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const authHeader =
    req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "Access Denied"
    });
  }

  const token =
    authHeader.replace("Bearer ", "");

  try {

    const verified = jwt.verify(
      token,
      "secretkey"
    );

    req.user = verified;

    next();

  } catch {

    res.status(401).json({
      message: "Invalid Token"
    });

  }
};