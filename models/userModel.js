const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true, // ✅ Allow NULL
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true, // ✅ Allow NULL
    },
  },
  {
    timestamps: true, // Keep timestamps enabled
  }
);

module.exports = User;
