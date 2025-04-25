document.addEventListener("DOMContentLoaded", function () {
    const materiaisContainer = document.querySelector(".materiais-container");
    const adicionarMaterialBtn = document.getElementById("adicionarMaterial");
    const materiaisTable = document.querySelector("table");
  
    adicionarMaterialBtn.addEventListener("click", function () {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
              <td><input type="text" name="titulo" required></td>
              <td>
                  <select name="tipo" required>
                      <option value="video">Vídeo</option>
                      <option value="documento">Documento</option>
                      <option value="link">Link</option>
                  </select>
              </td>
              <td>
                  <button type="button" class="remover-material">Remover</button>
              </td>
          `;
  
      materiaisTable.querySelector("tbody").appendChild(newRow);
  
      // Adiciona evento de remoção ao novo botão
      newRow
        .querySelector(".remover-material")
        .addEventListener("click", function () {
          newRow.remove();
        });
    });
  
    // Adiciona eventos de remoção aos botões existentes
    document.querySelectorAll(".remover-material").forEach((button) => {
      button.addEventListener("click", function () {
        this.closest("tr").remove();
      });
    });
  
    // Validação do formulário antes de enviar
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
      const alternativas = document.querySelectorAll('input[name="alternativa"]');
      const alternativaCorreta = document.querySelector(
        'input[name="alternativaCorreta"]:checked'
      );
      const materiais = document.querySelectorAll('input[name="titulo"]');
  
      if (alternativas.length < 2) {
        e.preventDefault();
        alert("Adicione pelo menos 2 alternativas");
        return;
      }
  
      if (!alternativaCorreta) {
        e.preventDefault();
        alert("Selecione a alternativa correta");
        return;
      }
  
      if (materiais.length === 0) {
        e.preventDefault();
        alert("Adicione pelo menos um material de apoio");
        return;
      }
    });
  });
  