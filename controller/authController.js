const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

// ✅ Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "User creation failed", details: err.message });
  }
};

// ✅ Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email"] }); // Fetch only id, name, email
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};
