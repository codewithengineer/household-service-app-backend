const express = require("express");

const router = express.Router();

// routing in apis to controller modules
router.use("/user", require("./user_management"));

module.exports = router;
