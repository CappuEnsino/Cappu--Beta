const { body, validationResult } = require("express-validator");
const { User } = require("../../models");

// Funções auxiliares reutilizáveis
const checkEmailUnique = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) throw new Error("Email já está em uso");
};

const confirmPasswordMatch = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("As senhas não coincidem");
  }
  return true;
};

// Validações para registro
exports.registerValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Nome é obrigatório")
    .isLength({ min: 3 }).withMessage("Nome deve ter pelo menos 3 caracteres")
    .escape(),

  body("email")
    .trim()
    .notEmpty().withMessage("Email é obrigatório")
    .isEmail().withMessage("Email inválido")
    .normalizeEmail()
    .custom(checkEmailUnique),

  body("password")
    .trim()
    .notEmpty().withMessage("Senha é obrigatória")
    .isLength({ min: 8 }).withMessage("Senha deve ter pelo menos 8 caracteres")
    .matches(/[A-Z]/).withMessage("Senha deve conter pelo menos uma letra maiúscula")
    .matches(/[a-z]/).withMessage("Senha deve conter pelo menos uma letra minúscula")
    .matches(/[0-9]/).withMessage("Senha deve conter pelo menos um número"),

  body("confirmPassword")
    .trim()
    .notEmpty().withMessage("Confirmação de senha é obrigatória")
    .custom(confirmPasswordMatch),

  body("role")
    .trim()
    .notEmpty().withMessage("Tipo de usuário é obrigatório")
    .isIn(["aluno", "professor"]).withMessage("Tipo de usuário inválido")
];

// Validações para login
exports.loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email é obrigatório")
    .isEmail().withMessage("Email inválido")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty().withMessage("Senha é obrigatória")
];

// Middleware de validação formatado
exports.validate = (req, res, next) => {
  console.log('Validation req.body:', req.body);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const formattedErrors = {};
  errors.array().forEach(error => {
    if (!formattedErrors[error.param]) {
      formattedErrors[error.param] = [];
    }
    formattedErrors[error.param].push(error.msg);
  });

  return res.status(422).json({
    success: false,
    message: "Erro de validação",
    errors: formattedErrors
  });
};