const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  role: {
    type: DataTypes.ENUM("aluno", "professor", "admin"),
    allowNull: false,
    defaultValue: "aluno",
  },
  status: {
    type: DataTypes.ENUM("active", "pending", "inactive"),
    allowNull: false,
    defaultValue: "active",
  },
}, {
  tableName: "Users",
  underscored: true,
});

module.exports = User;
