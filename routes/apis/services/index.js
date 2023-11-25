const express = require("express");
const controller = require("../../controllers/services.controllers.js");
const { authorizeToken } = require("../../middlewares/token.js");

const router = express.Router();

router.get("/", authorizeToken, controller.getAllServices);
router.get("/:id", authorizeToken, controller.getUsersByService);
router.post("/", authorizeToken, controller.createNewService);
router.post("/:id", authorizeToken, controller.createNewProviderForService);

module.exports = router;
