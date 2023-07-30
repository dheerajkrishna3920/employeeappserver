//importing multer
const multer = require("multer");

//storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        //inside callback what if error occured condtion is as null, then the path of the file storage is designated as next
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        //name of the storage as next argument
        callback(null, `image-${Date.now()}-${file.originalname}`)
    }

})

//file filtering
const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        callback(null, true)
    }
    else {
        callback(null, false)
        return callback(new Error('only accept png or jpg or jpeg type files'))
    }
}

//define upload
//storage as key and value , next also
const upload = multer({ storage, fileFilter })

//export upload
module.exports = upload