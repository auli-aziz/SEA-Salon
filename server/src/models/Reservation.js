const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema({
  customerId: String,
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  typeOfService: {
    type: String,
    required: true
  },
  dateAndTime: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", ReservationSchema);