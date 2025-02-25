const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to MySQL database"))
  .catch((err) => console.error("❌ Database connection failed:", err.message));

module.exports = sequelize;