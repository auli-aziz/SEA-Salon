const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDatabase = require("./src/config/db");
const authRoutes = require("./src/routes/auth");
const adminRoutes = require("./src/routes/admin");
const customerRoutes = require("./src/routes/customer");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use("/administrator", adminRoutes);
app.use("/customer", customerRoutes);
app.use("/authentication", authRoutes);

connectDatabase();
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});