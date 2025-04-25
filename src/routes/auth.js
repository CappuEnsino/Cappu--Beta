const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controller/authControllers");
const { 
  registerValidation, 
  loginValidation, 
  validate 
} = require("../middleware/validators/authValidators");
const { isLoggedIn, isNotLoggedIn } = require("../middleware/authe");

//------------------------------------------------------------------
// Rotas Públicas (acesso sem autenticação)
//------------------------------------------------------------------
router.get("/login", 
  isNotLoggedIn, // Novo middleware
  authController.showLogin
);

router.get("/register", 
  isNotLoggedIn, // Novo middleware
  authController.showRegister
);

router.get("/cl-loginmain", 
  isNotLoggedIn,
  (req, res) => {
    res.render("auth/cl-loginmain");
  }
);

//------------------------------------------------------------------
// Processamento de Formulários
//------------------------------------------------------------------
router.post("/register",
  isNotLoggedIn, // Novo
  registerValidation,
  validate,
  authController.register
);

router.post("/login",
  isNotLoggedIn, // Novo
  loginValidation,
  validate,
  passport.authenticate("local", {
    successRedirect: "/auth/selecao-perfil",
    failureRedirect: "/auth/login",
    failureFlash: "Email ou senha inválidos", // Mensagem explícita
    successFlash: "Login realizado com sucesso!" // Novo
  })
);

//------------------------------------------------------------------
// Rotas Protegidas (requer autenticação)
//------------------------------------------------------------------
router.get("/selecao-perfil", 
  isLoggedIn, // Novo middleware
  (req, res) => {
    res.render("auth/selecao-perfil", {
      user: req.user, // Passa o usuário logado
      title: "Selecione seu Perfil" // Novo
    });
  }
);

//------------------------------------------------------------------
// Rotas de Cadastro Específico
//------------------------------------------------------------------
router.get("/cadastro-aluno", 
  isNotLoggedIn, // Novo
  (req, res) => {
    res.render("auth/register", { 
      role: "aluno",
      formData: req.flash("formData")[0], // Recupera dados em caso de erro
      title: "Cadastro de Aluno" // Novo
    });
  }
);

router.get("/cadastro-professor", 
  isNotLoggedIn, // Novo
  (req, res) => {
    res.render("auth/register", { 
      role: "professor",
      formData: req.flash("formData")[0], // Recupera dados em caso de erro
      title: "Cadastro de Professor" // Novo
    });
  }
);

//------------------------------------------------------------------
// Logout
//------------------------------------------------------------------
router.get("/logout", 
  isLoggedIn, // Novo
  authController.logout
);

module.exports = router;