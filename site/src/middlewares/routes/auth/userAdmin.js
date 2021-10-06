module.exports = Admin;

// se usan para evitar o permitir accesos a ciertas partes de la pagina
function Admin(req, res, next) {
    if ( Number(req.session.loggedUser.role_id) == 1 ) {
        return next();
    } else {
        return res.send('Esta pagina es solo para administradores');
    }
}