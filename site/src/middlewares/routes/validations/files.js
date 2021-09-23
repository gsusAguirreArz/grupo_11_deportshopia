// imcomplete not implemented
function fileValidation(cb,req,res,next) {
    cb(req,res,(err) => {
        if (err){
            return res.status(400).send("Algo salio mal");
        } else {
            next()
        }
    })
}

module.exports = fileValidation;