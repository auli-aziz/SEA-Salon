const express = require("express");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/db");
const dotenv = require("dotenv");

const app = express();

const PORT = 3000;
dotenv.config();

const customerRoutes = require("./routes/customer");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/customer", customerRoutes);

connectDatabase();
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});