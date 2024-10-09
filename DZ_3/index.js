
const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const port = 3000;

const file = path.join(__dirname,'quantity.JSON');
let obj;

if (fs.existsSync(file)) {
    const data = fs.readFileSync(file, 'utf-8');
    obj = JSON.parse(data);
} else {
    obj = { home: 0, about: 0}
    fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}

app.get('/', (req , res) => {
    res.send(`<h1>Корневая страница</h1>
        <p>Просмотры: ${obj.home} </p> 
        <a href="/about">Ссылка на страницу /about</a>`);
    obj.home += 1;
    fs.writeFileSync(file, JSON.stringify(obj, null, 2 ))
});


app.get('/about', (req , res) => {
    res.send(`<h1>Страница about</h1>
        <p>Просмотры: ${obj.about}</p> 
        <a href="/">Ссылка на страницу /</a>`);
    obj.about += 1;
    fs.writeFileSync(file, JSON.stringify(obj, null, 2 ))
    
});

app.listen(3000, () => {
    console.log(`Сервер запущен на порту ${port}`);
});