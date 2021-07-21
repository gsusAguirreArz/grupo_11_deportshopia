// ------------------- Imports -------------------
const model = require('../models/model');
const usersModel = model('users');

// ------------------- Controller CODE -------------------
const controller = {
    // '/users/' - Root show all users in DB
    index: (req,res) => {
        let users = usersModel.data();

        res.render('users/index', {users:users});
    },
    // '/users/' - Method to check if user is registered
    login: (req,res) => {
        let form = req.body;

        // CODE to check if user is registered

        if ( userisregistered ){
            res.redirect('/users/'+ userId);
        }
        res.redirect('/login');
    },
    // '/users/i' - Render the detail page of user i
    detail: (req,res) => {
        let ID = req.params.id;
        let user = usersModel.find(ID);

        res.render('users/detail', {user:user});
    },
    // '/users/register' - Render de create new user page
    create: (req,res) => {
        res.render('users/register');
    },
    // '/users/' - Method for saving the new user info
    store: (req,res) => {
        let form = req.body;
        let img = req.file;
        
        // Code of newUser

        if (img) {
            newUser.image = img.filename;
        }else{
            newUser.image = 'img-user-placeholder.jpg';
        }
        
        let nUId = usersModel.create(newUser);

        res.redirect('/users/' + nUId);
    },
    // '/users/i/edit' - Render the edit existing user i page
    edit: (req,res) => {
        let ID = req.params.id;
        let user = usersModel.find(ID);

        res.render('users/edit', {user:user});
    },
    // '/users/i' - Method for saving the edited info of user i
    update: (req,res) => {
        let ID = req.params.ID;
        let form = req.body;
        let img = req.file;

        // Code for editedUser
        editedUser.id = ID;

        if (img){
            editedUser.image = img.filename;
        }else{
            editedUser.image = usersModel.find(ID).image;
        }

        let uId = usersModel.update(editedUser);

        res.redirect('/users/' + ID);
    },
    // '/users/' - Method for deleting user i from DB
    destroy: (req,res) => {
        let ID = req.params.id;
        usersModel.delete(ID);

        res.redirect('/');
    },
};

// ------------------- Exports -------------------
module.exports = controller;