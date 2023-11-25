const express = require("express");

const router = express.Router();

// routing in apis to controller modules
router.use("/user", require("./user_management"));
router.use("/services", require("./services"));
router.use("/appointment", require("./appointment"));

module.exports = router;
