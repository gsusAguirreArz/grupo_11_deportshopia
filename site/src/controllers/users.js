// ------------------- Imports -------------------
const model = require('../models/model');
const usersModel = model('users');

// ------------------- Controller CODE -------------------
const controller = {
    index: (req,res,next) => {
        res.send('Pagina de todos los usuarios');
    },
    detail: (req,res,next) => {
        res.send('Pagina de detalle de usuario i');
    },
    create: (req,res,next) => {
        res.send('Pagina de creacion de un nuevo usuario');
    },
    store: (req,res,next) => {
        res.send('Guardar el nuevo usuario creado');
    },
    edit: (req,res,next) => {
        res.send('Pagina de edicion de usuario existente');
    },
    update: (req,res,next) => {
        res.send('Guardar el usuario existente editado');
    },
    destroy: (req,res,next) => {
        res.send('ELiminar el usuario i');
    },
};

// ------------------- Exports -------------------
module.exports = controller;