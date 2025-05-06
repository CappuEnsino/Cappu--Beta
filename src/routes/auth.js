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
router.get("/cl-login", 
  isNotLoggedIn, // Novo middleware
  (req, res) => {
    res.render("auth/cl-login");
  }
);

router.get("/cl-cadastro", 
  isNotLoggedIn, // Novo middleware
  (req, res) => {
    res.render("auth/cl-cadastro", { role: 'aluno' });
  }
);

router.get("/cl-loginmain", 
  isNotLoggedIn,
  (req, res) => {
    res.render("auth/cl-loginmain");
  }
);
router.get("/cl-esq_senha", 
  isNotLoggedIn,
  (req, res) => {
    res.render("auth/cl-esq_senha");
  }
);

router.get("/cl-cod-rec", 
  isNotLoggedIn,
  (req, res) => {
    res.render("auth/cl-cod-rec");
  }
);

//------------------------------------------------------------------
// Processamento de Formulários
//------------------------------------------------------------------
router.post("/cl-cadastro",
  isNotLoggedIn, // Novo
  registerValidation,
  validate,
  authController.register
);

router.post("/cl-login",
  isNotLoggedIn, // Novo
  loginValidation,
  validate,
  passport.authenticate("local", {
    failureRedirect: "/auth/cl-login",
    failureFlash: "Email ou senha inválidos"
  }),
  authController.login
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
  isNotLoggedIn,
  (req, res) => {
    res.render("auth/cl-cadastro", { role: "professor" });
  }
);

router.post("/cadastro-professor",
  isNotLoggedIn,
  // force role to professor on this route
  (req, res, next) => { req.body.role = 'professor'; next(); },
  registerValidation,
  validate,
  authController.register
);

//------------------------------------------------------------------
// Logout
//------------------------------------------------------------------
router.get("/logout", 
  isLoggedIn, // Novo
  authController.logout
);

module.exports = router;