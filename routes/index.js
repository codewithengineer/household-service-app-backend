const express = require("express");

const router = express.Router();

// Managing api versions here so the live users dont get affected
router.use("/api/", require("./apis"));

module.exports = router;
