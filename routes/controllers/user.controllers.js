const service = require("../services/user.service.js");
const validater = require("../../helpers/validater");
const helperService = require("../services/helper.service.js");

const controller = {};

controller.getUserData = async (req, res) => {
  try {
    const data = { id: req.user.id };

    // validating inputs
    const errorMessages = validater([{ type: "number", value: data.id }]);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ msg: errorMessages });
    }
    // get data of all users from db expect admins
    const user = await service.getUsersData();

    return res.status(200).json(user);
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.getUserDataById = async (req, res) => {
  try {
    const data = { id: parseInt(req.params.id) };

    // validating inputs
    const errorMessages = validater([{ type: "number", value: data.id }]);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ msg: errorMessages });
    }

    // check if user is exist in database with this id
    const user = await service.getUserDataById(data.id);
    if (user?.id) {
      return res.status(200).json({ ...user });
    } else {
      return res.status(204).json({ msg: "User does not exists" });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.updateUserData = async (req, res) => {
  try {
    const data = { ...req.body, id: parseInt(req.user.id) };

    // validating inputs
    const dataToCheck = [];

    for (let key in data) {
      switch (key) {
        case "firstName":
          dataToCheck.push({ type: "text", value: data[key] });
          break;
        case "lastName":
          dataToCheck.push({ type: "text", value: data[key] });
          break;
        case "email":
          dataToCheck.push({ type: "email", value: data[key] });
          break;
        case "mobile":
          dataToCheck.push({ type: "number", value: data[key] });
          break;
        case "designation":
          dataToCheck.push({ type: "text", value: data[key] });
          break;
        case "dob":
          dataToCheck.push({ type: "date", value: data[key] });
          break;
        case "address":
          dataToCheck.push({ type: "text", value: data[key] });
          break;
        case "bankName":
          dataToCheck.push({ type: "text", value: data[key] });
          break;
        case "accountHoldersName":
          dataToCheck.push({ type: "text", value: data[key] });
          break;
        case "accountNumber":
          dataToCheck.push({ type: "number", value: data[key] });
          break;
        case "accountType":
          dataToCheck.push({ type: "text", value: data[key] });
          break;
        case "IFSC_Code":
          dataToCheck.push({ type: "text", value: data[key] });
          break;
        case "profileUrl":
          dataToCheck.push({ type: "text", value: data[key] });
          break;
      }
    }

    const errorMessages = validater(dataToCheck);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ msg: errorMessages });
    }

    if (data.hasOwnProperty("profileUrl")) {
      const deleteUrl = await helperService.getUrlForDeleteFile({
        table: "users",
        field: "profileUrl",
        id: data.id,
      });

      if (
        deleteUrl &&
        deleteUrl.indexOf("https://sa-media.fra1.digitaloceanspaces.com") != -1
      )
        await deleteFile(deleteUrl);
    }

    // check if user is exist in database with this id
    const updated = await service.updateUserInfo(data);
    if (updated.affectedRows > 0) {
      return res.status(200).json({ msg: "User data updated successfully." });
    } else {
      return res.status(304).json({ msg: "No content found for modification" });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.deleteUserPermanent = async (req, res) => {
  try {
    const data = { id: parseInt(req.user.id) };

    // check if user is exist in database with this id
    const deleted = await service.deleteUser(data);

    if (deleted.affectedRows > 0) {
      return res.status(200).json({ msg: "User deleted successfully." });
    } else {
      return res.status(304).json({ msg: "No content found for modification" });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = controller;
