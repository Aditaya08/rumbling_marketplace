const express = require('express');
const Bidder = require('../models/Bidder.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Bidder auth endpoint" });
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await Bidder.findOne({ email });
    if (user) return res.status(400).json({ msg: "Bidder already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Bidder({ username, email, password: hashedPassword });
    await user.save();

    res.json({ msg: "Bidder registered successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }

});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Bidder.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: "bidder" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

module.exports = router;