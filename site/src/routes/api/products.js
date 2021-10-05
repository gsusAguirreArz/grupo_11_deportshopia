// ------------------- Import's -------------------
const express = require('express');
const productsController = require('../../controllers/api/products');
const validateForm = require("../../middlewares/routes/validations/products");
const upload = require('../../middlewares/routes/uploads/products');

// **** Router ****
const router = express.Router();

// **** Routes ****

// Show all products
router.get('/', productsController.index);

// Create a product
// router.get('/create', productsController.create);
router.post('/create', [upload.single('image'), validateForm], productsController.store);

// Show one product
router.get('/:id', productsController.detail);

// Edit a product
// router.get('/:id/edit', productsController.edit);
router.put('/:id/edit', [upload.single('image'), validateForm], productsController.update);

// Delete a product
// router.get('/:id/delete', productsController.delete);
router.delete('/:id/delete', productsController.destroy);


// ------------------- Exports -------------------
module.exports = router;