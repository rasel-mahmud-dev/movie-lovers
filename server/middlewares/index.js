const { parseToken, getToken}  = require("../jwt")
const sendResponse = require("../utilities/response")

exports.auth = (request, response, next)=> {
  let token = getToken(request)
  if(!token){
    request.userId = null
   
    return sendResponse(response, 409, {
        message: "please login first"
    })
  }

  parseToken(token).then(u=>{
    request.userId = u.id
    request.role = u.role,
    request.userEmail = u.email
    next()
    
  }).catch(err=>{
    request.userId = null
    
    return sendResponse(response, 409, {
      message: "please login first"
    })
    
  })
}



exports.admin = (request, response, next)=> {
  let token = getToken(request)
  if(!token){
    request.userId = null
    return sendResponse(response, 409, {
      message: "please login first"
    })
  }

  parseToken(token).then(u=>{
    if(u.role === "admin") {
      request.userId = u.id
      request.role = "admin"
      request.userEmail = u.email
      next()
    } else {
      return sendResponse(response, 409, {
        message: "you are not permit on this action",
      })
      
    }
  }).catch(err=>{
    request.userId = null
    return sendResponse(response, 409, {
      message: "please login first"
    })
  })
}

