const express = require("express");
const adminController = require("../controllers/admin");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get('/services', adminController.getServices);
router.get('/branches', adminController.getBranches);

router.use(authMiddleware("admin"));
router.get('/reservations', adminController.getReservations);
router.post('/addservice', adminController.postService);
router.post("/addbranch", adminController.postBranch);
router.delete("/deleteservice/:serviceId", adminController.deleteService);
router.delete("/deletebranch/:branchId", adminController.deleteBranch);
router.delete("/deletereservation/:reservationId", adminController.deleteReservation);

module.exports = router;