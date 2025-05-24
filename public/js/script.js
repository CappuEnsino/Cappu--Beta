 // Função para verificar resposta
 function verificarResposta() {
    const opcoes = document.querySelectorAll('.opcao');
    const botoesNavegacao = document.getElementById('botoes-navegacao');
    let respostaSelecionada = null;

    // Verificar qual opção foi selecionada
    opcoes.forEach(opcao => {
        if (opcao.classList.contains('selecionada')) {
            respostaSelecionada = opcao;
        }
    });

    if (!respostaSelecionada) {
        alert('Por favor, selecione uma opção antes de verificar!');
        return;
    }

    // Remover estilos anteriores
    opcoes.forEach(opcao => {
        opcao.classList.remove('correta', 'incorreta');
    });

    // Verificar se a resposta está correta (a resposta correta é a opção 4 - "N.D.A")
    const respostaCorreta = opcoes[3]; // "N.D.A"
    
    if (respostaSelecionada === respostaCorreta) {
        respostaSelecionada.classList.add('correta');
        botoesNavegacao.style.display = 'flex'; // Mostrar botões após resposta correta
    } else {
        respostaSelecionada.classList.add('incorreta');
        respostaCorreta.classList.add('correta'); // Marcar a opção correta
    }
}

// Função para verificar resposta quando uma opção é clicada
function verificarResposta(respostaSelecionada) {
    const opcoes = document.querySelectorAll('.opcao');
    const botoesNavegacao = document.getElementById('botoes-navegacao');
    
    // Remover estilos anteriores
    opcoes.forEach(opcao => {
        opcao.classList.remove('correta', 'incorreta', 'selecionada');
    });
    
    // Adicionar classe de seleção
    respostaSelecionada.classList.add('selecionada');
    
    // Verificar se a resposta está correta (a resposta correta é a opção 4 - "N.D.A")
    const respostaCorreta = opcoes[3]; // "N.D.A"
    
    if (respostaSelecionada === respostaCorreta) {
        respostaSelecionada.classList.add('correta');
        botoesNavegacao.style.display = 'flex'; // Mostrar botões após resposta correta
    } else {
        respostaSelecionada.classList.add('incorreta');
        respostaCorreta.classList.add('correta'); // Marcar a opção correta
    }
}

// Adicionar evento de clique nas opções
const opcoes = document.querySelectorAll('.opcao');
opcoes.forEach(opcao => {
    opcao.addEventListener('click', () => verificarResposta(opcao));
});
