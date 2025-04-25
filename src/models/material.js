const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Material = sequelize.define("Material", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aula_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Aulas",
      key: "id",
    },
  },
});

module.exports = Material;
