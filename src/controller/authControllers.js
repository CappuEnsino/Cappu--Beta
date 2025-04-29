const bcrypt = require("bcryptjs");
const { User } = require("../models");

module.exports = {
  showLogin(req, res) {
    res.render("auth/login", { 
      error: req.flash("error"),
      success: req.flash("success") 
    });
  },

  showRegister(req, res) {
    res.render("auth/register", { 
      error: req.flash("error"),
      roles: ['aluno', 'professor'] // Opções para o formulário
    });
  },

  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // Validação básica
      if ([name, email, password, role].some(field => !field?.trim())) {
        throw new Error("Todos os campos são obrigatórios");
      }

      // Verificar email
      if (await User.findOne({ where: { email } })) {
        throw new Error("Email já cadastrado");
      }

      // Criar usuário
      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 12),
        role,
        status: 'active' // Ou 'pending' para confirmação por email
      });

      // Retorna JSON se for requisição AJAX
      if (req.xhr) {
        // Redirect AJAX signup to the client login page
        return res.status(200).json({ success: true, message: 'Cadastro realizado com sucesso', redirect: '/auth/cl-login' });
      }

      // Autenticar automaticamente
      req.login(user, (err) => {
        if (err) throw err;
        req.flash("success", `Bem-vindo(a), ${user.name}!`);
        res.redirect(`/${role}`);
      });

    } catch (error) {
      // Retorna erro em JSON se for AJAX
      if (req.xhr) {
        return res.status(500).json({ success: false, message: error.message });
      }

      console.error("Erro no registro:", error);
      req.flash("error", error.message);
      res.redirect("/auth/register");
    }
  },

  login(req, res) {
    const redirectTo = req.session.returnTo || `/${req.user.role}`;
    delete req.session.returnTo;
    res.redirect(redirectTo);
  },

  logout(req, res) {
    req.logout(() => {
      req.flash("success", "Logout realizado com sucesso");
      res.redirect("/");
    });
  }
};