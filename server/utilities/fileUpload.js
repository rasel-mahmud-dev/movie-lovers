const formidable = require("formidable");
const { rename } = require("fs/promises");
const path = require("path")


const fileUpload = (req, imageName)=> {
  const form = formidable({ multiples: false });
  
  return new Promise(((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err)
      } else {
        if(files && files[imageName]){
          const {filepath, originalFilename, newFilename } = files[imageName]
          let newName = filepath.replace(newFilename, "/"  +originalFilename )
          await rename(filepath, newName)
          resolve({fields, file: path.resolve(newName)})
        } else {
        
          resolve({fields, file: null})
        }
      }
    });
  }))
}



module.exports = fileUpload