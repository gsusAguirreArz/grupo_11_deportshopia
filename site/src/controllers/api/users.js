// ------------------- Imports -------------------
const{validationResult} = require('express-validator');
const db = require('../../database/models/index');
const bcrypt = require('bcryptjs');

// ------------------- Controller CODE -------------------
const controller = {
    // '/users/' - Root show all users in DB
    index: (req,res) => {
        res.render('users/index');
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

                            if (form.rememberMe != undefined) {
                                res.cookie('rememberMe', user.email, { maxAge:60000 } )
                            }

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
        db.User.findByPk(ID, {
            include: [
                {association: 'role'},
                {association: 'cart'}
            ]
        })
            .then( user => res.render('users/detail', {user:user}) )
            .catch( e => res.send(e) );
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
                role_id: form.role_id,
                cart_id: null
            };
            res.send(newUser);
            // db.User.create(newUser, {
            //     include: [{association: "role"}]
            // })
            //     .then( response => {
            //         return res.redirect('/');
            //     })
            //     .catch( e => res.send(e) );
        } else {
            return res.render('users/create', {errors:errors.mapped(), old:form});
        }
    },
    // '/users/i' - Method for saving the edited info of user i
    update: (req,res) => {
        const errors = validationResult(req);
        const ID = req.params.ID;
        const form = req.body;
        const file = req.file;
        if ( errors.isEmpty() ) {
            const editedUser = {
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                password: bcrypt.hashSync(form.password, 12),
                image: file.filename,
                role_id: form.role_id,
                cart_id: null
            };
            res.send(editedUser);
            // db.User.update(editedUser, {
            //     where: {id:ID},
            //     include: [{association: "role"}]
            // })
            //     .then( response => {
            //         return res.redirect('/');
            //     })
            //     .catch( e => res.send(e) );
        } else {
            db.User.findByPk(ID, {
                include: [
                    {association: 'role'}
                ]
            })
                .then( user => res.render('users/edit'), {
                    user:user,
                    errors: errors.mapped(),
                    old: form
                })
                .catch( e => res.send(e) );
        }
    },
    // '/users/' - Method for deleting user i from DB
    destroy: (req,res) => {
        const ID = req.params.id;
        res.send(`se elimino el producto con id: ${ID}`);
        // db.Usser.destroy({
        //     where: {id:ID}
        // })
        //     .then( response => res.redirect('/') )
        //     .catch( e => res.send(e) );
    },
};

// ------------------- Exports -------------------
module.exports = controller;
