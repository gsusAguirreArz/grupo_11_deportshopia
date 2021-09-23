const  {check} = require('express-validator');

const validateForm = [
    check("name")
        .notEmpty().withMessage("Agrega un nombre")
        .matches(/^[A-Za-z0-9 '!&]+$/).withMessage('Debes usar caracteres alfanumericos'),
    check("description")
        .notEmpty().withMessage("Agrega una descripcion")
        .matches(/^[A-Za-z0-9 '!&]+$/).withMessage('Debes usar caracteres alfanumericos'),
    check("categorie_id")
        .notEmpty().withMessage("Elige una categoria")
        .isInt().withMessage('Debe ser un numero entero positivo'),
    check("brand_id")
        .notEmpty().withMessage("ELige una marca")
        .isInt().withMessage('Debe ser un numero entero positivo'),
    check("price")
        .notEmpty().withMessage("Agrega el precio de tu producto")
        .isDecimal().withMessage("Tiene que ser un valor numerico")
];
// function validateForm(req,res,next) {}

module.exports = validateForm;