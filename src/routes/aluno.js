const express = require("express");
const router = express.Router();

// Middleware para verificar se o usuário é aluno
const isAluno = (req, res, next) => {
  if (req.user && req.user.role === "aluno") {
    return next();
  }
  res.redirect("/login");
};

router.use(isAluno);

// Dashboard do aluno
router.get("/", (req, res) => {
  res.render("dashboard/aluno/a-perfil", {
    user: req.user,
    title: "Dashboard Aluno",
  });
});

// Rotas de cursos
router.get("/cursos", (req, res) => {
  res.render("dashboard/aluno/a-meuscursos", {
    user: req.user,
    title: "Meus Cursos",
  });
});

// Rotas de exercícios
router.get("/exercicios", (req, res) => {
  res.render("dashboard/aluno/exercicio", {
    user: req.user,
    title: "Exercícios",
  });
});

// Rotas de resumos
router.get("/resumos", (req, res) => {
  res.render("dashboard/aluno/a-resumo", {
    user: req.user,
    title: "Meus Resumos",
  });
});

router.post("/resumo/save", (req, res) => {
  // Lógica para salvar resumo
});

// Rotas de técnicas
router.get("/tecnicas", (req, res) => {
  res.render("dashboard/aluno/a-config", {
    user: req.user,
    title: "Técnicas de Estudo",
  });
});

module.exports = router;
