const bcrypt = require("bcryptjs");

const service = require("../services/authentication.service");
const email = require("../services/email.service");

const validater = require("../../helpers/validater");
const { getToken } = require("../middlewares/token.js");

const controller = {};

controller.signup = async (req, res) => {
  try {
    const data = { ...req.body };

    // validating inputs
    const errorMessages = validater([
      { type: "text", value: data.fName },
      { type: "text", value: data.lName },
      { type: "email", value: data.email },
      { type: "number", value: data.mobileNumber },
      { type: "password", value: data.password },
    ]);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ msg: errorMessages });
    }

    // check if user is exist in database with that email or mobile number
    const isuser = await service.getUser(data.email, data.mobileNumber);
    if (!isuser?.id) {
      data.password = await bcrypt.hash(data.password, 10);

      // creating user and getting id
      const user = await service.createUser(data);

      // tokenize id to send in email to client for resetting password
      const token = await getToken({ id: user.insertId });

      const emailData = {
        to: data.email,
        subject: "We invites you to join team",
        body: `
          ${data.fName} + " " + ${data.lName} <br>
          ${data.email}<br>
          <h4>We invite you to our platform</h4>
        `,
      };

      await email(emailData.to, emailData.subject, emailData.body);
      return res.status(200).json({ msg: "User created successfully", token });
    } else {
      return res.status(409).json({ msg: "The user already exists" });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.signin = async (req, res) => {
  try {
    // validating inputs
    const dataToCheck = [{ type: "password", value: req.body.password }];
    if (req.body.email)
      dataToCheck.push({ type: "email", value: req.body.email });
    else if (req.body.mobileNumber)
      dataToCheck.push({ type: "number", value: req.body.mobileNumber });

    const errorMessages = validater(dataToCheck);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ msg: errorMessages });
    }

    const data = { ...req.body };

    // get user details with the email or phonenumber
    const user = await service.getUser(data.email, data.mobileNumber);
    if (!user?.id) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    // comparing password with the password in db
    const compared = await bcrypt.compare(data.password, user.password);
    if (compared) {
      const access = await service.getUsersAccess(user.id);
      const token = await getToken({ id: user.id, ...access });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.sendResetLink = async (req, res) => {
  try {
    const data = { ...req.body };

    // validating inputs
    const errorMessages = validater([{ type: "email", value: data.email }]);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ msg: errorMessages });
    }

    // check if user is exist in database with that email or mobile number
    const isuser = await service.getUser(data.email, data.mobileNumber, true);
    delete isuser.password;
    if (isuser?.id) {
      // tokenize id to send in email to client for resetting password
      const token = await getToken({ id: isuser.id });

      const emailData = {
        to: data.email,
        subject: "Reset Password for " + data.email,
        body:
          "Reset password link " +
          `<a href="http://localhost:8081/update?token=${token}">click </a>`,
      };
      await email(emailData.to, emailData.subject, emailData.body);
      return res.status(200).json({
        msg: "If your account exists with this email you will recirve an link to reset password",
      });
    } else {
      return res.status(200).json({
        msg: "If your account exists with this email you will recirve an link to reset password",
      });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.updatePassword = async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.id };

    // validating inputs
    const errorMessages = validater([
      { type: "password", value: data.password },
      { type: "number", value: data.userId },
    ]);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ msg: errorMessages });
    }

    // altering password with hash
    data.password = await bcrypt.hash(data.password, 10);

    const updated = await service.updatePassword(data);

    if (updated.affectedRows > 0) {
      return res.status(200).json({ msg: "Password created successfully." });
    } else {
      return res.status(304).json({ msg: "No content found for modification" });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.updatePasswordItself = async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    console.log(data);
    // validating inputs
    const errorMessages = validater([
      { type: "password", value: data.password },
      { type: "password", value: data.oldPassword },
      { type: "number", value: data.userId },
    ]);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ msg: errorMessages });
    }

    // get user details with the email or phonenumber
    const user = await service.getUserById(data.userId, true);
    if (!user?.id) {
      return res.status(401).json({ msg: "Invalid Password" });
    }

    // comparing password with the password in db
    const compared = await bcrypt.compare(data.oldPassword, user.password);
    if (compared) {
      // altering password with hash
      data.password = await bcrypt.hash(data.password, 10);

      const updated = await service.updatePassword(data);

      if (updated.affectedRows > 0) {
        return res.status(200).json({ msg: "Password created successfully." });
      }
    }
    return res.status(401).json({ msg: "Invalid Password" });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = controller;
