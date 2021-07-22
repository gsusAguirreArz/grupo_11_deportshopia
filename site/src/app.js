// ------------------- Import's -------------------
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// ------------------- APP -------------------
const app = express();

// ------------------- Middlewares -------------------
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret:"Nombre del sitio",
    resave: false,
    saveUninitialized: true,
}));
app.use(cookieParser);

// ------------------- Template Engine -------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// ------------------- Main CODE -------------------

// **** Server Settings ****
const PORT = process.env.PORT || 3000;
var template = (prt) => { return "\\*-------------------------*\\\nServer running in " + prt + " port.\nNow, you can open http://localhost:" + prt + " in your browser\n\\*-------------------------*\\"};

app.listen(PORT, () => {
    console.log(template(PORT));
});

// **** Routes Handler ****
const mainRoutes = require('./routes/main');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

// **** Error Handler ****
app.use((req,res,next) => {
    // res.status(404).render('not-found');
    res.status(404).send('No encontrado');
});


// Using const createError = require('http-errors');
// ************ catch 404 and forward to error handler ************
// app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.path = req.path;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// ------------------- Exports -------------------
// module.exports = app;