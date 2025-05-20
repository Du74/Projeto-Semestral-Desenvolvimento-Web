function cadastrarProduto() {
  const nome = document.getElementById('nome').value;
  const preco = document.getElementById('preco').value;
  const estoque = document.getElementById('estoque').value;

  fetch('http://localhost:3000/api/produtos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, preco, estoque })
  })
  .then(res => res.json())
  .then(data => {
    alert('Produto cadastrado com sucesso!');
    carregarProdutos();
  });
}

function carregarProdutos() {
  fetch('http://localhost:3000/api/produtos')
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById('lista');
      lista.innerHTML = '';
      data.forEach(prod => {
        lista.innerHTML += `<li>${prod.nome} - R$${prod.preco} (${prod.estoque} un)</li>`;
      });
    });
}

carregarProdutos();