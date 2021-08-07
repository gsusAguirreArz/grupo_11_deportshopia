// ------------------- Import's -------------------
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// **** Multer Config ****
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        let destPath = path.join(__dirname, '../../public/images/min/users');
        cb(null, destPath);
    },
    filename: (req,file,cb) => {
        let fileName = 'img-'+Date.now()+'-'+file.originalname;
        cb(null, fileName);
    },
});

const upload = multer({storage:storage});

// **** Controller ****
const usersController = require('../controllers/users');

// **** Routes ****
// Show all users
router.get('/', usersController.index);

// User login
router.post('/',usersController.login);

// Create a user
router.get('/register', usersController.create);
router.post('/', upload.single('userAvatar'), usersController.store);

// Show one user
router.get('/:id', usersController.detail);

// Edit a user
router.get('/:id/edit', usersController.edit);
router.put('/:id', upload.single('userAvatar'), usersController.update);

// Delete a user
router.delete('/:id', usersController.destroy);

// ------------------- Exports -------------------
module.exports = router;