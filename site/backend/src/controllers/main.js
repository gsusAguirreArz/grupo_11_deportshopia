// ------------------- Imports -------------------
const db = require('../database/models/index');
// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ------------------- Controller CODE -------------------
const controller = {
    // '/' - Root show Home page
    index: (req,res) => {
        // let products = prodsModel.data();
        
        res.render('main/index');
    },
    search: (req,res) => {
        const keywords = req.query.keywords;
        db.Product.findAll({
            where: {
                name: {
                    [db.Sequelize.Op.like]:`%${keywords}%`
                }
            }
        })
            .then( products => {
                // res.send(products);
                res.render('products/searchRes', {keywords, products});
            } )
            .catch( e => res.send(e) );
    }
};

// ------------------- Exports -------------------
module.exports = controller;