const db = require("../config/db");

const User = {
  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },

  create: (name, email, hashedPassword, callback) => {
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      callback
    );
  },

  getAll: (callback) => {
    db.query("SELECT id, name, email FROM users", callback);
  },
};

module.exports = User;
