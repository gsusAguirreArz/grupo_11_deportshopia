// ------------------- Imports -------------------

// ------------------- Controller CODE -------------------
const controller = {
    // '/' - redirect to react admin dashboard
    index: (req,res) => {
        const URL = "http://localhost:3000/";
        res.redirect(URL);
        // res.render('main/index');
    }
};

// ------------------- Exports -------------------
module.exports = controller;