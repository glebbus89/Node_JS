const http = require('http');

let mainUrl = 1;
let aboutUrl = 1;
let errUrl = 1;

const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'});
        res.end(`<a href="/about">Перейти на страницу обо мне!</a>
            <p>Просмотры:${mainUrl++}</p>`);
        
    }
    else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'});
        res.end(`<a href="/">Перейти на главную!</a>
            <p>Просмотры:${aboutUrl++} </p>`);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8'});
        res.end(`<h1>Страница 404</h1>
            <p>Просмотры:${errUrl++} </p>`);
    }
    
});



const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});




// res.writeHead(200, {
    //     'Content-Type': 'text/html; charset=utf-8'});
    // res.end('<h1>Hello, Node!</h1>');
