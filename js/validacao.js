document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const credenciais = [
        { email: "aluno@gmail.com", senha: "senha123", redirect: "../aluno/a-perfil.html" },
        { email: "admin@gmail.com", senha: "senha123", redirect: "../aluno/adm-painel.html" },
        { email: "professor@gmail.com", senha: "senha123", redirect: "../professor/p-professor.html" }
    ];

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    const credencialValida = credenciais.find(credencial => 
        credencial.email === email && credencial.senha === senha
    );

    if (credencialValida) {
        window.location.href = credencialValida.redirect;
    } else {
        alert("Email ou senha incorretos!");
        document.getElementById('senha').value = '';
        document.getElementById('email').focus();
    }
});