// ------------------- Imports -------------------
const{validationResult} = require('express-validator');
const db = require('../database/models/index');
const bcrypt = require('bcryptjs');

// ------------------- Controller CODE -------------------
const controller = {
    // '/users/' - Root show all users in DB
    index: (req,res) => {
        res.render('users/index');
    },
    // '/users/' - Method to check if user is registered
    login: (req,res) => {
        res.render('users/login');
    },
    // validate user credentials
    checkLogin: (req,res) => {
        const errors = validationResult(req);
        const form = req.body;
        if ( errors.isEmpty() ){
            db.User.findOne({
                where: {
                    email: `${form.email}`
                }
            })
                .then( user => {
                    if (user == undefined){
                        return res.render('users/login', {
                            errors: {
                                email: {
                                    msg: "No se tiene registro de este usuario"
                                }
                            }
                        });
                    }else{
                        const correct = bcrypt.compareSync(form.password, user.password);
                        if ( correct ) {
                            req.session.loggedUser = user;
                            return res.send('Success!');
                        }else{
                            return res.render('users/login', {
                                errors: {
                                    password:{
                                        msg: 'Credenciales invalidas'
                                    }
                                }
                            });
                        }
                    }
                } )
                .catch( e => res.send(e) );
        }else{
            return res.render('users/login', {
                errors: errors.mapped(),
                old: form
            });
        }
    },
    // '/users/i' - Render the detail page of user i
    detail: (req,res) => {
        const ID = req.params.id;
        res.render('users/detail');
    },
    // '/users/register' - Render de create new user page
    create: (req,res) => {
        res.render('users/create');
    },
    // '/users/' - Method for saving the new user info
    store: (req,res) => {
        const form = req.body;
        const img = req.file;
        res.redirect('/users/');
    },
    // '/users/i/edit' - Render the edit existing user i page
    edit: (req,res) => {
        const ID = req.params.id;
        res.render('users/edit');
    },
    // '/users/i' - Method for saving the edited info of user i
    update: (req,res) => {
        const ID = req.params.ID;
        const form = req.body;
        const img = req.file;
        res.redirect('/users/');
    },
    delete: (req,res) => {
        const ID = req.params.id;
        return res.render('users/delete');
    },
    // '/users/' - Method for deleting user i from DB
    destroy: (req,res) => {
        const ID = req.params.id;
        res.redirect('/');

    },
};

// ------------------- Exports -------------------
module.exports = controller;
