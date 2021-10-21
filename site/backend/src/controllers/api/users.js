// ------------------- Imports -------------------
const{validationResult} = require('express-validator');
const db = require('../../database/models/index');
const bcrypt = require('bcryptjs');

const Users = db.User;

// ------------------- Controller CODE -------------------
const controller = {
    // '/users/' - Root show all users in DB
    index: (req,res) => {
        Users.findAll({
            include: [
                {association: 'role'},
                {association: 'cart'}
            ]
        })
            .then( users => {
                const response = {
                    meta: {
                        status: 200,
                        total: users.length,
                        url: req.originalUrl,
                        fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                    },
                    data: users
                };
                return res.status(200).json(response);
            })
            .catch( e => res.send(e) );
    },
    // '/users/i' - Detail show the detail of the user i
    detail: (req,res) => {
        const ID = req.params.id;
        Users.findByPk(ID)
            .then( user => {
                if (!user) {
                    return res.json({msg: "No se encontro la pelicula"})
                }
                const response = {
                    meta: {
                        status: 200,
                        url: req.originalUrl,
                        fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                    },
                    data: user
                };
                return res.status(200).json(response);
            })
            .catch( e => res.send(e) );
    },
    search: (req,res) => {
        const keywords = req.query.keywords;
        Users.findAll({
            where: {
                first_name: {[db.Sequelize.Op.like]:`%${keywords}%`}
            }
        })
            .then( users => users.length > 0 ? res.status(200).json({
                meta : {
                    status: 200,
                    total: users.length,
                    url: req.originalUrl,
                    fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: users
            }) : res.json({ msg : `no hubo resultados con la busqueda ${keywords}`}))
            .catch( e => res.send(e) );
    },
    // '/users/' - Method for saving the new user
    store: (req,res) => {
        const errors = validationResult(req);
        const form = req.body;
        const file = req.file;
        users.create(form)
            .then( response => res.json({
                meta: {
                    status: 200,
                    created: "ok"
                },
                data: response
            }))
            .catch( e => res.send(e) );
    },
    // '/users/i' - Method to save changes of user i
    update: (req,res) => {
        const ID = req.params.ID;
        const errors = validationResult(req);
        const form = req.body;
        const file = req.file;
        Users.update( form, {
            where: {
                id: ID
            }
        })
            .then( response => res.json({
                meta: {
                    status: 200,
                    url: req.originalUrl,
                    msg: `user with ${ID} succesfully edited`
                },
                data: response
            }))
            .catch( e => res.send(e) );
    },
    // '/users/' - Method to delete the user i from DB
    destroy: (req,res) => {
        const ID = req.params.id;
        Users.destroy({
            where: {
                id: ID
            }
        })
            .then( response => response == 1 ? res.json({
                    response: response,
                    msg: `usuario con id ${ID} eliminado exitosamente`
                }) : res.json({
                    msg: `error al intentar borrar el usuario con id ${ID}`
                }) )
            .catch( e => res.send(e) );
    },
};

// ------------------- Exports -------------------
module.exports = controller;
