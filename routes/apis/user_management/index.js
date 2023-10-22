const express = require("express");

const router = express.Router();

// routing in apis to controller modules
router.use("/auth", require("./authentication.apis"));
router.use("/data", require("./user.apis"));

module.exports = router;
