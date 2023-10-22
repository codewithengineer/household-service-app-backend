const express = require("express");
const controller = require("../../controllers/authentication.controllers");
const { authorizeToken } = require("../../middlewares/token.js");

const router = express.Router();

// signup user and return token
router.post("/users/sign-up", controller.signup);

// signin user and return token
router.post("/users/sign-in", controller.signin);

// get a reset password link
router.post("/users/reset-password", controller.sendResetLink);

// create/reset password
router.patch(
  "/users/reset-password",
  authorizeToken,
  controller.updatePassword
);

// update password of itself by user
router.patch("/", authorizeToken, controller.updatePasswordItself);

module.exports = router;
