// ------------------- Imports -------------------
const model = require('../models/model');
const prodsModel = model('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ------------------- Controller CODE -------------------
const controller = {
    index: (req,res) => {
        let products = prodsModel.data();

        res.render('products/index', {f:toThousand, products:products});
    },
    detail: (req,res) => {
        let ID = req.params.id;
        let product = prodsModel.find(ID);

        res.render('products/detail', {f:toThousand, product:product});
    },
    create: (req,res) => {
        res.render('products/create');
    },
    store: (req,res) => {
        let form = req.body;

        // Code of new product

        prodsModel.create(newProd);

        res.redirect('/products/'+newProd.id);

    },
    edit: (req,res) => {
        let ID = req.params.id;
        let product = prodsModel.find(ID);

        res.render('products/edit', {product:product});
    },
    update: (req,res) => {
        let ID = req.params.ID;
        let form = req.body;

        // Code for product update
        prodsModel.update(updatedProduct);

        res.redirect('/products/'+ID);
    },
    destroy: (req,res) => {
        let ID = req.params.id;

        prodsModel.delete(ID);

        res.redirect('/products');
    },
};

// ------------------- Exports -------------------
module.exports = controller;