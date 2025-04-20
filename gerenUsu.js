                      
 let users = [];
    let editIndex = null;

    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('show');
    }

    function renderUsers() {
      const tbody = document.getElementById('userTableBody');
      tbody.innerHTML = '';
      users.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.name}</td>
          <td>${user.matricula}</td>
          <td>${user.cargo}</td>
          <td>
            <button onclick="viewUser(${index})">👁️</button>
            <button onclick="editUser(${index})">✏️</button>
            <button onclick="deleteUser(${index})">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    function openForm() {
      document.getElementById('userModal').style.display = 'flex';
      document.getElementById('name').value = '';
      document.getElementById('matricula').value = '';
      document.getElementById('cargo').value = '';
      editIndex = null;
    }

    function closeUserModal() {
      document.getElementById('userModal').style.display = 'none';
    }

    function saveUser() {
      const name = document.getElementById('name').value;
      const matricula = document.getElementById('matricula').value;
      const cargo = document.getElementById('cargo').value;

      if (editIndex === null) {
        users.push({ name, matricula, cargo });
      } else {
        users[editIndex] = { name, matricula, cargo };
      }
      closeUserModal();
      renderUsers();
    }

    function editUser(index) {
      const user = users[index];
      document.getElementById('name').value = user.name;
      document.getElementById('matricula').value = user.matricula;
      document.getElementById('cargo').value = user.cargo;
      document.getElementById('userModal').style.display = 'flex';
      editIndex = index;
    }

    function deleteUser(index) {
      if (confirm('Deseja excluir este usuário?')) {
        users.splice(index, 1);
        renderUsers();
      }
    }

    function viewUser(index) {
      const user = users[index];
      document.getElementById('viewName').innerText = user.name;
      document.getElementById('viewMatricula').innerText = user.matricula;
      document.getElementById('viewCargo').innerText = user.cargo;
      document.getElementById('viewModal').style.display = 'flex';
    }

    function closeView() {
      document.getElementById('viewModal').style.display = 'none';
    }

    function filterUsers() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const tbody = document.getElementById('userTableBody');
      tbody.innerHTML = '';
      users.forEach((user, index) => {
        if (user.name.toLowerCase().includes(query) || user.matricula.toLowerCase().includes(query) || user.cargo.toLowerCase().includes(query)) {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.matricula}</td>
            <td>${user.cargo}</td>
            <td>
              <button onclick="viewUser(${index})">👁️</button>
              <button onclick="editUser(${index})">✏️</button>
              <button onclick="deleteUser(${index})">🗑️</button>
            </td>
          `;
          tbody.appendChild(tr);
        }
      });
    }