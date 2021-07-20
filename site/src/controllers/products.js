// ------------------- Imports -------------------
const model = require('../models/model');
const prodsModel = model('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ------------------- Controller CODE -------------------
const controller = {
    index: (req,res) => {
        res.send('Pagina de todos los productos');
    },
    detail: (req,res,next) => {
        res.send('Pagina de detalle de producto i');
    },
    create: (req,res,next) => {
        res.send('Pagina de creacion de un nuevo producto');
    },
    store: (req,res,next) => {
        res.send('Guardar el nuevo producto creado');
    },
    edit: (req,res,next) => {
        res.send('Pagina de edicion de producto existente');
    },
    update: (req,res,next) => {
        res.send('Guardar el producto existente editado');
    },
    destroy: (req,res,next) => {
        res.send('ELiminar el producto i');
    },
};

// ------------------- Exports -------------------
module.exports = controller;