const express = require('express');

const server = express();
server.use(express.json());

const PORT = 3000;

let produtos = [
  { id: 1, nome: 'Teclado', preco: 120 },
  { id: 2, nome: 'Mouse', preco: 60 },
  { id: 3, nome: 'Monitor', preco: 600 }
];

// Buscar todos os produtos
server.get('/produtos', (req, res) => {
  return res.status(200).json(produtos);
});

// Buscar produto por ID
server.get('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({
      message: 'Produto não encontrado'
    });
  }

  return res.status(200).json(produto);
});

// Cadastrar produto
server.post('/produtos', (req, res) => {
  const { nome, preco } = req.body;

  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco
  };

  produtos.push(novoProduto);

  return res.status(201).json(novoProduto);
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

