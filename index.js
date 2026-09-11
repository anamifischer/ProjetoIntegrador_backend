const express = require('express');

const server = express();

server.get('/produtos', (request, response) => {
    return response.send('Hello World!')
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
});