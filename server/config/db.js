const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = connectDatabase = async () => {
  const URI = process.env.MONGODB_URI;

  try {
    await mongoose.connect(URI);

    console.log("Connected to MongoDB.");

    const exist = await User.findOne({ email: "thomas.n@compfest.id" });

    if(!exist) {
      const hashedPassword = await bcrypt.hash("Admin123", 10);

      const admin = new User({
        fullName: "Thomas N",
        email: "thomas.n@compfest.id",
        phoneNumber: "08123456789",
        password: hashedPassword,
        role: "admin",
      });

      await admin.save();
      console.log("Admin user created successfully!");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (err) {
    console.log("Message: " + err.message);
  }
};
