const multer = require('multer');
const path = require('path');

function checkFileTYpe(file,cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test( path.extname(file.originalname).toLowerCase() );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname){
        return cb(null,true);
    }else{
        cb('Error: Images Only!');
    }
}

// **** Multer Config ****
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        let destPath = path.join(__dirname, '../../../../gulp/media/images/users');
        cb(null, destPath);
    },
    filename: (req,file,cb) => {
        let fileName = 'img-'+Date.now()+'-'+file.originalname;
        cb(null, fileName);
    },
});

const upload = multer({
    storage:storage,
    limits:{
        fields:5,
        fieldNameSize:50,
        fieldSize: 20000,
        fileSize: 15000000
    },
    fileFilter: function (_req,file,cb) {
        checkFileTYpe(file,cb);
    }
});

module.exports = upload;