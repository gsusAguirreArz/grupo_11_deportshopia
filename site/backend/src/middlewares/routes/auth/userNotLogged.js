module.exports = notLogged;

// se usan para evitar o permitir accesos a ciertas partes de la pagina
function notLogged(req, res, next) {
    const sessParam = req.session.loggedUser;
    if ( sessParam != undefined) {
        return next();
    } else {
        return res.send('Esta pagina es solo para usuarios registrados');
    }
}