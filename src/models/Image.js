const mongoose = require("mongoose")


const imageSchema = new mongoose.Schema({

    fileName:{
        type:String,
        required:true


    },

    url:{
        type:String,
        required:true
    },

    size:{
        type:Number,
        required:true
    },

    mimetype:{
        type:String,
        required:true
    },

    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },

    originalImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    default: null
}


},        
    {timestamps:true}   )




module.exports= mongoose.model("Image", imageSchema)    