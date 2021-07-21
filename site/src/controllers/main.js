// ------------------- Imports -------------------
const model = require('../models/model');
const prodsModel = model('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ------------------- Controller CODE -------------------
const controller = {
    index: (req,res) => {
        let products = prodsModel.data();
        
        res.render('main/index', {products:products});
    },
    search: (req,res) => {
        let products = prodsModel.data();
        let kw = req.query.keywords;

        let searchRes = products.filter(product => product.name.toLowerCase().includes(kw.toLowerCase()) || product.description.toLowerCase().includes(kw.toLowerCase()));

        res.render('main/results', {products:searchRes, keywords: kw, f:toThousand});
    },
    login: (req,res) => {
        res.render('users/login');
    },
    cart: (req,res) => {
        res.render('cart');
    },
};

// ------------------- Exports -------------------
module.exports = controller;