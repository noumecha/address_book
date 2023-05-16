import { createServer, request } from 'http';
import data from './data.js';
import { getList } from './list.js';
import { deleteAddress } from './delete.js';
import { getForm } from './form.js';
import { parse } from 'querystring';
import { saveAddress } from './save.js';

createServer((req, res) => {
    //let responseBody;
    const parts = req.url.split('/');
    if (parts.includes('delete')) {
        data.addresses = deleteAddress(data.addresses, parts[2]);
        redirect(res, '/');
    } else if (parts.includes('new')) {
        send(res, getForm());
    } else if (parts.includes('edit')) {
        send(res, getForm(data.addresses, parts[2]));
    } else if (parts.includes('save') && req.method === 'POST') {
        let body = '';
        req.on('readable', () => {
            const data = req.read();
            body += data !== null ? data :'';
        });
        req.on('end', () => {
            const address = parse(body);
            console.error(address);
            data.addresses = saveAddress(data.addresses, address);
            redirect(res, '/');
        })
    }
    else {
        send(res,  getList(data.addresses));
    }
}).listen(8080, () => {
    console.log('Address book readable at http://localhost:8080');
})
function send(res, responseBody)
{
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(responseBody);
}
function redirect(res, to)
{
    res.writeHead(302, {location : '/', 'content-type' : 'text/plain'});
    res.end('302 Redirecting to');
}