const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


// Dashboard do professor
router.get("/", (req, res) => {
  res.redirect("/professor/p-professor");
});

router.get("/p-professor", (req, res) => {
  res.render("dashboard/professor/p-professor", {
    user: req.user,
    title: "Dashboard Professor",
  });
});

router.get("/p-config", (req, res) => {
  res.render("dashboard/professor/p-config", {
    user: req.user,
    title: "Configurações",
  });
});

router.get("/p-minha-rotina", (req, res) => {
  res.render("dashboard/professor/p-minha-rotina", {
    user: req.user,
    title: "Minha Rotina",
  });
});

router.get("/p-gere-curso", (req, res) => {
  res.render("dashboard/professor/p-gere-curso", {
    user: req.user,
    title: "Gerenciar Cursos",
  });
});


router.get("/p-curso-prof", (req, res) => {
  res.render("dashboard/professor/p-curso-prof", {
    user: req.user,
    title: "Gerenciar Cursos",
  });
});

router.get("p-criar-curso", (req, res) => {
  res.render("dashboard/professor/p-criar-curso", {
    user: req.user,
    title: "Criar Curso",
  });
});

router.get("p-criar-aula", (req, res) => {
  res.render("dashboard/professor/p-criar-aula", {
    user: req.user,
    title: "Criar Aula",
  });
});

router.get("p-criar-exer", (req, res) => {
  res.render("dashboard/professor/p-criar-exer", {
    user: req.user,
    title: "Criar Exercício",
  });
});

router.get("p-criar-mat", (req, res) => {
  res.render("dashboard/professor/p-criar-mat", {
    user: req.user,
    title: "Criar Material",
  });
});

module.exports = router;
