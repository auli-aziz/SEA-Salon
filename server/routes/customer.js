const express = require("express");
const reviewController = require("../controllers/customer");

const router = express.Router();

router.get("/reviews", reviewController.getReviews);
router.post("/addreview", reviewController.postReview);
router.post("/addreservation", reviewController.addReservation);

module.exports = router;