const express = require("express");
const reviewController = require("../controllers/reviews");

const router = express.Router();

router.get("/reviews", reviewController.getReviews);
router.post("/addreview", reviewController.postReview);

module.exports = router;