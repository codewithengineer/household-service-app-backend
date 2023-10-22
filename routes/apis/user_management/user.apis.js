const express = require("express");
const controller = require("../../controllers/user.controllers");
const { checkIfAdmin } = require("../../middlewares/checks/check_if_admin");
const { authorizeToken } = require("../../middlewares/token.js");

const router = express.Router();

// get data of the user himself
router.get("/", authorizeToken, controller.getUsersData);

// get data of another user
router.get("/user/:id", authorizeToken, controller.getUserDataById);

// update data of user itself
router.patch("/", authorizeToken, controller.updateUserData);

// delete data of user itself
router.delete("/", authorizeToken, controller.deleteUserPermanent);

module.exports = router;
