// ------------------- Imports -------------------
const model = require('../models/model');
const prodsModel = model('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ------------------- Controller CODE -------------------
const controller = {
    index: (req,res,next) => {
        res.render('main/index');
    },
    search: (req,res,next) => {
        res.send('Buscando')
    },
    login: (req,res,next) => {
        res.render('users/login');
    },
    cart: (req,res,next) => {
        res.render('cart');
    },
};

// ------------------- Exports -------------------
module.exports = controller;