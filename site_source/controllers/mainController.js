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
};

module.exports = controller;