const db = require('../../database/models/index');

function remember(req,res,next){
    if ( req.cookies.rememberMe != undefined && req.session.loggedUser == undefined) {
        db.User.findOne({
            where: {
                email: `${req.cookies.rememberMe}`
            }
        })
            .then( user => {
                req.session.loggedUser = user;
            } )
            .catch( e => res.send(e) );
    }
    next();
}
  
module.exports = remember;