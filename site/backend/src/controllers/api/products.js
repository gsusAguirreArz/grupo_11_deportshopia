// ------------------- Imports -------------------
const{validationResult} = require('express-validator');
const db = require('../../database/models/index');

// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const Products = db.Product;

// ------------------- Controller CODE -------------------
const controller = {
    // '/products/' - Root show all products in DB
    index: (req,res) => {
        Products.findAll()
            .then( products => {
                const response = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: req.originalUrl,
                        fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                    },
                    data: products
                };
                return res.status(200).json(response);
            })
            .catch( e => res.send(e) );
    },
    // '/products/i' - Detail show the detail of the product i
    detail: (req,res) => {
        const ID = req.params.id;
        Products.findByPk(ID)
            .then( product => {
                if (!product) {
                    return res.json({msg: "No se encontro la pelicula"})
                }
                const response = {
                    meta: {
                        status: 200,
                        url: req.originalUrl,
                        fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                    },
                    data: product
                };
                return res.status(200).json(response);
            })
            .catch( e => res.send(e) );
    },
    search: (req,res) => {
        const keywords = req.query.keywords;
        Products.findAll({
            where: {
                name: {[db.Sequelize.Op.like]:`%${keywords}%`}
            }
        })
            .then( products => products.length > 0 ? res.status(200).json({
                meta : {
                    status: 200,
                    total: products.length,
                    url: req.originalUrl,
                    fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: products
            }) : res.json({ msg : `no hubo resultados con la busqueda ${keywords}`}))
            .catch( e => res.send(e) );
    },
    // '/products/' - Method for saving the new product
    store: (req,res) => {
        const errors = validationResult(req);
        const form = req.body;
        const file = req.file;
        Products.create(form)
            .then( response => res.json({
                meta: {
                    status: 200,
                    created: "ok"
                },
                data: response
            }))
            .catch( e => res.send(e) );
    },
    // '/products/i' - Method to save changes of product i
    update: (req,res) => {
        const ID = req.params.ID;
        const errors = validationResult(req);
        const form = req.body;
        const file = req.file;
        Products.update( form, {
            where: {
                id: ID
            }
        })
            .then( response => res.json({
                meta: {
                    status: 200,
                    url: req.originalUrl,
                    msg: `product with ${ID} succesfully edited`
                },
                data: response
            }))
            .catch( e => res.send(e) );
    },
    // '/products/' - Method to delete the product i from DB
    destroy: (req,res) => {
        const ID = req.params.id;
        Products.destroy({
            where: {
                id: ID
            }
        })
            .then( response => response == 1 ? res.json({
                    response: response,
                    msg: `producto con id ${ID} eliminado exitosamente`
                }) : res.json({
                    msg: `error al intentar borrar el producto con id ${ID}`
                }) )
            .catch( e => res.send(e) );
    },
};

// ------------------- Exports -------------------
module.exports = controller;