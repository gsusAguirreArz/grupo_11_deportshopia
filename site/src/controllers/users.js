// ------------------- Imports -------------------
const db = require('../database/models/index');

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
        const form = req.body;
        res.redirect('/users/')
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
    // '/users/' - Method for deleting user i from DB
    destroy: (req,res) => {
        const ID = req.params.id;
        res.redirect('/');

    },
};

// ------------------- Exports -------------------
module.exports = controller;
