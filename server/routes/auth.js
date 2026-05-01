const express = require("express");
const router = express.Router(); // ✅ YE LINE MISSING THI

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔐 SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Signup error");
  }
});

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Wrong password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey"
    );

    res.json({
      token,
      role: user.role,
      email: user.email
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Login error");
  }
});

// ✅ EXPORT
module.exports = router;