const service = require("../services/services.service.js");

const controller = {};

controller.createNewService = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await service.createNewService(name);
    if (result.insertId)
      return res.status(200).json({ msg: "Service created successfully" });
    return res.status(400);
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.createNewProviderForService = async (req, res) => {
  try {
    const id = req.params.id;
    const uid = req.user.id;
    const result = await service.createNewProviderForService(id, uid);
    if (result.insertId)
      return res.status(200).json({ msg: "Service created successfully" });
    return res.status(400);
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.getAllServices = async (req, res) => {
  try {
    const result = await service.getAllServices();

    return res.status(200).json(result);
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

controller.getUsersByService = async (req, res) => {
  try {
    const result = await service.getUsersByService(parseInt(req.params.id));

    return res.status(200).json(result);
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = controller;
