const Service = require("../models/Service")

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch(err) {
    res.status(500).json(err.message);
  }
}

exports.postService = async (req, res) => {
  const { name, duration } = req.body;
  try {
    const service = new Service({ name, duration });
    await service.save();
    res.status(201).json(service);
  } catch(err) {
    res.status(500).json(err.message);
  }
}