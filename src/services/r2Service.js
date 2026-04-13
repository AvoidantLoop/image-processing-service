const r2Client = require("../config/r2")

const{PutObjectCommand, DeleteObjectCommand}= require("@aws-sdk/client-s3")

const{v4: uuidv4} = require("uuid")


const uploadToR2 = async(file)=>{

    const fileName = `${uuidv4()}-${file.originalName}`

    const command = new PutObjectCommand({

        Bucket: process.env.R2_BUCKET_NAME,
        Body: file.buffer,
        Key: fileName,
        ContentType: file.mimetype

    })

    await r2Client.send(command)

    const url = `${process.env.R2_PUBLIC_URL}/${fileName}`
    return{fileName, url}


}





const deleteFromR2= async(filename)=>{

    const command = new DeleteObjectCommand({

        Bucket: process.env.R2_BUCKET_NAME,
        Key: filename
    }
        
  )


  await r2Client.send(command)


}

module.exports= {uploadToR2, deleteFromR2}