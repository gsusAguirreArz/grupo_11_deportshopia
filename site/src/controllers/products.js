// ------------------- Imports -------------------
const model = require('../models/model');
const prodsModel = model('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ------------------- Controller CODE -------------------
const controller = {
    // '/products/' - Root show all products in DB
    index: (req,res) => {
        let products = prodsModel.data();

        res.render('products/index', {f:toThousand, products:products});
    },
    // '/products/i' - Detail show the detail of the product i
    detail: (req,res) => {
        let ID = req.params.id;
        let product = prodsModel.find(ID);

        res.render('products/detail', {f:toThousand, product:product});
    },
    // '/products/create' - Show the create new product page
    create: (req,res) => {
        res.render('products/create');
    },
    // '/products/' - Method for saving the new product
    store: (req,res) => {
        let form = req.body;
        let img = req.file;

        // Code of newProd

        if (img) {
            newProd.image = img.filename;
        }else{
            newProd.image = 'img-product-placeholder.jpg';
        }

        let nPId = prodsModel.create(newProd);

        res.redirect('/products/'+ nPId);

    },
    // '/products/i/edit' - Show page to edit the product i
    edit: (req,res) => {
        let ID = req.params.id;
        let product = prodsModel.find(ID);

        res.render('products/edit', {product:product});
    },
    // '/products/i' - Method to save changes of product i
    update: (req,res) => {
        let ID = req.params.ID;
        let form = req.body;
        let img = req.file;

        // Code for editedProduct
        editedProduct.id = ID

        if (img) {
            editedProduct.image = img.filename;
        }else{
            editedProduct.image = prodsModel.find(ID).image;
        }

        let pId = prodsModel.update(editedProduct);

        res.redirect('/products/'+ID);
    },
    // '/products/' - Method to delete the product i from DB
    destroy: (req,res) => {
        let ID = req.params.id;

        prodsModel.delete(ID);

        res.redirect('/products');
    },
};

// ------------------- Exports -------------------
module.exports = controller;