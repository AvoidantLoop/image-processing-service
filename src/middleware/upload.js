const multer= require("multer")

const storage = multer.memoryStorage()


const upload=  ({
    storage,

    limits:{fileSize: 5*1024*1024}, //5mb

    fileFilter: (req,file,cb)=>{

        const allowedTypes= ["image/jpeg", "image/png", "image/webp", "image/gif"]

        if(allowedTypes.includes(file.mimetype)){
            cb(null, true)
        }

        else{
            cb(new Error("Only images are allowed"), false)
        }

    }
})

module.exports= upload