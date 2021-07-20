// ------------------- Import's -------------------
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// **** Multer Config ****
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        let destPath = path.join(__dirname, '../../public/images/products');
        cb(null, destPath);
    },
    filename: (req,file,cb) => {
        let fileName = 'img-'+Date.now()+'-'+file.originalname;
        cb(null, fileName);
    },
});

const upload = multer({storage:storage});

// **** Controller ****
const productsController = require('../controllers/products');

// **** Routes ****
// Show all products
router.get('/', productsController.index);

// Show one product
router.get('/:id', productsController.detail);

// Create a product
router.get('/create', productsController.create);
router.post('/', upload.single('product_image'), productsController.store);

// Edit a product
router.get('/:id/edit', productsController.edit);
router.put('/:id', upload.single('product_image'), productsController.update);

// Delete a product
router.delete('/:id', productsController.destroy);

// ------------------- Exports -------------------
module.exports = router;