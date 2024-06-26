const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, { timestamp: true });

module.exports = mongoose.model("Review", ReviewSchema);