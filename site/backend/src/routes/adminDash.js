// ------------------- Import's -------------------
const express = require('express');
const adminDashController = require('../controllers/adminDash');
const userNotLogged = require('../middlewares/routes/auth/userNotLogged');
const userAdmin = require('../middlewares/routes/auth/userAdmin');

// **** Router ****
const router = express.Router();

// **** Routes ****

// Show all users
router.get('/', [userNotLogged,userAdmin], adminDashController.index);


// ------------------- Exports -------------------
module.exports = router;