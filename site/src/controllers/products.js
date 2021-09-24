// ------------------- Imports -------------------
const{validationResult} = require('express-validator');
const db = require('../database/models/index');

// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ------------------- Controller CODE -------------------
const controller = {
    // '/products/' - Root show all products in DB
    index: (req,res) => {
        db.Product.findAll({
            limit:20
        })
            .then( products => {
                return res.render('products/index', {products});
            })
            .catch( error => res.send(error) );
    },
    // '/products/i' - Detail show the detail of the product i
    detail: (req,res) => {
        const ID = req.params.id;
        db.Product.findByPk(ID, {
            include: [
                {association: 'brand'},
                {association: 'categories'}
            ]
        })
            .then( product => {
                return res.render('products/detail', {product});
            })
            .catch( e => res.send(e) );
    },
    // '/products/create' - Show the create new product page
    create: (req,res) => {
        const obtainCategories = db.Category.findAll();
        const obtainBrands = db.Brand.findAll();
        Promise.all([obtainCategories,obtainBrands])
            .then( ([categories,brands]) => {
                return res.render('products/create', {categories, brands});
            })
            .catch( e => res.send(e) );
    },
    // '/products/' - Method for saving the new product
    store: (req,res) => {
        const errors = validationResult(req);
        const form = req.body;
        const file = req.file;
        if ( errors.isEmpty()) {
            const newProduct = {
                name: form.name,
                description: form.description,
                price: form.price,
                image: file.filename,
                brand_id: form.brand_id,
                cart_id: null
            };
            res.send(newProduct);
            // db.Product.create(newProduct, {
            //     include: [{association: "brand"}]
            // })
            //     .then( response => {
            //         return res.redirect('/products');
            //     })
            //     .catch( e => res.send(e) );
        } else {
            const obtainCategories = db.Category.findAll();
            const obtainBrands = db.Brand.findAll();
            Promise.all([obtainCategories,obtainBrands])
                .then( ([categories,brands]) => {
                    return res.render('products/create', {categories:categories, brands:brands, errors:errors.mapped(), old:form});
                })
                .catch( e => res.send(e) );
        }
    },
    // '/products/i/edit' - Show page to edit the product i
    edit: (req,res) => {
        const ID = req.params.id;
        // return res.send(`Pagina para editar el producto: ${ID}`);
        const obtainProduct = db.Product.findByPk(ID);
        const obtainCategories = db.Category.findAll();
        const obtainBrands = db.Brand.findAll();

        Promise.all([obtainProduct,obtainCategories,obtainBrands])
            .then( ([product,categories,brands]) => {
                return res.render('products/edit', {product, categories, brands});
            } )
            .catch( e => res.send(e) );
    },
    // '/products/i' - Method to save changes of product i
    update: (req,res) => {
        const ID = req.params.ID;
        const errors = validationResult(req);
        const form = req.body;
        const file = req.file;
        if ( errors.isEmpty()) {
            const editedProduct = {
                name: form.name,
                description: form.description,
                price: form.price,
                image: file.filename,
                brand_id: form.brand_id,
                cart_id: null
            };
            res.send(editedProduct);
            // db.Product.update(editedProduct, {
            //     where: {id:ID},
            //     include: [{association: "brand"}]
            // })
            //     .then( response => {
            //         return res.redirect('/products');
            //     })
            //     .catch( e => res.send(e) );
        } else {
            const obtainCategories = db.Category.findAll();
            const obtainBrands = db.Brand.findAll();
            const obtainProduct = db.Product.findByPk(ID,{
                include: [
                    {association: 'brand'},
                    {association: 'categories'}
                ]
            });
    
            Promise.all([obtainProduct,obtainCategories,obtainBrands])
                .then( ([product,categories,brands]) => {
                    return res.render('products/edit', {
                        product: product,
                        brands :brands,
                        categories: categories,
                        errors:errors.mapped(),
                        old:form
                    });
                } )
                .catch( e => res.send(e) );
        }
    },
    delete:(req,res) =>{
        const ID = req.params.id;
        db.Product.findByPk(ID)
            .then( product => {
                return res.render('products/delete', {product});
            })
            .catch( e => res.send(e) );
    },
    // '/products/' - Method to delete the product i from DB
    destroy: (req,res) => {
        const ID = req.params.id;
        res.send(`se elimino el producto con id: ${ID}`);
        // db.Product.destroy({
        //     where: {id:ID}
        // })
        //     .then( response => res.redirect('/products') )
        //     .catch( e => res.send(e) );
    },
};

// ------------------- Exports -------------------
module.exports = controller;