const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    const user = await User.findOne({ _id: decoded.user.id });
    console.log("User:", user);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
