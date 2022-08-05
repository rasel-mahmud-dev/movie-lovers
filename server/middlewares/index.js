const { parseToken}  = require("../jwt")

import response  from "../response"

export function isAuth(req, res, next){
  let token = req.headers["authorization"]
  if(!token){
    req.userId = null
    return response(res, 404, "please login first")
  }
  parseToken(token).then(u=>{
    req.userId = u.id
    req.userEmail = u.email
    next()
  }).catch(err=>{
    req.userId = null
    response(res, 404, "please login first")
  })
}


export function isAdmin(req, res, next){
  let token = req.headers["authorization"]
  if(!token){
    req.userId = null
    return response(res, 404, "please login first")
  }
  parseToken(token).then(u=>{

    if(u.role === "admin") {
      req.userId = u.id
      req.userEmail = u.email
      next()
    } else {
      return response(res, 401, "Unauthorized")
    }
  }).catch(err=>{
    req.userId = null
    response(res, 404, "please login first")
  })
}

