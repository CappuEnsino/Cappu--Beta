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

router.get("/a-config", (req, res) => {
  res.render("dashboard/aluno/a-config", {
    user: req.user,
    title: "Configurações",
  });
});

router.get("/a-perfil", (req, res) => {
  res.render("dashboard/aluno/a-perfil", {
    user: req.user,
    title: "Perfil Aluno",
  });
});




router.get("/a-meuscursos", (req, res) => {
  res.render("dashboard/aluno/a-meuscursos", {
    user: req.user,
    title: "Meus Cursos",
  });
});


router.get("/a-minharotina", (req, res) => {
  res.render("dashboard/aluno/a-minharotina", {
    user: req.user,
    title: "Minha Rotina",
  });
});

router.get("/a-meusmateriais", (req, res) => {
  res.render("dashboard/aluno/a-meusmateriais", {
    user: req.user,
    title: "Meus Materiais",
  });
});

router.get("/a-gerenciarplano", (req,res) =>{
  res.render("dashboard/aluno/a-gerenciarplano",{
    user: req.user,
    title: "Gerenciar Plano",
  });
});

router.get("/cursos", (req,res) => {
  res.render("dashboard/aluno/cursos", {
    user : req.user,
    title : "Cursos",
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
