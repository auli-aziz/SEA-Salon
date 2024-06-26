const Branch = require("../models/Branch");
const Service = require("../models/Service")

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch(err) {
    res.status(500).json(err.message);
  }
}

exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.find().populate('services');
    res.status(200).json(branches);
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

exports.postBranch = async (req, res) => {
  const { name, location, openingTime, closingTime, services } = req.body;
  try {
    const validServices = await Service.find({
      _id: { $in: services },
    });

    if (validServices.length !== services.length) {
      return res.status(400).json({ message: "Invalid service IDs provided" });
    }

    const branch = new Branch({
      name,
      location,
      openingTime,
      closingTime,
      services
    });
    await branch.save();

    res.status(201).json(branch)
  } catch(err) {
    res.status(500).json(err.message)
  }
}