const mongoose = require("mongoose");

module.exports = connectDatabase = async () => {
  const URI = process.env.MONGODB_URI;

  mongoose
    .connect(URI)
    .then(() => {
      console.log("Connected to MongoDB.");
    })
    .catch((err) => {
      console.log("Message: " + err.message);
    });
};
