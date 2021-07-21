// ------------------- Imports -------------------
const model = require('../models/model');
const usersModel = model('users');

// ------------------- Controller CODE -------------------
const controller = {
    index: (req,res) => {
        let users = usersModel.data();

        res.render('users/index', {users:users});
    },
    login: (req,res) => {
        let form = req.body;

        // CODE to check if user is registered

        if ( userisregistered ){
            res.redirect('/users/'+ userId);
        }
        res.redirect('/login');
    },
    detail: (req,res) => {
        let ID = req.params.id;
        let user = usersModel.find(ID);

        res.render('users/detail', {user:user});
    },
    create: (req,res) => {
        res.render('users/register');
    },
    store: (req,res) => {
        let form = req.body;

        // Code of new user

        usersModel.create(newUser);

        res.redirect('/users/' + newUser.id);
    },
    edit: (req,res) => {
        let ID = req.params.id;
        let user = usersModel.find(ID);

        res.render('users/edit', {user:user});
    },
    update: (req,res) => {
        let ID = req.params.ID;
        let form = req.body;

        // Code for user update
        usersModel.update(updatedUser);

        res.redirect('/users/'+ID);
    },
    destroy: (req,res) => {
        let ID = req.params.id;
        usersModel.delete(ID);

        res.redirect('/');
    },
};

// ------------------- Exports -------------------
module.exports = controller;