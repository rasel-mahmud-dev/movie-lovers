const { v2: cloudinary} = require("cloudinary");


const cloudinaryHandler = ()=>{
  cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
  });
  
  return cloudinary
}



const uploadImage = (imagePath, dir)=>{
  return new Promise(async (resolve, reject)=>{
    try{
      let s = await cloudinaryHandler().uploader.upload(
        imagePath,
        {
          use_filename: true,
          unique_filename: false,
          folder: dir ? dir : "",
          overwrite: false
        })
      resolve(s)

    } catch (ex){
      reject(ex)
    }
  })
  
}



module.exports = uploadImage 