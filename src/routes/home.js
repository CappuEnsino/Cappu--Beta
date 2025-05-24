const express = require("express");
const router = express.Router();

// Rotas da Home
router.get("/", (req, res) => {
  res.render("pages/home/index");
});

router.get("/quemsomos", (req, res) => {
  res.render("pages/home/quemsomos");
});

router.get("/cursos", (req, res) => {
  res.render("pages/home/cursos");
});

router.get("/planos", (req, res) => {
  res.render("pages/home/planos");
});

router.get("/sou-aluno", (req, res) => {
  res.render("pages/home/sou-aluno");
});

router.get("/sou-professor", (req, res) => {
  res.render("pages/home/sou-professor");
});

router.get("/suporte", (req, res) => {
  res.render("pages/home/h-suporte");
});

// Rotas Institucionais
router.get("/institucional/inst-seguranca", (req, res) => {
  res.render("pages/institucional/inst-seguranca");
});

router.get("/institucional/inst-acessibilidade", (req, res) => {
  res.render("pages/institucional/inst-acessibilidade");
});

router.get("/institucional/inst-privacidade", (req, res) => {
  res.render("pages/institucional/inst-privacidade");
});

router.get("/institucional/inst-termos-de-uso", (req, res) => {
  res.render("pages/institucional/inst-termos-de-uso");
});

module.exports = router; 