const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");
const User = require("./User");
const Curso = require("./curso");
const Aula = require("./aula");
const Exercicio = require("./Exercicio");
const Material = require("./material");
const Resumo = require("./resumo");

// Relacionamentos
User.hasMany(Curso, { foreignKey: "professor_id" });
Curso.belongsTo(User, { foreignKey: "professor_id" });

Curso.hasMany(Aula, { foreignKey: "curso_id" });
Aula.belongsTo(Curso, { foreignKey: "curso_id" });

Aula.hasMany(Exercicio, { foreignKey: "aula_id" });
Exercicio.belongsTo(Aula, { foreignKey: "aula_id" });

Aula.hasMany(Material, { foreignKey: "aula_id" });
Material.belongsTo(Aula, { foreignKey: "aula_id" });

User.hasMany(Resumo, { foreignKey: "aluno_id" });
Resumo.belongsTo(User, { foreignKey: "aluno_id" });

// Função para popular o banco com dados iniciais (opcional)
async function seed() {
  try {
    const professor = await User.create({
      name: "Admin",
      email: "admin@teste.com",
      password: await bcrypt.hash("admin123", 12),
      role: "professor",
      status: "active",
    });

    const curso = await Curso.create({
      titulo: "Introdução ao SQLite",
      descricao: "Descrição inicial do curso",
      categoria: "Geral",
      nivel: "basico",
      duracao: "1 mês",
      professor_id: professor.id,
    });

    console.log("[SQLite] Dados iniciais criados!");
  } catch (error) {
    console.error("[SQLite] Erro ao criar dados iniciais:", error);
  }
}

// Sincroniza e popula o banco (apenas em desenvolvimento/testes)
sequelize
  .sync({ force: true }) // force: true só em desenvolvimento!
  .then(seed)
  .catch((err) => {
    console.error("[SQLite] Erro ao sincronizar:", err);
  });

module.exports = {
  User,
  Curso,
  Aula,
  Exercicio,
  Material,
  Resumo,
};