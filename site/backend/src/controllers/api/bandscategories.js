// ------------------- Imports -------------------
const db = require('../../database/models/index');

// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const Brands = db.Brand;
const Categories = db.Category;

// ------------------- Controller CODE -------------------
const controller = {
    // '/products/' - Root show all products in DB
    brandsIndex: (req,res) => {
        Brands.findAll()
            .then( brands => {
                const response = {
                    meta: {
                        status: 200,
                        total: brands.length,
                        url: req.originalUrl,
                        fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                    },
                    data: brands
                };
                return res.status(200).json(response);
            })
            .catch( e => res.send(e) );
    },
    categoriesIndex: (req,res) => {
        Categories.findAll()
            .then( categories => {
                const response = {
                    meta: {
                        status: 200,
                        total: categories.length,
                        url: req.originalUrl,
                        fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                    },
                    data: categories
                };
                return res.status(200).json(response);
            })
            .catch( e => res.send(e) );
    },
};

// ------------------- Exports -------------------
module.exports = controller;