async function carregarMateriais() {
    const res = await fetch("http://localhost:3000/materiais");
    const dados = await res.json();
    const tabela = document.getElementById("tabela-materiais");
    tabela.innerHTML = "";
    dados.forEach(m => {
        tabela.innerHTML += `<tr><td>${m.id}</td><td>${m.nome}</td><td>${m.quantidade}</td></tr>`;
    });
}
async function adicionarMaterial() {
    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    await fetch("http://localhost:3000/materiais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, quantidade: Number(quantidade) })
    });
    carregarMateriais();
}
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('mainContent');
  sidebar.classList.toggle('active');
  content.classList.toggle('active');
}