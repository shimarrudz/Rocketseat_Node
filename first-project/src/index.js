const express = require('express');
const {v4: uuidv4} = require('uuid'); /* v4 gera números random */

const app = express();

app.use(express.json());

const costumers = [];

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement []
*/ 

/* @POST - Cadastrando usuário */
app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const costumerAlrearyExists = costumers.some(
        (costumer) => costumer.cpf === cpf);

    if(costumerAlrearyExists) {
        return response.status(400).json({ error: "Costumer already exists!"})
    };

    const id = uuidv4();

    costumers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return response.status(201).send();
});

//Middleware que verifica se a conta existe pelo CPF
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;

    const costumer = costumers.find((costumer)=> costumer.cpf === cpf);
    
    if(!costumer) {
        return response.status(400).json({ error: "Costumer not found" });
    }

    request.costumer = costumer

    return next();
}

// Middleware que verifica o saldo da conta
function getBalance(statement) {
    statement.reduce((acc, operation) => {
        
    })
}


//Caso o middleware fosse para todas as apis app.use(verifyIfExistsAccountCPF);


/* @GET - Listando extrato e validando a conta */
app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
    const { costumer } = request
    return response.json(costumer.statement);
})

// @POST - Deposito
app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount} = request.body;

    const { costumer} = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }
    
    costumer.statement.push(statementOperation);

    return response.status(201).send();
})

// @POST = Saque
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
    const { amount } = request.body;
    const { costumer } = request;

    const balance = getBalance(costumer.statement);

    if(balance < account) {
        return response.status(400).json({error:"Insufificient funds!"});
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "débit"
    };

    costumer.statement.push(statementOperation);

    return response.status(201).send();


})

app.listen(4444);