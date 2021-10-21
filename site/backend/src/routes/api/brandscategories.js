// ------------------- Import's -------------------
const express = require('express');
const brandsCategoriesController = require('../../controllers/api/bandscategories');

// **** Router ****
const router = express.Router();

// **** Routes ****

// Show all brands
router.get('/brands', brandsCategoriesController.brandsIndex);

// Show all categories
router.get('/categories', brandsCategoriesController.categoriesIndex);

// ------------------- Exports -------------------
module.exports = router;