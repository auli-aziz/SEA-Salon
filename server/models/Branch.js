const mongoose = require("mongoose");

const BranchSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  openingTime: {
    type: Date,
    required: true,
  },
  closingTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Branch", BranchSchema);
