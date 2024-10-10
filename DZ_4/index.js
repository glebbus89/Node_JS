const express = require('express');
const fs = require('fs');
const path = require('path');
const joi = require('joi');

const app = express();
const port = 3000;
const file = path.join(__dirname,'person.json');

let id = 0;
app.use(express.json());

const userScheme = joi.object({
    firstName: joi.string().min(3).required(),
    secondName: joi.string().min(2).required(),
    age: joi.number().min(18).required(),
    city: joi.string().min(2)
});

app.get("/users", (req, res) => {
    const users = JSON.parse(fs.readFileSync(file, "utf-8"));
    res.send({ users });
});

app.get("/users/:id", (req, res) => {
    const users = JSON.parse(fs.readFileSync(file, "utf-8"));
    const user = users.find((user) => user.id === +req.params.id);
    if (user) {
        res.send({ user });
    } else {
        res.status(404).send({ message: "User not found" });
    }
});

app.post("/users", (req, res) => {
    const result = userScheme.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details);
    }

    const users = JSON.parse(fs.readFileSync(file, "utf-8"));
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, ...req.body };

    users.push(newUser);
    fs.writeFileSync(file, JSON.stringify(users, null,2), 'utf-8');
    
    res.send({id: newId});
});

app.put("/users/:id", (req, res) => {
    const result = userScheme.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details);
    }

    const users = JSON.parse(fs.readFileSync(file, "utf-8"));
    const userId = +req.params.id;
    const userIndex = users.findIndex((user) => user.id === userId);

    if  (userIndex !== -1) {
        users[userIndex] = {...users[userIndex], ...req.body};
        fs.writeFileSync(file, JSON.stringify(users, null,2), 'utf-8');
        res.send({user: users[userIndex]});
    } else {
        res.status(404).send({message: "User not found"});
    }
});

app.delete("/users/:id", (req, res) => {
    const users = JSON.parse(fs.readFileSync(file, "utf-8"));
    const userId = +req.params.id;
    const userIndex = users.findIndex(user => user.id === userId);
    if  (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        fs.writeFileSync(file, JSON.stringify(users, null,2), 'utf-8');
        res.send({user: deletedUser });
    } else {
        res.status(404).send({message: "User not found"});
    }
});


app.listen(3000,()=> {
    console.log(`Сервер запущен на порту ${port}`);
});

