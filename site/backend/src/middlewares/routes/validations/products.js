const  {check} = require('express-validator');

const validateForm = [
    check("name")
        .notEmpty().withMessage("Agrega un nombre").bail()
        .matches(/^[A-Za-z0-9 '!&]+$/).withMessage('Debes usar caracteres alfanumericos').bail(),
    check("description")
        .notEmpty().withMessage("Agrega una descripcion").bail()
        .matches(/^[A-Za-z0-9 '!&]+$/).withMessage('Debes usar caracteres alfanumericos').bail(),
    check("brand_id")
        .notEmpty().withMessage("ELige una marca").bail()
        .isInt().withMessage('Debe ser un numero entero positivo').bail(),
    check("price")
        .notEmpty().withMessage("Agrega el precio de tu producto").bail()
        .isDecimal().withMessage("Tiene que ser un valor numerico").bail()
];
// function validateForm(req,res,next) {}

module.exports = validateForm;