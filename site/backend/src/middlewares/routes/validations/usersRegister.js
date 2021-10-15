const  {check} = require('express-validator');

const validateForm = [
    check("first_name")
        .notEmpty().withMessage("Agrega un nombre valido").bail()
        .matches(/^[A-Za-z0-9 '!&]+$/).withMessage('Debes usar caracteres alfanumericos').bail(),
    check("last_name")
        .notEmpty().withMessage("Agrega apellido valido").bail()
        .matches(/^[A-Za-z0-9 '!&]+$/).withMessage('Debes usar caracteres alfanumericos').bail(),
    check("email")
        .notEmpty().withMessage("ELige una marca").bail()
        .isEmail().withMessage('Ingresa un correo valido!').bail(),
    check("password")
        .notEmpty().withMessage("Agrega el precio de tu producto").bail()
        .isLength({min:8}).withMessage('La contrasena debe tener minimo 8 chars').bail()
];

module.exports = validateForm;