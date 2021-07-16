// ------------------- Import's -------------------
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

// ------------------- APP -------------------
const app = express();

// ------------------- Middlewares -------------------
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));

// ------------------- Template Engine -------------------
app.set('view engine', 'ejs');
// app.set('views', __PATHVIEWS__);

// ------------------- Main CODE -------------------

// **** Server Settings ****
const PORT = process.env.PORT || 8080;
var template = (prt) => { return "\\*-------------------------*\\ \n Server running in " + prt + " port \n Now, you can open http://localhost:" + prt + " in your favorite browser \n \\*-------------------------*\\ \n"};

app.listen(PORT, () => {
    console.log(template(PORT));
});

// **** Routes Handler ****
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');


app.use('/', mainRoutes);
// app.use('/products', productsRoutes);
// app.use('/users', usersRoutes);

// **** Error Handler ****