const  {check} = require('express-validator');

const validateForm = [
    check("email")
        .notEmpty().withMessage("Ingresa tu correo")
        .isEmail().withMessage('Ingresa un correo valido!'),
    check("password")
        .notEmpty().withMessage('Ingresa tu contrasena!')
];
// function validateForm(req,res,next) {}

module.exports = validateForm;