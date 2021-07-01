const express = require('express');
const app = express();
var path = require('path');

PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:'+PORT);
});

const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

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
