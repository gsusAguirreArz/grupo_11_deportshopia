// ------------------- Import's -------------------
const express = require('express');
const productsController = require('../controllers/products');
const validateForm = require("../middlewares/routes/validations/products");
const upload = require('../middlewares/routes/uploads/products');

const userLogged = require('../middlewares/routes/auth/userLogged');
const userNotLogged = require('../middlewares/routes/auth/userNotLogged');
const userIsAdmin = require('../middlewares/routes/auth/userAdmin');


// **** Router ****
const router = express.Router();

// **** Routes ****

// Show all products
router.get('/', productsController.index);

// Create a product
router.get('/create', userNotLogged, productsController.create);
router.post('/create', [upload.single('image'), validateForm], productsController.store);

// Show one product
router.get('/:id/', productsController.detail);

// Edit a product
router.get('/:id/edit', productsController.edit);
router.put('/:id/edit', [upload.single('image'), validateForm], productsController.update);

// Delete a product
router.get('/:id/delete',userNotLogged, productsController.delete);
router.delete('/:id/delete', productsController.destroy);


// ------------------- Exports -------------------
module.exports = router;