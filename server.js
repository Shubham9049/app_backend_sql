const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/db"); // Sequelize instance

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Database Connection & Sync
const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Check DB connection
    console.log("✅ Connected to PostgreSQL database using Sequelize");
    
    await sequelize.sync({ alter: true }); // Sync models with DB
    console.log("✅ Database synchronized successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Exit if DB connection fails
  }
};

connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
