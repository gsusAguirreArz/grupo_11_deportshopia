// ------------------- Import's -------------------
const express = require('express');
const usersController = require('../controllers/users');
const userLoginVal = require('../middlewares/routes/validations/usersLogin');
// const validateForm = require("../middlewares/routes/validations/usersRegister");
// const upload = require('../middlewares/routes/uploads/users');

// **** Router ****
const router = express.Router();

// **** Routes ****

// Show all users
router.get('/', usersController.index);

// User login
router.get('/login', usersController.login);
router.post('/login', userLoginVal ,usersController.checkLogin);

// Create a user
router.get('/register', usersController.create);
router.post('/', usersController.store);

// Show one user
router.get('/:id', usersController.detail);

// Edit a user
router.get('/:id/edit', usersController.edit);
router.put('/:id/edit', usersController.update);

// Delete a user
router.get('/:id/delete', usersController.delete);
router.delete('/:id/delete', usersController.destroy);

// ------------------- Exports -------------------
module.exports = router;