const Review = require("../models/review");

exports.getReviews = (req, res) => {
  Review.fetchAll(reviews => {
    res.status(200).json(reviews);
  })
}

exports.postReview = (req, res) => {
  const {name, comment, rating} = req.body;
  if(name.length === 0 || comment.length === 0 || rating.length === 0 ) {
    return res.status(400).json({message: "All fields must be filled"});
  }
  if(rating > 5 || rating < 0) {
    return res.status(400).json({message: "invalid rating"})
  }

  const review = new Review(name, comment, parseInt(rating));
  review.save();
  res.status(201).json({ message: "add review success", review });
}