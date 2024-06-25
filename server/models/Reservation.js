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
  typeOfService: {
    type: String,
    enum: ['Haircuts and styling', 'Manicure and pedicure', 'Facial treatments'],
    required: true
  },
  dateAndTime: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", ReservationSchema);