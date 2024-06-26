const express = require("express");
const { createJSONToken, isValidPassword } = require('../util/auth');
const authController = require("../controllers/auth");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authMiddleware("any"));
router.get('/profile', authController.getProfile);

module.exports = router;