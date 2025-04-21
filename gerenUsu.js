const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});



let usuarios = [
  { nome: "Patricia", matricula: "4582", cargo: "Perito" },
  { nome: "Juliana", matricula: "6874", cargo: "Assistente" },
  { nome: "Nycole", matricula: "7319", cargo: "Assistente" },
  { nome: "Edson", matricula: "1546", cargo: "Perito" },
  { nome: "Renata", matricula: "9438", cargo: "Admin" },
  { nome: "Gabriela", matricula: "1452", cargo: "Admin" },
];

let usuariosFiltrados = [...usuarios];
let currentPage = 1;
const rowsPerPage = 15;
let editIndex = null;


function displayUsers(users, page = 1) {
  const table = document.getElementById("userTable");
  table.innerHTML = "";
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedUsers = users.slice(start, end);

  paginatedUsers.forEach((user, index) => {
    const row = `<tr>
      <td>${user.nome}</td>
      <td>${user.matricula}</td>
      <td>${user.cargo}</td>
      <td class="actions">
        <i class="fas fa-eye" title="Visualizar" onclick="visualizarUsuario(${start + index})"></i>
        <i class="fas fa-pen" title="Editar" onclick="editarUsuario(${start + index})"></i>
        <i class="fas fa-trash" title="Excluir" onclick="excluirUsuario(${start + index})"></i>
      </td>
    </tr>`;
    table.innerHTML += row;
  });
  renderPagination(users);
}

function renderPagination(users) {
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const container = document.getElementById("pagination");
  container.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      displayUsers(usuariosFiltrados);
    };
    container.appendChild(btn);
  }
}

function filterUsers() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  usuariosFiltrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(query) ||
    u.matricula.includes(query) ||
    u.cargo.toLowerCase().includes(query)
  );
  currentPage = 1,2;
  displayUsers(usuariosFiltrados);
}

function abrirModalAdicionar() {
  editIndex = null;
  document.getElementById("modalTitle").textContent = "Adicionar Usuário";
  document.getElementById("nomeInput").value = "";
  document.getElementById("matriculaInput").value = "";
  document.getElementById("cargoInput").value = "";
  document.getElementById("modal").style.display = "flex";
}

function visualizarUsuario(index) {
  const user = usuariosFiltrados[index];
  alert(`Nome: ${user.nome}\nMatrícula: ${user.matricula}\nCargo: ${user.cargo}`);
}

function editarUsuario(index) {
  editIndex = usuarios.findIndex(u => u === usuariosFiltrados[index]);
  const user = usuarios[editIndex];
  document.getElementById("modalTitle").textContent = "Editar Usuário";
  document.getElementById("nomeInput").value = user.nome;
  document.getElementById("matriculaInput").value = user.matricula;
  document.getElementById("cargoInput").value = user.cargo;
  document.getElementById("modal").style.display = "flex";
}

function excluirUsuario(index) {
  const realIndex = usuarios.findIndex(u => u === usuariosFiltrados[index]);
  if (confirm("Deseja realmente excluir este usuário?")) {
    usuarios.splice(realIndex, 1);
    filterUsers();
  }
}

function salvarUsuario() {
  const nome = document.getElementById("nomeInput").value;
  const matricula = document.getElementById("matriculaInput").value;
  const cargo = document.getElementById("cargoInput").value;
  if (!nome || !matricula || !cargo) {
    alert("Preencha todos os campos.");
    return;
  }
  const novoUsuario = { nome, matricula, cargo };
  if (editIndex !== null) {
    usuarios[editIndex] = novoUsuario;
  } else {
    usuarios.push(novoUsuario);
  }
  document.getElementById("modal").style.display = "none";
  filterUsers();
}

window.onclick = function(e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
}

displayUsers(usuarios);

