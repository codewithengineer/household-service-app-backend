const service = require("../../services/helper.service.js");

const checkIfAdmin = async (req, res, next) => {
  const user = req.user;
  const admin = await service.getUserIfAdmin(user.id);
  if (admin.hasOwnProperty("id") && admin.id === user.id) {
    req.admin = { adminId: admin.id };
  } else return res.status(404).json({ msg: "Not an admin" });
  next();
};

module.exports = { checkIfAdmin };
