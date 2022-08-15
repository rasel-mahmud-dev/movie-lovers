
function blobToBase64(blob, cb){
  let reader = new FileReader() 
  reader.onload = function(e){
    cb(e.target.result)
  }
  if(blob){
    reader.readAsDataURL(blob)
  } 
}

export default blobToBase64