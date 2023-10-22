const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/credits.env");

const getToken = async (data) => {
  return jwt.sign({ ...data }, SECRET_KEY, {
    expiresIn: "10h",
  });
};

const authorizeToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, result) => {
      if (err) {
        return res
          .status(401)
          .json({ msg: "Session expired! Please login again" });
      } else {
        req.user = { ...result };
        return next();
      }
    });
  } else {
    return res.status(400).json({ msg: "Provide Autherization token" });
  }
};

module.exports = {
  getToken,
  authorizeToken,
};
