const express = require("express");
const controller = require("../../controllers/appointment.controllers.js");
const { authorizeToken } = require("../../middlewares/token.js");

const router = express.Router();

router.get("/", authorizeToken, controller.getAppointment);
router.get("/:id", authorizeToken, controller.getAppointmentDetails);
router.get("/u/:id", authorizeToken, controller.getAppointmentDetailsByUser);
router.post("/", authorizeToken, controller.createNewAppointment);
router.post("/:id", authorizeToken, controller.approveAppointment);

module.exports = router;
