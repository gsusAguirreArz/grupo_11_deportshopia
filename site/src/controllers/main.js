// ------------------- Imports -------------------
const model = require('../models/model');
const prodsModel = model('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ------------------- Controller CODE -------------------
const controller = {
    // '/' - Root show Home page
    index: (req,res) => {
        let products = prodsModel.data();
        
        res.render('main/index', {products:products, f: toThousand});
    },
    // '/search' - Show search results
    search: (req,res) => {
        /*let products = prodsModel.data();
        let kw = req.query.keywords;

        let searchRes = products.filter(product => product.name.toLowerCase().includes(kw.toLowerCase()) || product.description.toLowerCase().includes(kw.toLowerCase()));

        res.render('main/search', {products:searchRes, keywords: kw, f:toThousand});*/
        res.render('/search');
    },
    // '/login' - Show login page
    login: (req,res) => {
        res.render('users/login');
    },
    // '/cart' - Show cart page
    cart: (req,res) => {
        res.render('cart');
    },
};

// ------------------- Exports -------------------
module.exports = controller;