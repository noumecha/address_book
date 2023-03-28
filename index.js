import { request, Server } from 'http'
import data from './data.js'
import { getList } from './list.js'
import { deleteAddress } from './delete.js'
import { getForm } from './form.js'
import { parse } from 'querystring'
import { saveAdress } from './save.js'
import { readFile, rename } from 'fs'
import formidable from 'formidable'

const server = new Server

server.on('request', (req, res) => {
    const parts = req.url.split('/')
    if (parts.includes('delete')) {
        data.address = deleteAddress(data.address, parts[2])
        redirect(res, '/')
    } else if(parts.includes('new')) {
        send(res, getForm())
    } else if(parts.includes('edit')) {
        send(res, getForm(data.address, parts[2]))
    } else if (parts.includes('save') && req.method === 'POST') {
        let body = ''
        req.on('readable', () => {
            const data = req.read()
            body += data !== null ? data : ''
        })
        req.on('end',() => {
            const address = parse(body)
            data.address = saveAdress(data.address, address)
            console.log('content of new value' ,address)
            redirect(res, '/')
        })
    } else if (req.url === '/style.css') {
        readFile('public/style.css', 'utf8', (err, data) => {
            if(err) {
                res.statusCode = 404;
                res.end()
            } else {
                res.end(data)
            }
        })
    } else if(parts.includes('save') && request.method === 'POST') {
        const form = new formidable.IncomingForm()
        form.parse(request, (err, address, files) => {
            if(files.upload) {
                rename(files.upload.path,`public/assets/${files.upload.name}`,() => {
                    address['file'] = `/assets/${files.upload.name}`
                })
            }
        })
        data.address = saveAdress(data.address, address)
        redirect(res, '/')
    } else if (parts.includes('assets')) {
        readFile(`public/assets/${request.url.replaceAll('%20', ' ')}`, (err, data) => {
            if (err) {
                res.statusCode = 404
                res.end()
            }
        })
    } else {
        send(res, getList(data.address))
    }
})

function send(res, responseBody) {
    res.statusCode = 200
    res.setHeader = ('content-type' , 'text/html')
    res.end(responseBody)
}

function redirect(res, to) {
    res.writeHead(302, {location: '/', 'content-type': 'text/plain'})
    res.end(`302 Redirecting to /`)
}

server.on('listening', () => {
    console.log(`Adress book project start via http://localhost:${server.address().port}`)
})

server.listen(8080)