const express = require('express');
var path = require('path');

var porductsController = require("./controllers/products")
var product = require("./models/product")

var app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Server running on http://localhost:'+PORT);
});

app.get('/', (req,res) => {
    let file = path.join(__dirname, './views/index.html');
    res.sendFile(file);
});

app.get('/product', (req,res) => {
    let file = path.join(__dirname, './views/productDetail.html');
    res.sendFile(file);
});

app.get('/login', (req,res) => {
    let file = path.join(__dirname, './views/login.html');
    res.sendFile(file);
});

app.get('/cart', (req,res) => {
    let file = path.join(__dirname, './views/productCart.html');
    res.sendFile(file);
});

app.get('/register', (req,res) => {
    let file = path.join(__dirname, './views/register.html');
    res.sendFile(file);
});
