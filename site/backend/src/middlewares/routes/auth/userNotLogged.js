module.exports = notLogged;

// se usan para evitar o permitir accesos a ciertas partes de la pagina
function notLogged(req, res, next) {
    const sessParam = req.session.loggedUser;
    if ( sessParam != undefined) {
        return next();
    } else {
        const msg = "Esta pagina es solo para usuarios registrados";
        return res.render('errors/error', {message:msg});
        // return res.send('Esta pagina es solo para usuarios registrados');
    }
}