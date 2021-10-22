// ------------------- Imports -------------------
const{validationResult} = require('express-validator');
const db = require('../database/models/index');
const bcrypt = require('bcryptjs');

// ------------------- Controller CODE -------------------
const controller = {
    // '/users/' - Root show all users in DB
    index: (req,res) => {
        db.User.findAll({
            limit: 20,
            include: [
                {association: 'role'},
            ]
        })
            .then( users => {
                return res.render('users/index', {logged_user:req.session.loggedUser,users:users});
            })
            .catch( e => res.send(e) );
    },
    // '/users/' - Method to check if user is registered
    login: (req,res) => {
        res.render('users/login', {logged_user:req.session.loggedUser});
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
                            logged_user:req.session.loggedUser,
                            errors: {
                                email: {
                                    msg: "No se tiene registro de este usuario"
                                }
                            }
                        });
                    }else{
                        const correct = bcrypt.compareSync(form.password, user.password);
                        if ( correct ) {

                            if (form.rememberMe != undefined) {
                                res.cookie('rememberMe', user.email, { maxAge:60000 } )
                            }

                            req.session.loggedUser = user;
                            return res.redirect('/');
                        }else{
                            return res.render('users/login', {
                                logged_user:req.session.loggedUser,
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
                logged_user:req.session.loggedUser,
                errors: errors.mapped(),
                old: form
            });
        }
    },
    logout: (req,res) => {
        req.session.loggedUser = undefined;
        return res.redirect('/');
    },
    // '/users/i' - Render the detail page of user i
    detail: (req,res) => {
        const ID = req.params.id;
        db.User.findByPk(ID, {
            include: [
                {association: 'role'},
                // {association: 'cart'}
            ]
        })
            .then( user => res.render('users/detail', {logged_user:req.session.loggedUser,user:user}) )
            .catch( e => res.send(e) );
    },
    // '/users/register' - Render de create new user page
    create: (req,res) => {
        res.render('users/create',{logged_user:req.session.loggedUser});
    },
    // '/users/' - Method for saving the new user info
    store: (req,res) => {
        const errors = validationResult(req);
        const form = req.body;
        const file = req.file;
        if ( errors.isEmpty()) {
            const newUser = {
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                password: bcrypt.hashSync(form.password, 12),
                image: file.filename,
                role_id: 2,
                cart_id: null
            };
            db.User.create(newUser)
                .then( response => {
                    return res.redirect('/');
                })
                .catch( e => res.send(e) );
        } else {
            return res.render('users/create', {logged_user:req.session.loggedUser, errors:errors.mapped(), old:form});
        }
    },
    // '/users/i/edit' - Render the edit existing user i page
    edit: (req,res) => {
        const ID = req.params.id;
        db.User.findByPk(ID, {
            include: [
                {association: 'role'},
                // {association: 'cart'}
            ]
        })
            .then( user => res.render('users/edit', {logged_user:req.session.loggedUser,loggedUser: req.session.loggedUser ,user:user}) )
            .catch( e => res.send(e) );
    },
    // '/users/i' - Method for saving the edited info of user i
    update: (req,res) => {
        const errors = validationResult(req);
        const ID = req.params.ID;
        const form = req.body;
        const file = req.file;
        if ( errors.isEmpty() ) {
            let ROLEID = 2;
            if (req.session.loggedUser != undefined && req.session.loggedUser.role_id == 1){
                ROLEID = Number(form.role_id);
            }
            const editedUser = {
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                password: bcrypt.hashSync(form.password, 12),
                image: file.filename,
                role_id: ROLEID,
                cart_id: null
            };
            // res.send(editedUser);
            db.User.update(editedUser, {
                where: {id:ID},
            })
                .then( response => {
                    return res.redirect('/');
                })
                .catch( e => res.send(e) );
        } else {
            db.User.findByPk(ID, {
                include: [
                    {association: 'role'}
                ]
            })
                .then( user => res.render('users/edit', {
                    logged_user:req.session.loggedUser,
                    loggedUser: req.session.loggedUser,
                    user:user,
                    errors: errors.mapped(),
                    old: form
                }) )
                .catch( e => res.send(e) );
        }
    },
    delete: (req,res) => {
        const ID = req.params.id;
        db.User.findByPk(ID)
            .then( user => {
                return res.render('users/delete', {logged_user:req.session.loggedUser,user:user});
            })
            .catch( e => res.send(e) );
    },
    // '/users/' - Method for deleting user i from DB
    destroy: (req,res) => {
        const ID = req.params.id;
        // res.send(`se elimino el producto con id: ${ID}`);
        db.User.destroy({
            where: {id:ID}
        })
            .then( response => res.redirect('/') )
            .catch( e => res.send(e) );
    },
};

// ------------------- Exports -------------------
module.exports = controller;
