const sharp = require("sharp")

const transformImage = async(buffer, transformations)=>{

    let image = sharp(buffer)

    if(transformations.resize){

        image = image.resize(
            transformations.resize.width,
            transformations.resize.height
        );

    }

    if(transformations.crop){

        image = image.extract({
            left: transformations.crop.x,
            top: transformations.crop.y,
            width: transformations.crop.width,
            height: transformations.crop.height

        }
        )


    }

    if(transformations.rotate){
        image = image.rotate(transformations.rotate)
        

    }

   if (transformations.flip) {
    image = image.flip();
  }

  
  if (transformations.mirror) {
    image = image.flop();
  }

    if (transformations.compress) {
    image = image.jpeg({ quality: transformations.compress.quality || 80 });
  }

  // format conversion
  if (transformations.format) {
    image = image.toFormat(transformations.format);
  }


    if (transformations.filters) {
    if (transformations.filters.grayscale) {
      image = image.grayscale();
    }
    if (transformations.filters.sepia) {
      image = image.tint({ r: 112, g: 66, b: 20 });
    }
  }


  return await image.toBuffer();



}

module.exports= {transformImage}