const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDatabase = require("./src/config/db");
const authRoutes = require("./src/routes/auth");
const adminRoutes = require("./src/routes/admin");
const customerRoutes = require("./src/routes/customer");
const cors = require("cors");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:3000', 
  'https://sea-salon-topaz.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/administrator", adminRoutes);
app.use("/customer", customerRoutes);
app.use("/authentication", authRoutes);

connectDatabase();
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
