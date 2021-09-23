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

// Login page
// router.get('/login',mainController.login);

// Shopping cart page
// router.get('/cart',mainController.cart);

// ------------------- Exports -------------------
module.exports = router;