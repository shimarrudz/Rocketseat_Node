const express = require('express');

const app = express();

/*
 * GET - Buscar uma informação dentro do servidor 
 * POST - Inserir informações no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informação específica
 * DELETE - Deletar uma informação no servidor
*/

/**
 * Tipos de parâmetros
 * 
 * Route Params => Identificar um recurso editar/deletar/buscar
 * Query Params => Paginação, Filtro = /courses?page=1&order=esc
 ******* O query params é opcional, diferente do route params
 * Body Params => Os objetos inserção/alteração (JSON)

app.use(JSON) é obrigatório ao usar JSON no post */
app.use(express.json);


app.get("/courses",  (request, response) => {
    const query = request.query;
    console.log(query);
    return response.json(["Curso 1", "Curso 2", "Curso 3"
        ]);
    });

app.post("/courses",  (request, response) => {
    const body = request.body;
    console.log(body);
    return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"
        ]);
    });

app.put("/courses/:id", (request, response) => {
    const params = request.params;
    console.log(params)
    return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
});

app.patch("/courses/:id",  (request, response) => {
    const params = request.params;
    console.log(params)
    return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"
        ]);
    });

app.delete("/courses/:id" , (request, response) => {
    return response.json(["Curso 6", "Curso 7", "Curso 4"]);
})

app.listen(3333);
