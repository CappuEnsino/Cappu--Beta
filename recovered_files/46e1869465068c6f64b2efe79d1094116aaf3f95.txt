const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Aula = sequelize.define("Aula", {
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
  video: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ordem: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duracao: {
    type: DataTypes.INTEGER, // em minutos
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("ativo", "inativo"),
    allowNull: false,
    defaultValue: "ativo",
  },
  curso_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Cursos",
      key: "id",
    },
  },
});

module.exports = Aula;
