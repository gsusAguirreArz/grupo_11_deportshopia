var controller = {
    home: (req,res) => {
        res.render('index');
    },
    login: (req,res) => {
        res.render('login');
    },
    register: (req,res) => {
        res.render('register');
    },
    shopcart: (req,res) => {
        res.render('cart');
    },
    details: (req,res) => {
        res.render('detalles');

    },
};

module.exports = controller;