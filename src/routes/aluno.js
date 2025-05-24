const express = require('express');
const router = express.Router();
const Resumo = require('../models/resumo');

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

router.get("/a-pomodoro", (req, res) => {
  res.render("dashboard/aluno/a-pomodoro", {
    user: req.user,
    title: "Pomodoro",
  });
});

router.get("/a-resumo", (req, res) => {
  res.render("dashboard/aluno/a-resumo", {
    user: req.user,
    title: "Criar Resumo",
    resumo: null
  });
});

router.get("/a-mnemonica", (req, res) => {
  res.render("dashboard/aluno/a-mnemonica", {
    user: req.user,
    title: "Mnemonica",
  });
});

router.get("/a-feynman", (req, res) => {
  res.render("dashboard/aluno/a-feynman", {
    user: req.user,
    title: "Feynman",
  });
});

router.get("/a-bd_feynman", (req, res) => {
  res.render("dashboard/aluno/a-bd_feynman", {
    user: req.user,
    title: "Feynman",
  });
});

router.get("/a-bd_mnemonicas", (req, res) => {
  res.render("dashboard/aluno/a-bd_mnemonicas", {
    user: req.user,
    title: "Mnemonica",
  });
});

router.get("/a-bd_resumos", async (req, res) => {
  try {
    const resumos = await Resumo.findAll({ where: { aluno_id: req.user.id } });
    res.render("dashboard/aluno/a-bd_resumos", {
      user: req.user,
      title: "Meus Resumos",
      resumos
    });
  } catch (err) {
    console.error("Erro ao carregar resumos:", err);
    req.flash("error", "Erro ao carregar resumos.");
    res.redirect("/aluno/a-resumo");
  }
});

router.get("/a-meusmateriais", (req, res) => {
  res.render("dashboard/aluno/a-meusmateriais", {
    user: req.user,
    title: "Meus Materiais",
  });
});

router.get("/a-gerenciarplano", (req, res) => {
  res.render("dashboard/aluno/a-gerenciarplano", {
    user: req.user,
    title: "Gerenciar Plano",
  });
});

router.get("/a-todososcursos", (req, res) => {
  res.render("dashboard/aluno/a-todososcursos", {
    user: req.user,
    title: "Cursos",
  });
});

router.get("/a-certificado", (req, res) => {
  res.render("dashboard/aluno/a-certificado", {
    user: req.user,
    title: "Certificados",
  });
});

router.get("/aula", (req, res) => {
  res.render("dashboard/aluno/aula", {
    user: req.user,
    title: "Aula",
  });
});

router.get("/aula-card", (req, res) => {
  res.render("dashboard/aluno/aula-card", {
    user: req.user,
    title: "Aula",
  });
});

router.get("/exercicio", (req, res) => {
  res.render("dashboard/aluno/exercicio", {
    user: req.user,
    title: "Exercicio",
  });
});

router.get("/a-avaliar", (req, res) => {
  res.render("dashboard/aluno/a-avaliar", {
    user: req.user,
    title: "Avaliar",
  });
});

router.post("/resumo/save", async (req, res) => {
  try {
    const { titulo, categoria, conteudo } = req.body;
    await Resumo.create({ titulo, categoria, conteudo, aluno_id: req.user.id });
    req.flash("success", "Resumo salvo com sucesso!");
    res.redirect("/aluno/a-bd_resumos");
  } catch (err) {
    console.error("Erro ao salvar resumo:", err);
    req.flash("error", "Erro ao salvar resumo.");
    res.redirect("/aluno/a-resumo");
  }
});

router.get("/resumo/edit/:id", async (req, res) => {
  try {
    const resumo = await Resumo.findOne({ where: { id: req.params.id, aluno_id: req.user.id } });
    if (!resumo) {
      req.flash("error", "Resumo não encontrado");
      return res.redirect("/aluno/a-bd_resumos");
    }
    res.render("dashboard/aluno/a-resumo", { user: req.user, title: "Editar Resumo", resumo });
  } catch (err) {
    console.error("Erro ao carregar resumo para edição:", err);
    req.flash("error", "Erro ao carregar resumo.");
    res.redirect("/aluno/a-bd_resumos");
  }
});

router.post("/resumo/update/:id", async (req, res) => {
  try {
    const { titulo, categoria, conteudo } = req.body;
    await Resumo.update(
      { titulo, categoria, conteudo, data_atualizacao: new Date() },
      { where: { id: req.params.id, aluno_id: req.user.id } }
    );
    req.flash("success", "Resumo atualizado com sucesso!");
    res.redirect("/aluno/a-bd_resumos");
  } catch (err) {
    console.error("Erro ao atualizar resumo:", err);
    req.flash("error", "Erro ao atualizar resumo.");
    res.redirect("/aluno/a-bd_resumos");
  }
});

router.post("/resumo/delete/:id", async (req, res) => {
  try {
    await Resumo.destroy({ where: { id: req.params.id, aluno_id: req.user.id } });
    req.flash("success", "Resumo excluído com sucesso!");
    res.redirect("/aluno/a-bd_resumos");
  } catch (err) {
    console.error("Erro ao excluir resumo:", err);
    req.flash("error", "Erro ao excluir resumo.");
    res.redirect("/aluno/a-bd_resumos");
  }
});

router.post("/avaliar/save", async (req, res) => {
  // Lógica para salvar resumo
});

// Visualizar resumo
router.get("/resumo/view/:id", async (req, res) => {
  try {
    const resumo = await Resumo.findOne({ where: { id: req.params.id, aluno_id: req.user.id } });
    if (!resumo) {
      req.flash("error", "Resumo não encontrado");
      return res.redirect("/aluno/a-bd_resumos");
    }
    res.render("dashboard/aluno/a-view_resumo", { user: req.user, title: "Visualizar Resumo", resumo });
  } catch (err) {
    console.error("Erro ao visualizar resumo:", err);
    req.flash("error", "Erro ao carregar resumo.");
    res.redirect("/aluno/a-bd_resumos");
  }
});

// Rotas de técnicas
router.get("/tecnicas", (req, res) => {
  res.render("dashboard/aluno/a-config", {
    user: req.user,
    title: "Técnicas de Estudo",
  });
});

module.exports = router;