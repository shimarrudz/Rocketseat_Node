import http from 'node:http';

const users = [];

const server = http.createServer(async (req, response) => {
    const { method, url } = req;

    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }
    
    try{
    const body = JSON.parse(Buffer.concat(buffers).toString());
    } catch


    if (method === 'GET' && url === "/users"){

        return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if (method === "POST" && url === "/users"){
        const { name, email } = body

        users.push({
            ida: 1,
            name,
            email
        })

        return response.writeHead(201).end();
    }


    return response.writeHead(404).end();
})

server.listen(5555)



