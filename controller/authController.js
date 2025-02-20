const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  // Hash password before storing
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });

    User.create(name, email, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ error: "User creation failed" });

      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(401).json({ error: "User not found" });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: "Error comparing passwords" });
      if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

      // Generate JWT Token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",

      });

      res.json({ message: "Login successful", token,user });
    });
  });
};

exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
  
      res.json(results);
    });
  };
