const Review = require("../models/Review");
const Reservation = require("../models/Reservation");

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch(err) {
    res.status(400).json(err.message);
  }
}

exports.postReview = async (req, res) => {
  const { name, comment, rating } = req.body;
  try {
    if(name.length === 0 || comment.length === 0 || rating.length === 0 ) {
      return res.status(400).json({message: "All fields must be filled"});
    }
    if(rating > 5 || rating < 0) {
      return res.status(400).json({message: "invalid rating"})
    }

    const review = new Review({
      name: name,
      comment: comment,
      rating: parseInt(rating)
    })
    const insertReview = await review.save();
    res.status(201).json(insertReview);
  } catch(err) {
    res.status(400).json(err.message);
  }
}

exports.addReservation = async (req, res) => {
  const { name, phoneNumber, typeOfService, dateAndTime} = req.body;
  try {
    if(name.length === 0 || phoneNumber.length === 0 || !dateAndTime) {
      throw Error("All fields must be filled");
    }
    const reservation = new Reservation({
      name, phoneNumber, typeOfService, dateAndTime
    });
    await reservation.save();
    res.status(201).json(reservation);
  } catch(err) {
    res.status(400).json(err.message);
  }
}