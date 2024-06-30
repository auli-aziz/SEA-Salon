const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Service", ServiceSchema);