const formidable = require("formidable");
const { rename } = require("fs/promises");
const path = require("path")


const fileUpload = (req)=> {
  const form = formidable({ multiples: false });
  
  return new Promise(((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err)
      } else {
        if(files && files.cover){
          const {filepath, originalFilename, newFilename } = files.cover
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