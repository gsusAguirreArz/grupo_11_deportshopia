// ------------------- Import's -------------------
const express = require('express');
const usersController = require('../../controllers/api/users');
const userLoginVal = require('../../middlewares/routes/validations/usersLogin');
// const validateForm = require("../middlewares/routes/validations/usersRegister");
// const upload = require('../middlewares/routes/uploads/users');
const userLogged = require('../../middlewares/routes/auth/userLogged');

// **** Router ****
const router = express.Router();

// **** Routes ****

// Show all users
router.get('/', usersController.index);
router.get('/search', usersController.search);

// User login
// router.get('/login', usersController.login);
// router.post('/login', userLoginVal ,usersController.checkLogin);

// Create a user
// router.get('/register', userLogged, usersController.create);
router.post('/', usersController.store);

// Show one user
router.get('/:id', usersController.detail);

// Edit a user
// router.get('/:id/edit', usersController.edit);
router.put('/:id/edit', usersController.update);

// Delete a user
// router.get('/:id/delete', usersController.delete);
router.delete('/:id/delete', usersController.destroy);

// ------------------- Exports -------------------
module.exports = router;