const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api", expenseRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
