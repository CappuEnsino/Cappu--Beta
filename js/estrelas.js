document.addEventListener("DOMContentLoaded", function () {
    const estrelas = document.querySelectorAll(".estrela a");
    const numero = document.querySelector(".numero");
    let avaliacao = 0;
  
    estrelas.forEach((estrela) => {
      estrela.addEventListener("mouseover", function () {
        const valor = parseInt(this.getAttribute("data-value"));
        highlightStars(valor);
      });
  
      
      estrela.addEventListener("click", function (e) {
        e.preventDefault();
        avaliacao = parseInt(this.getAttribute("data-value"));
        numero.textContent = avaliacao;
        highlightStars(avaliacao);
      });
  
      document
        .querySelector(".estrela")
        .addEventListener("mouseleave", function () {
          highlightStars(avaliacao);
        });
    });
  
    function highlightStars(valor) {
      estrelas.forEach((estrela) => {
        const estrelaValor = parseInt(estrela.getAttribute("data-value"));
        const img = estrela.querySelector("img");
  
        if (estrelaValor <= valor) {
          img.classList.add("ativa");
        } else {
          img.classList.remove("ativa");
        }
      });
    }
  });
  