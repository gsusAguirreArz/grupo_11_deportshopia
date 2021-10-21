// ------------------- Import's -------------------
const express = require('express');
const usersController = require('../controllers/users');
const userLoginVal = require('../middlewares/routes/validations/usersLogin');
const validateForm = require("../middlewares/routes/validations/usersRegister");
const upload = require('../middlewares/routes/uploads/users');
const userLogged = require('../middlewares/routes/auth/userLogged');
const userNotLogged = require('../middlewares/routes/auth/userNotLogged');
const userIsAdmin = require('../middlewares/routes/auth/userAdmin');

// **** Router ****
const router = express.Router();

// **** Routes ****

// Show all users
router.get('/', [userNotLogged,userIsAdmin], usersController.index);

// User login
router.get('/login', usersController.login);
router.post('/login', userLoginVal ,usersController.checkLogin);

// login test
router.get('/check', (req,res) => {
    if (req.session.loggedUser == undefined){
        return res.send('NO estas loggeado');
    }else{
        return res.send(`el usuario loggeado es: ${req.session.loggedUser.email}`);
    }
});

// Create a user
router.get('/register', userLogged, usersController.create);
router.post('/register', [upload.single('image'),validateForm], usersController.store);

// Show one user
router.get('/:id', usersController.detail);

// Edit a user
router.get('/:id/edit', usersController.edit);
router.put('/:id/edit', [upload.single('image'),validateForm], usersController.update);

// Delete a user
router.get('/:id/delete',[userNotLogged,userIsAdmin], usersController.delete);
router.delete('/:id/delete', usersController.destroy);

// ------------------- Exports -------------------
module.exports = router;