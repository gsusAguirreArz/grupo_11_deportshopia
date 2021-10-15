// ------------------- Import's -------------------
const express = require('express');
const mainController = require('../controllers/main');

// **** Router ****
const router = express.Router();

// **** Routes ****
// Show homepage
router.get('/', mainController.index);

// Search Bar
router.get('/search', mainController.search);

// Prueba session
router.get('/pruebaSession', (req,res) => {
    if (!req.session.numeroVisitas == undefined){
        req.session.numeroVisitas = 0;
    }else{
        req.session.numeroVisitas++;
    }
    res.send(`Session tiene el numero: ${req.session.numeroVisitas}`);
});

// Login page
// router.get('/login',mainController.login);

// Shopping cart page
// router.get('/cart',mainController.cart);

// ------------------- Exports -------------------
module.exports = router;