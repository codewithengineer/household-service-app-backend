const service = require("../services/appointment.service.js");

const controller = {};

controller.createNewAppointment = async (req, res) => {
  try {
    const result = await service.createNewAppointment({
      ...req.body,
      uid: req.user.id,
    });
    if (result.insertId)
      return res.status(200).json({ msg: "Appointment created successfully" });
    return res.status(400);
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.approveAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const uid = req.user.id;

    const result = await service.approveAppointment(id, uid);

    if (result.affectedRows > 0)
      return res.status(200).json({ msg: "Appointment aproved successfully" });
    return res.sendStatus(400);
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.getAppointment = async (req, res) => {
  try {
    const result = await service.getAppointment(parseInt(req.user.id));

    return res.status(200).json(result);
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.getAppointmentDetails = async (req, res) => {
  try {
    const result = await service.getAppointmentDetails(parseInt(req.params.id));

    return res.status(200).json(result);
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.getAppointmentDetailsByUser = async (req, res) => {
  try {
    const result = await service.getAppointmentDetailsByUser(
      parseInt(req.params.id)
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = controller;
