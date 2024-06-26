const Review = require("../models/Review");
const Reservation = require("../models/Reservation");

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.postReview = async (req, res) => {
  const { name, comment, rating } = req.body;
  try {
    if (name.length === 0 || comment.length === 0 || rating.length === 0) {
      return res.status(400).json({ message: "All fields must be filled" });
    }
    if (rating > 5 || rating < 0) {
      return res.status(400).json({ message: "invalid rating" });
    }

    const review = new Review({
      name: name,
      comment: comment,
      rating: parseInt(rating),
    });
    const insertReview = await review.save();
    res.status(201).json(insertReview);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.addReservation = async (req, res) => {
  const { name, phoneNumber, branch, typeOfService, dateAndTime } = req.body;
  const id = req.user.id;
  try {
    if (name.length === 0 || phoneNumber.length === 0 || !dateAndTime) {
      throw Error("All fields must be filled");
    }
    const reservation = new Reservation({
      customerId: id,
      name,
      phoneNumber,
      branch,
      typeOfService,
      dateAndTime,
    });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getReservations = async (req, res) => {
  const id = req.user.id;
  try {
    const reservations = await Reservation.find({ customerId: id });
    return res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
