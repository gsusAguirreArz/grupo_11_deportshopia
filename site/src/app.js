// ------------------- Import's -------------------
const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// ------------------- APP -------------------
const app = express();

// ------------------- Middlewares -------------------
app.use( express.static( path.join( __dirname, '../public' ) ) );
app.use( express.urlencoded({extended:false}) );
app.use( express.json() );
app.use( methodOverride('_method') );
app.use( logger('dev') );
app.use( cookieParser() );
app.use( session({
    secret:"LaniakShop",
    resave: false,
    saveUninitialized: true,
}) );

// ------------------- Template Engine -------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views') );

// ------------------- Main CODE -------------------

// **** Server Settings ****
// const PORT = process.env.PORT || 3000;
// const template = (prt) => { return "\\*-------------------------*\\\nServer running in " + prt + " port.\nNow, you can open http://localhost:" + prt + " in your browser\n\\*-------------------------*\\"; };

// app.listen(PORT, () => {
//     console.log(template(PORT));
// });

// **** Routes Handler ****
// Routes Import's
const mainRoutes = require('./routes/main');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

// **** Error Handler ****
// Error Import's
const catchError = require('./middlewares/global/catchError');
const errorHandler = require('./middlewares/global/errorHandler');

app.use(catchError);
app.use(errorHandler);

// ------------------- Exports -------------------
module.exports = app;