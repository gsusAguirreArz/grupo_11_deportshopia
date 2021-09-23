// ------------------- Import's -------------------
const path = require('path');
const express = require('express');
const usersController = require('../controllers/users');
// const multer = require('multer');

// **** Multer Config ****
// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         let destPath = path.join(__dirname, '../../public/images/min/users');
//         cb(null, destPath);
//     },
//     filename: (req,file,cb) => {
//         let fileName = 'img-'+Date.now()+'-'+file.originalname;
//         cb(null, fileName);
//     },
// });

// const upload = multer({storage:storage});

// **** Router ****
const router = express.Router();

// **** Routes ****

// Show all users
router.get('/', usersController.index);

// User login
router.get('/login', usersController.login);
router.post('/login', usersController.checkLogin);

// Create a user
router.get('/register', usersController.create);
router.post('/', usersController.store);

// Show one user
router.get('/:id', usersController.detail);

// Edit a user
router.get('/:id/edit', usersController.edit);
router.put('/:id', usersController.update);

// Delete a user
router.delete('/:id', usersController.destroy);

// ------------------- Exports -------------------
module.exports = router;