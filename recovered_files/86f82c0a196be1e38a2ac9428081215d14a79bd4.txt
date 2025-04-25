const { Sequelize } = require("sequelize");

// Configuração do SQLite em memória
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:", // Usa memória RAM
  logging: false, // Desativa logs do Sequelize
  define: {
    timestamps: true,
    underscored: true,
  },
});

// Testa a conexão
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com SQLite estabelecida com sucesso");
  })
  .catch((err) => {
    console.error("Erro ao conectar com SQLite:", err);
  });

module.exports = sequelize;
