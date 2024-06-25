const express = require("express");
const adminController = require("../controllers/admin");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get('/getservices', adminController.getServices);

router.use(authMiddleware("admin"));
router.post('/addservice', adminController.postService);

module.exports = router;