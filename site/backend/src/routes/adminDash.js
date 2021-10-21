// ------------------- Import's -------------------
const express = require('express');
const adminDashController = require('../controllers/adminDash');

// **** Router ****
const router = express.Router();

// **** Routes ****

// Show all users
router.get('/', adminDashController.index);


// ------------------- Exports -------------------
module.exports = router;