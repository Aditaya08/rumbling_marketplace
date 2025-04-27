const express = require('express');
const Seller = require('../models/Seller.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Test GET endpoint
router.get("/", (req, res) => {
  res.json({ msg: "Seller auth endpoint" });
});

// Register Seller
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let user = await Seller.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ 
        msg: user.email === email ? "Email already exists" : "Username already exists" 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Seller({ username, email, password: hashedPassword });
    await user.save();

    res.json({ msg: "Seller registered successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Login Seller
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Seller.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: "seller" }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

module.exports = router;