// ------------------- Imports -------------------
const{validationResult} = require('express-validator');
const db = require('../database/models/index');

// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ------------------- Controller CODE -------------------
const controller = {
    // '/products/' - Root show all products in DB
    index: (req,res) => {
        let [numPage, totalProds, totalPages] = [1,0,1];

        if ( req.query.page ){
            numPage = Number(req.query.page);
        }

        let auxPromise = db.Product.findAll();
        let mainPromise = db.Product.findAll({
            limit:20,
            offset: (numPage-1)*20
        });
        Promise.all([auxPromise, mainPromise])
            .then( ([pds, products]) => {
                totalProds = pds.length;
                totalPages = Math.ceil( totalProds / 20 );
                return res.render('products/index', {logged_user:req.session.loggedUser,products:products, paginat: {totalPages:totalPages, string:"products", numPage:numPage} });
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
                return res.render('products/detail', {logged_user:req.session.loggedUser,product:product});
            })
            .catch( e => res.send(e) );
    },
    // '/products/create' - Show the create new product page
    create: (req,res) => {
        const obtainCategories = db.Category.findAll();
        const obtainBrands = db.Brand.findAll();
        Promise.all([obtainCategories,obtainBrands])
            .then( ([categories,brands]) => {
                return res.render('products/create', {logged_user:req.session.loggedUser,categories:categories, brands:brands});
            })
            .catch( e => res.send(e) );
    },
    // '/products/' - Method for saving the new product
    store: (req,res) => {
        const errors = validationResult(req);
        const form = req.body;
        const file = req.file;
        // return res.send( form );
        if ( errors.isEmpty()) {
            const newProduct = {
                name: form.name,
                description: form.description,
                price: form.price,
                image: file.filename,
                brand_id: form.brand_id,
                cart_id: null
            };
            // res.send(newProduct);
            db.Product.create(newProduct, {
                include: [{association: "brand"}]
            })
                .then( response => {
                    return res.redirect('/products');
                })
                .catch( e => res.send(e) );
        } else {
            const obtainCategories = db.Category.findAll();
            const obtainBrands = db.Brand.findAll();
            Promise.all([obtainCategories,obtainBrands])
                .then( ([categories,brands]) => {
                    return res.render('products/create', {logged_user:req.session.loggedUser,categories:categories, brands:brands, errors:errors.mapped(), old:form});
                })
                .catch( e => res.send(e) );
        }
    },
    // '/products/i/edit' - Show page to edit the product i
    edit: (req,res) => {
        const ID = req.params.id;
        const obtainProduct = db.Product.findByPk(ID,{
            include: [
                {association: 'categories'}
            ]
        });
        const obtainCategories = db.Category.findAll();
        const obtainBrands = db.Brand.findAll();

        Promise.all([obtainProduct,obtainCategories,obtainBrands])
            .then( ([product,categories,brands]) => {
                return res.render('products/edit', {
                    logged_user:req.session.loggedUser,
                    product:product,
                    categories:categories,
                    brands:brands
                });
            } )
            .catch( e => res.send(e) );
    },
    // '/products/i' - Method to save changes of product i
    update: (req,res) => {
        const ID = req.params.ID;
        const errors = validationResult(req);
        const form = req.body;
        const file = req.file;
        if ( errors.isEmpty() ) {
            const editedProduct = {
                name: form.name,
                description: form.description,
                price: form.price,
                image: file.filename,
                brand_id: form.brand_id,
                cart_id: null
            };
            // res.send(editedProduct);
            db.Product.update(editedProduct, {
                where: {id:ID},
                include: [{association: "brand"}]
            })
                .then( response => {
                    return res.redirect('/products');
                })
                .catch( e => res.send(e) );
        } else {
            const obtainCategories = db.Category.findAll();
            const obtainBrands = db.Brand.findAll();
            const obtainProduct = db.Product.findByPk(ID,{
                include: [
                    {association: 'categories'}
                ]
            });
    
            Promise.all([obtainProduct,obtainCategories,obtainBrands])
                .then( ([product,categories,brands]) => {
                    return res.render('products/edit', {
                        logged_user:req.session.loggedUser,
                        product: product,
                        brands: brands,
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
                return res.render('products/delete', {logged_user:req.session.loggedUser,product:product});
            })
            .catch( e => res.send(e) );
    },
    // '/products/' - Method to delete the product i from DB
    destroy: (req,res) => {
        const ID = req.params.id;
        // res.send(`se elimino el producto con id: ${ID}`);
        db.Product.destroy({
            where: {id:ID}
        })
            .then( response => res.redirect('/products') )
            .catch( e => res.send(e) );
    },
};

// ------------------- Exports -------------------
module.exports = controller;