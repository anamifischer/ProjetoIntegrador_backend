const express = require('express');

const server = express();
server.use(express.json());

const PORT = 3000;

let produtos = [
  { id: 1, produto: 'Teclado', preco: 120 },
  { id: 2, produto: 'Mouse', preco: 60 },
  { id: 3, produto: 'Monitor', preco: 600 }
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
  console.log(req.body);
  // const { produto, preco } = req.body;
  const produto = req.body.produto;
  const preco = req.body.preco;

  console.log(produto);


  if (!produto || !preco) {
    return res.status(400).json({
      message: 'Produto e preço são obrigatórios!'
    });
  }

  const novoProduto = {
    id: produtos.length + 1,
    produto,
    preco: preco
  };

  produtos.push(novoProduto);
  return res.status(201).json(novoProduto);
});

//Deletar um produto
server.delete('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);

  const produtoIndex = produtos.findIndex((p) => p.id === id);

  console.log(produtoIndex);

  if (produtoIndex === -1) {
    return res.status(404).json({
      message: 'Produto não encontrado!'
    });
  }

  produtos.splice(produtoIndex, 1);

  return res.status(200).json({
    message: 'Produto excluído com sucesso!'
  });
});


//Atualizar produto
server.put('/produtos/:id', (req, res) => {
  const id = req.params.id;
  const { produto, preco } = req.body;

  const produtoIndex = produtos.findIndex((p) => p.id == id);

  if (produtoIndex == -1) {
    return res.status(404).json({
      message: 'Produto não encontrado!'
    });
  }

  if (!produto || !preco) {
    return res.status(400).json({
      message: 'Produto e preço são obrigatórios!'
    });
  }

  produtos[produtoIndex] = {
    id: parseInt(id),
    produto,
    preco
  };

  return res.status(200).json({
    message: 'Produto atualizado com sucesso!',
    produto: produtos[produtoIndex]
  });
});



server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

