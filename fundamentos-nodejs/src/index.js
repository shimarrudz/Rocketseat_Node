const express = require('express');

const app = express();

// Request é o que vamos receber da requisição
// É o que vai retornar da requisição
app.get("/",  (request, response) => {
    return response.json({message: "Hello World Ignite!"}); // Envia uma mensagem para quem está solicitando
});

// .listen é usado para passar a porta da aplicação como parâmetro
// localhost: 3333
app.listen(3333);

