import { createServer } from 'http'
import data from './data.js'
import { getList } from './list.js'
import { deleteAddress } from './delete.js'

createServer((req, res) => {
    let responseBody
    const parts = req.url.split('/')
    if (parts.includes('delete')) {
        data.addresses = deleteAddress(data.addresses, parts[2])
        redirect(res, '/')
    }
    else {
        res.writeHead(200, {'content-type' : 'text/html'});
        responseBody = getList(data.addresses)
        res.end(responseBody)
    }
}).listen(8080, () => {
    console.log('Address book readable at http://localhost:8080')
})
function redirect(res, to)
{
    res.writeHead(302, {location : '/', 'content-type' : 'text/plain'})
    res.end('302 Redirecting to')
}