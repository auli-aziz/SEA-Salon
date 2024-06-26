const Branch = require("../models/Branch");
const Service = require("../models/Service");
const Reservation = require("../models/Reservation");

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

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
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

exports.deleteService = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    } else {
      await Service.deleteOne({ _id: serviceId });
      res.status(200).json({ message: "Service deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBranch = async (req, res) => {
  const { branchId } = req.params;
  try {
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    
    await Branch.deleteOne({ _id: branchId });
    await Reservation.deleteMany({ branch: branch.name });

    res.status(200).json({ message: "Branch and related reservations deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteReservation = async (req, res) => {
  const { reservationId } = req.params;
  try {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    } else {
      await Reservation.deleteOne({ _id: reservationId });
      res.status(200).json({ message: "Reservation deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};