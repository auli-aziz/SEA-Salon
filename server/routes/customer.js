const express = require("express");
const customerController = require("../controllers/customer");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/reviews", customerController.getReviews);

router.use(authMiddleware("customer"));
router.get('/profile', customerController.getProfile);
router.get("/reservations", customerController.getReservations);
router.post("/addreview", customerController.postReview);
router.post("/addreservation", customerController.addReservation);

module.exports = router;