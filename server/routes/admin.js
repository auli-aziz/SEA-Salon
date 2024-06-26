const express = require("express");
const adminController = require("../controllers/admin");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get('/services', adminController.getServices);
router.get('/branches', adminController.getBranches);

router.use(authMiddleware("admin"));
router.post('/addservice', adminController.postService);
router.post("/addbranch", adminController.postBranch);

module.exports = router;