// ------------------- Imports -------------------
const db = require('../database/models/index');
// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ------------------- Controller CODE -------------------
const controller = {
    // '/' - Root show Home page
    index: (req,res) => {

        res.render('main/index', {logged_user:req.session.loggedUser});
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
                res.render('products/searchRes', {logged_user:req.session.loggedUser, keywords:keywords, products:products});
            } )
            .catch( e => res.send(e) );
    }
};

// ------------------- Exports -------------------
module.exports = controller;