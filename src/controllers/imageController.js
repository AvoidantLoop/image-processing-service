
const Image = require("../models/Image");
const { uploadToR2, deleteFromR2 } = require("../services/r2Service");

exports.uploadImage = async (req, res) => {
  try {
    // check if file exists
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    // upload to R2
    const { fileName, url } = await uploadToR2(req.file);

    // save metadata to MongoDB
    const image = await Image.create({
      fileName,
      url,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      image,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const images = await Image.find({ uploadedBy: req.user.id,    originalImage: null })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Image.countDocuments({ uploadedBy: req.user.id });

    res.status(200).json({
      images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // make sure user owns this image
    if (image.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // delete from R2
    await deleteFromR2(image.fileName);

    // delete from MongoDB
    await image.deleteOne();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


const axios = require("axios")

const {transformImage} = require("../services/sharpService")





exports.transformImageController = async(req,res)=>{

  try{

    const image = await Image.findById(req.params.id)

    if(!image){
      return res.status(404).json({message: "Image not found"})
    }

    if(image.uploadedBy.toString() !== req.user.id){
      return res.status(403).json({message: "Not authorized"})
    }

    const response = await axios.get(image.url,{
      responseType: "arraybuffer"
    })

    const buffer = Buffer.from(response.data)

    const transformedBuffer = await transformImage(buffer, req.body.transformations)


    const transformedFile = {
      buffer: transformedBuffer,
      originalname: `transformed-${image.fileName}`,
      mimetype: req.body.transformations.format
        ? `image/${req.body.transformations.format}`
        : image.mimetype,
    };




    const { fileName, url } = await uploadToR2(transformedFile);




    const transformedImage = await Image.create({
      fileName,
      url,
      size: transformedBuffer.length,
      mimetype: transformedFile.mimetype,
      uploadedBy: req.user.id,
      originalImage: req.params.id
    });


      res.status(201).json({
      message: "Image transformed successfully",
      image: transformedImage,
    });



  }

  catch(error){
    res.status(500).json({message:"Server error", error: error.message})
  }


}

exports.getTransforms = async (req, res) => {
  try {
    const transforms = await Image.find({ 
      originalImage: req.params.id,
      uploadedBy: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({ transforms });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};









