document.getElementById("ciclos").addEventListener("change", atualizarBlocos);
document.getElementById("tempo-foco").addEventListener("change", atualizarTempos);
document.getElementById("tempo-descanso").addEventListener("change", atualizarTempos);
document.getElementById("iniciar").addEventListener("click", alternarCronometro);
document.querySelector(".toggle").addEventListener("click", function() {
    const janela = document.getElementById("janela-flutuante");
if (janela.style.display === "none" || janela.style.display === "") {
    janela.style.display = "block";
    janela.style.opacity = "1";
} else {
    janela.style.display = "none";
    janela.style.opacity = "0";
}

});

let tempoAtual = 0;
let intervalo = null;
let rodando = false;
let emFoco = true;

function atualizarBlocos() {
    const container = document.getElementById("visu");
    container.innerHTML = ""; 

    const quantidade = parseInt(document.getElementById("ciclos").value);
    const tempoFoco = document.getElementById("tempo-foco").value;
    const tempoDescanso = document.getElementById("tempo-descanso").value;

    for (let i = 0; i < quantidade; i++) {
        let section = document.createElement("section");
        section.classList.add("visu");

        let titulo = document.createElement("h2");
        titulo.textContent = `${i + 1}º Ciclo`;

        let box1 = document.createElement("section");
        box1.classList.add("box1");
        let p1 = document.createElement("p");
        p1.textContent = `${tempoFoco} minutos`;
        box1.appendChild(p1);

        let box2 = document.createElement("section");
        box2.classList.add("box2");
        let p2 = document.createElement("p");
        p2.textContent = `${tempoDescanso} minutos`;
        box2.appendChild(p2);

        section.appendChild(titulo);
        section.appendChild(box1);
        section.appendChild(box2);
        container.appendChild(section);
    }
}

function atualizarTempos() {
    const novoTempoFoco = document.getElementById("tempo-foco").value;
    const novoTempoDescanso = document.getElementById("tempo-descanso").value;

    document.querySelectorAll(".box1 p").forEach(p => p.textContent = `${novoTempoFoco} minutos`);
    document.querySelectorAll(".box2 p").forEach(p => p.textContent = `${novoTempoDescanso} minutos`);
}

function alternarCronometro() {
    const botao = document.getElementById("iniciar");
    
    if (rodando) {
        clearInterval(intervalo);
        botao.textContent = "Iniciar Cronômetro";
        rodando = false;
    } else {
        iniciarCronometro();
        botao.textContent = "Parar Contagem";
        rodando = true;
    }
}

function iniciarCronometro() {
    if (intervalo) clearInterval(intervalo);

    const tempoFoco = parseInt(document.getElementById("tempo-foco").value) * 60;
    const tempoDescanso = parseInt(document.getElementById("tempo-descanso").value) * 60;
    tempoAtual = emFoco ? tempoFoco : tempoDescanso;

    atualizarTela();

    intervalo = setInterval(() => {
        if (tempoAtual > 0) {
            tempoAtual--;
            atualizarTela();
        } else {
            alternarCiclo();
        }
    }, 1000);
}

function atualizarTela() {
    const minutos = Math.floor(tempoAtual / 60);
    const segundos = tempoAtual % 60;
    document.getElementById("cronometro").textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function alternarCiclo() {
    emFoco = !emFoco;
    iniciarCronometro();
}

document.getElementById("tempo-foco").addEventListener("change", atualizarTempos);
document.getElementById("tempo-descanso").addEventListener("change", atualizarTempos);

function atualizarTempos() {
    const novoTempoFoco = document.getElementById("tempo-foco").value;
    const novoTempoDescanso = document.getElementById("tempo-descanso").value;

    document.querySelectorAll(".box1 p").forEach(p => p.textContent = `${novoTempoFoco} minutos`);
    document.querySelectorAll(".box2 p").forEach(p => p.textContent = `${novoTempoDescanso} minutos`);
}

function alternarCronometro() {
    const botao = document.getElementById("iniciar");

    if (rodando) {
        clearInterval(intervalo);
        botao.textContent = "Iniciar";
        rodando = false;
    } else {
        iniciarCronometro();
        botao.textContent = "Parar Contagem";
        rodando = true;
    }
}

document.getElementById("toggle").addEventListener("click", function() {
    const janela = document.getElementById("janela-flutuante");
    if (janela.style.display === "none" || janela.style.display === "") {
        janela.style.display = "block";
        janela.style.opacity = "1";
    } else {
        janela.style.display = "none";
        janela.style.opacity = "0";
    }
});