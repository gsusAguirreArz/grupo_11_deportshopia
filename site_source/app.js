const express = require('express');
const app = express();
var path = require('path');
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Servidor funcionando');
});


app.get('/', (req,res) => {
    let file1 = path.join(__dirname, './views/index.html');
    res.sendFile(file1);
});

app.get('/product', (req,res) => {
    let file2 = path.join(__dirname, './views/productDetail.html');
    res.sendFile(file2);
});

app.get('/login', (req,res) => {
    let file3 = path.join(__dirname, './views/login.html');
    res.sendFile(file3);
});

app.get('/cart', (req,res) => {
    let file4 = path.join(__dirname, './views/cart.html');
    res.sendFile(file4);
});

app.get('/register', (req,res) => {
    let file5 = path.join(__dirname, './views/register.html');
    res.sendFile(file5);
});
