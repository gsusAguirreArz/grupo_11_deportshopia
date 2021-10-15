// ************ error handler ************
function errorHandler(err, req,res,next) {
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('errors/error');
    // res.send(err);
}

module.exports = errorHandler;