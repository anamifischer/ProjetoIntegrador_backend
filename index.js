const express = require('express');

const server = express();

const PORT = 3000;

server.get('/produtos', (request, response) => {
    return response.send('Hello World!')
});

server.get('/produtos/:id', (req, res) =>{
    const id = req.params.id;
    return res.send(`O produto tem id = ${id}`);
})

server.post('/produtos', (request, response) => {
    return res.send('Produto cadastrado com sucesso');
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});
