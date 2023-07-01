import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extrectQueryParams } from './utils/extract-query-params.js';

//Query Parameters
//Route Parameters
// Request Body; 

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        // console.log(extrectQueryParams(routeParams.groups.query))

        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extrectQueryParams(query) : {}

        return route.handler(req, res)
    }

    return response.writeHead(404).end();
})

server.listen(8888)
