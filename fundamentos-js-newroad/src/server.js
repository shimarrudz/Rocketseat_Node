import http from 'node:http';

const users = [];

const server = http.createServer((req, response) => {
    const { method, url } = req;

    if (method === 'GET' && url === "/users"){

        return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if (method === "POST" && url === "/users"){
        users.push({
            ida: 1,
            name: "Victor Shimada",
            email: "vic.shima@example.com"
        })

        return response.writeHead(201).end();
    }


    return response.writeHead(404).end();
})

server.listen(5555)



