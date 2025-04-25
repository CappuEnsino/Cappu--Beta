const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Exercicio = sequelize.define("Exercicio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pergunta: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  resposta_correta: {
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

module.exports = Exercicio;