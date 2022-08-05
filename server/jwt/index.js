const jwt = require('jsonwebtoken')

exports.createToken = (id, email,  role="customer", expiresIn)=> {
  return jwt.sign({
      id: id,
      email: email,
      role,
    },
    process.env.SECRET, {expiresIn: expiresIn ? expiresIn : '5h'}
  )
}


exports.parseToken = (token)=> {
   return new Promise(async (resolve, reject)=>{
     try {
       if(token) {
         let d = await jwt.verify(token, process.env.SECRET)
         resolve(d)
       } else {
        reject(new Error("Token not found"))
       }
     } catch (ex){
       reject(ex)
     }
   })
}

exports.getToken = (req)=> {
  return req.header["authorization"]
}


