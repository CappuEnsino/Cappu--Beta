const express = require("express");
const router = express.Router();

// Middlewares (se necessário)
// const { isLoggedIn } = require("../middlewares/auth");

// Importar rotas
const authRoutes = require("./auth");
const professorRoutes = require("./professor");
const alunoRoutes = require("./aluno");
const pagesRoutes = require("./pages");
const homeRoutes = require("./home"); // Adicione esta linha

// Configurar rotas (ordem de mais específica para mais genérica)
router.use("/dashboard/professor", professorRoutes); // Rotas específicas primeiro
router.use("/dashboard/aluno", alunoRoutes);
router.use("/auth", authRoutes); // Melhor prefixo que "/"
router.use("/pages", pagesRoutes);
router.use("/", homeRoutes); // Todas as rotas da home (incluindo a raiz)

module.exports = router;