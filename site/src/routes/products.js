// ------------------- Import's -------------------
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// **** Multer Config ****
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        let destPath = path.join(__dirname, '../../public/images/min/products');
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
router.get('/men', productsController.men);
router.get('/women', productsController.women);
router.get('/kids', productsController.kids);
router.get('/offers', productsController.offers);

// Create a product
router.get('/create', productsController.create);
router.post('/',upload.single('prodImg'), productsController.store);

// Show one product
router.get('/:id', productsController.detail);

// Edit a product
router.get('/:id/edit', productsController.edit);
router.put('/:id', upload.single('prodImg'), productsController.update);

// Delete a product
router.delete('/:id', productsController.destroy);

// ------------------- Exports -------------------
module.exports = router;