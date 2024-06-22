const path = require("path")
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 3000;

const customerRoutes = require("./routes/customer");

app.use(express.json());

app.use("/customer", customerRoutes);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});