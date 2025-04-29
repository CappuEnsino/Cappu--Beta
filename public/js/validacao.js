document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const credenciais = [
        { email: "aluno@gmail.com", senha: "senha123", redirect: "../dashboard/aluno/a-perfil" },
        { email: "admin@gmail.com", senha: "senha123", redirect: "../dashboard/adm/adm-painel" },
        { email: "professor@gmail.com", senha: "senha123", redirect: "../dashboard/professor/p-professor"}
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