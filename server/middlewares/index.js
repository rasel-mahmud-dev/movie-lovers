const { parseToken, getToken}  = require("../jwt")

exports.auth = (ctx, next)=> {
  let token = getToken(ctx.request)
  if(!token){
    ctx.request.userId = null
    ctx.response.status = 409
    return ctx.body = {
        message: "please login first"
    }
  }

  parseToken(token).then(u=>{
    ctx.request.userId = u.id
    ctx.request.role = u.role,
    ctx.request.userEmail = u.email
    next()
    
  }).catch(err=>{
    ctx.request.userId = null
    ctx.response.status = 409
    return ctx.body = {
        message: "please login first"
    }
  })
}



exports.admin = (ctx, next)=> {
  let token = getToken(ctx.request)
  if(!token){
    ctx.request.userId = null
    ctx.response.status = 409
    return ctx.body = {
        message: "please login first"
    }
  }

  parseToken(token).then(u=>{
    if(u.role === "admin") {
      ctx.request.userId = u.id
      ctx.request.role = "admin"
      ctx.request.userEmail = u.email
      next()
    } else {
      ctx.response.status = 409
      return ctx.body = {
          message: "you are not permit on this action",
      }
    }
  }).catch(err=>{
    ctx.request.userId = null
    ctx.response.status = 409
    return ctx.body = {
        message: "please login first"
    }
  })
}

