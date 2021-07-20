// ------------------- Import's -------------------
const express = require('express');
const router = express.Router();

// **** Controller ****
const mainController = require('../controllers/main');

// **** Routes ****
// Show homepage
router.get('/',mainController.index);

// Search Bar
router.get('/search', mainController.search);

router.get('/login',mainController.login);
router.get('/cart',mainController.cart);

// ------------------- Exports -------------------
module.exports = router;