const bcryptjs  = require("bcryptjs")

exports.createHash = (password)=>{
  return new Promise(async (resolve, reject)=>{
    try {
      let salt = await bcryptjs.genSalt(10);
      let hashedPass = await bcryptjs.hash(password, salt)
      resolve({err: null, hash: hashedPass})
    } catch (ex){
      resolve({err: ex.message, hash: ""})
    }
  })
}

exports.hashCompare = (password, hashPassword)=>{
  return new Promise(async (resolve, reject)=> {
    try {
      let m = await bcryptjs.compare(password, hashPassword)
      resolve(m)
    } catch (ex) {
      resolve(false)
    }
  })
}