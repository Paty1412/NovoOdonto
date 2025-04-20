
function salvarDados() {
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const tipo = document.getElementById('tipo').value;
    const matricula = document.getElementById('matricula').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!nome || !cpf || !email || !matricula || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    alert(
      `Cadastro salvo com sucesso!\n\n` +
      `Nome: ${nome}\nCPF: ${cpf}\nEmail: ${email}\nCargo: ${tipo}\nMatrícula: ${matricula}`
    );

    document.getElementById("container").reset();
  }

  function limparFormulario() {
    if (confirm("Tem certeza que deseja limpar o formulário?")) {
      document.getElementById("container").reset();
    }
  }

  const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});








  