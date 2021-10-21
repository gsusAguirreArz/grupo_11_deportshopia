module.exports = Logged;

// se usan para evitar o permitir accesos a ciertas partes de la pagina
function Logged(req, res, next) {
    if ( req.session.loggedUser == undefined) {
        return next();
    } else {
        const msg = "Esta pagina es solo para invitados";
        return res.render('errors/error', {message:msg});
    }
}