const  {check} = require('express-validator');

const validateForm = [
    check("email")
        .notEmpty().withMessage("Ingresa tu correo")
        .isEmail().withMessage('Ingresa un correo valido!'),
    check("password")
        .notEmpty().withMessage('Ingresa tu contrasena!')
        .isLength({min:8}).withMessage('La contrasena debe tener minimo 8 chars')
];
// function validateForm(req,res,next) {}

module.exports = validateForm;