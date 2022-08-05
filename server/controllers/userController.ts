
import User from "../models/User";
import {createToken, parseToken} from "../jwt";
const bcryptjs = require("bcryptjs")
import response from "../response";
import errorConsole from "../logger/errorConsole";
import {ObjectId} from "mongodb";
import dbConnect from "../database";

import { Request, Response }  from "express"
import saveLog from "../logger/saveLog";
import sendMail from "../utilities/sendMail";
import {createHash} from "../hash";
import {RequestWithAuth} from "../types/index";

/**
  query params need pass => for [ "add_friend_able" ]
 */

export const getPeoples = async (req: RequestWithAuth, res: Response)=>{
  
  let _id = req.userId
  let { type } = req.query
  
  try {
    let users: any;
    let auth: any = await User.findOne({_id: new ObjectId(_id)})
    let skip = []
    
    if(auth.friends) {
      skip.push(...auth.friends)
    }
    skip.push(auth._id)
    
    
    if(type === "add_friend_able") {
      users = await User.aggregate([
        {
          $match: {
             _id:{ $nin: [...skip] }
          }
        },
      ])
    } else {
      users = await User.find({_id: {$not: {$eq: new ObjectId(_id)}}})
    }
    
    res.send(users)
    
  } catch (ex){
    errorConsole(ex)
  }
}

export const createNewUser = async (req, res, next)=>{
  
  try {
    let {firstName, lastName, email, phone, password, birthday, gender } = req.body
    
    let dateOfbirth = new Date(birthday)
    
    let user : any;
  
    // check if user already exist or not
    if(email){
      phone = null
      user = await User.findOne({email: email})
      
      
    } else if(phone) {
      email = null
      user = await User.findOne({phone: phone})
    }
    
    
    if(user) {
      saveLog("user already registered", req.url, req.method)
      return response(res, 409, "user already registered")
    }
  
  
    // if this user is not registered then create a new user
    let salt = await bcryptjs.genSalt(10);
    let hashedPass = await bcryptjs.hash(password, salt)
    
    if(!lastName){
      lastName = ""
    }
  
    user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPass,
      avatar: "",
      username: firstName + " " + lastName,
      emailVerification: true,
      birthday: dateOfbirth,
      gender
    })
    
    
    // const expiredTime = '30min'
    // let token = createToken(user._id, user.email, expiredTime)
    
    
    // send mail to verify gmail
//     let info = await sendMail({
//       to: email,
//       from: process.env.ADMIN_EMAIL,
//       subject: "Account verification need",
//       html: `
//         <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8"/>
//   <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//
//
//           <style type="text/css">
//               .bg{
//                 font-family: Roboto,serif;
//                 box-sizing: border-box;
//                 width: 100%;
//                 height: max-content;
//                 background-image: linear-gradient(0deg, rgba(255, 70, 117, 0.92), rgba(255, 58, 241, 0.69));
//               }
//               .panel{
//                 background: rgba(255, 255, 255, 0.73);
//               }
//
//             </style>
//       </head>
//       <body>
//
//             <div class="bg" style="padding: 50px">
//               <h1 style="text-align: center; color: white; margin: 0px 0; margin-bottom: 10px; font-weight: 600">Account Varification</h1>
//               <div style="background: rgba(230,230,230,0.439); padding: 60px; max-width: 60%; margin: auto; border-radius: 4px ">
//                 <h2 style="text-align: start; color: white; margin: 20px 0; font-weight: 500">Hey ${first_name}</h2>
//                 <p style="text-align: start; color: white; margin: 0px 0; font-weight: 400">Someone (hopefully you) ! has requested to change your old password.
//                   Please click the link below to change your password now</p>
//                   <button style="width: max-content; padding:5px 10px; color: white; outline: none; border:none; background: rgba(255,255,255,0.36); border-radius: 4px; margin-top: 40px ">
//                   <a href="${process.env.NODE_ENV === "development" ? "http://localhost:2000" : "https://datebook.netlify.app/" }/#/auth/registration/verify/${token}">Veriyf</a>
//                   </button>
//
//                 <p style="text-align: start; color: white; margin: 20px 0; font-weight: 500">Please note that your password will not change unless you click the link above and
//                   create a new one.</p>
//                 <p style="text-align: start; color: white; margin: 20px 0; font-weight: 500">This link will expire in 30 minutes. If your link has expired, you can always</p>
//
//                 <div>
//                   <p>Sincerely,</p>
//                   <h4>Rasel Mahmud</h4>
//                 </div>
//
//               </div>
//             </div>
//           </body>
// </html>`
//     })
    // if(info.messageId){
    //   response(res, 201, {message: "Email has been send"})
    // } else {
    //   response(res, 500, "internal error")
    // }
  
    console.log(user)
    user = await user.save()
    if(user){
      let token = await createToken(user._id, user.email, user.phone)
      res.status(201).json({
        token: token,
        ...user._doc
      })
    }

  } catch (ex){
    
    if(ex.code === 11000 ){
      return response(res, 409, "user already exists")
    }

    // saveLog(ex?.message, req.url, req.method)
    
    if(ex.type === "VALIDATION_ERROR"){
      response(res, 422, ex.errors)
    } else if(ex.type === "ER_DUP_ENTRY"){
      response(res, 409, "user already exists")
    } else {
      next(ex)
    }
  }
}



export const checkPasswordResetSessionTimeout = async (req, res)=> {
  let { token } = req.body
  
  try {
    let s = await parseToken(token)
    // console.log(s)
    response(res, 200, "")
  } catch (ex){
    errorConsole(ex)
    if(ex.message === "jwt expired"){
      response(res, 500, "password reset session expired")
    }
  }
}

export const changePassword = async (req, res)=>{
  let client;
  try{
    const { token, password }  = req.body
    
    // send a link and a secret code with expire date....
    // 1st check token validity.
    // 2. if token valid then reset password
    
    let { email, id } =  await parseToken(token)
    let user: any = await User.findOne({email: email}, {})
    
    if(user){
      let {hash, err} = await createHash(password)
      if(!hash){
        errorConsole(err)
        response(res, 500, "Password reset fail. Try again")
      }
      let isUpdated = await User.update(
        {email: email},
        {$set: {password: hash}}
      )
      if(isUpdated) {
        let {password, ...other} = user
        response(res, 201, {token: token, ...other})
      } else {
        response(res, 500, "Password reset fail. Try again")
      }
      
    } else {
      response(res, 500, "Account not found")
    }
    
    
  } catch (ex){
    errorConsole(ex)
    response(res, 500, ex.message ? ex.message : "Internal Error")
    
  } finally {
    client?.quit()
  }
}



export const loginUser = async (req: Request, res: Response)=>{
  try {
    let { email, phone, password } = req.body
    
    let user : any;
    // check if user already exist or not
    if(email){
      phone = null
      user = await User.findOne({email: email})
    
    } else if(phone) {
      email = null
      user = await User.findOne({phone: phone})
    }
  
  
    if(user){
      let match = await bcryptjs.compare(password, user.password)
      if(!match)  return res.json({message: "Password not match"})

      let token: any = await createToken(user._id,  user.email, user.phone)
      
      let {password : s, ...other} = user._doc
      res.status(201).json({token: token, ...other})
    } else {
      saveLog("user not register yet", req.url, req.method)
      response(res, 404, "your are not registered")
    }

  } catch (ex){
    saveLog(ex?.message, req.url, req.method)
  }
}


export const loginViaToken = async (req: Request, res: Response)=>{
  
  try {
    let token = req.headers["authorization"]
    
    if(!token) return response(res, 409, "token not found")
    
    let {id, email} =  await parseToken(token)

    let user : any = await User.aggregate([
      { $match: {_id: new ObjectId(id)}},
      { $lookup: {
        from: "status",
        localField: "_id",
        foreignField: "user_id",
        as: "user_status"
      }},
      { $unwind: { path: "$user_status", preserveNullAndEmptyArrays: true } }
    ])
    
    if(user && user[0]) {
      let {password, ...other} = user[0]
      response(res, 200, other)
    }
  } catch (ex){
    errorConsole(ex)
    return response(res, 500, ex.message)
  }
}

export const fetchProfile = async (req: Request, res: Response)=>{
  let { _id  } = req.body
  try{
    let user: any = await User.findOne({_id: new ObjectId(_id)})
    if(user){
      let {password, ...other} = user
      res.json({profile: other})
    }
    
  } catch (ex){
    errorConsole(ex)
  }
}


export const addFriend = async (req: RequestWithAuth, res: Response)=>{
  let {  friend_id } = req.body
  let _id = req.userId
  let client;
  // try{
  //   let user: any = await User.findOne({_id: new ObjectId(_id)})
  //   let { c: Collection, client: cc } = await User.getCollection()
  //   client = cc
  //   let d = await Collection.updateOne(
  //     {_id: new ObjectId(user._id) },
  //     {
  //       $addToSet: {
  //         friends: new ObjectId(friend_id)
  //       }
  //     }
  //   )
  //   let dd = await Collection.updateOne(
  //     {_id: new ObjectId(friend_id) },
  //     {
  //       $addToSet: {
  //         friends: new ObjectId(_id)
  //       }
  //     }
  //   )
  //
  //   if(d.modifiedCount && dd.modifiedCount){
  //     let u = await User.aggregate([
  //       {$match: { _id: new ObjectId(friend_id)} },
  //       {
  //         $lookup: {
  //           from: "users",
  //           localField: "friends",
  //           foreignField: "_id",
  //           as: "f"
  //         }
  //       }
  //     ])
  //     console.log(u)
  //     res.status(201).json({newFriend: u })
  //   } else {
  //     response(res, 304, "Add Friend Fail")
  //   }
  //
  // } catch (ex){
  //   errorConsole(ex)
  // } finally {
  //   client?.close()
  // }
}



export const unFriend = async (req: RequestWithAuth, res: Response)=>{
  let { friend_id } = req.params
  let _id = req.userId
  

  let client, session
  try{
    
    let { c: userCol, client: cc}  = await dbConnect("users")
    client = cc
    
      // Important:: You must pass the session to the operations
      await userCol.updateOne(
        {_id: new ObjectId(_id)},
        {$pull: { friends: new ObjectId(friend_id)  }}
      )

      // await userCol.update(
      //   {_id: new ObjectId(friend_id)},
      //   {$pull: { friends: new ObjectId(_id)  }}
      // )
    
    response(res, 201, { friend_id })
    
  } catch (ex){
    
    errorConsole(ex)
  } finally {

    await client?.close()
  }
}




export const getFriend = async (req: RequestWithAuth, res: Response)=>{
  
  let _id = req.userId
  let client;
  
  let { friend_id } = req.query
  
  try{
    
    let u = await User.aggregate([
    // @ts-ignore
      {$match: { _id: new ObjectId(friend_id)} },
      {
        $lookup: {
          from: "status",
          localField: "_id",
          foreignField: "user_id",
          as: "user_status"
        }
      },
      { $unwind: { path: "$user_status", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "friends",
          foreignField: "_id",
          as: "allFriends"
        }
      }
    ])
    
    res.status(200).json({friend: u[0]})
    
  
  } catch (ex){
    errorConsole(ex)
  } finally {
    // client?.close()
  }
}


export const getAllFriends = async (req: RequestWithAuth, res: Response)=>{
  
  let _id = req.userId
  let client;
  
  try {
    let u = await User.aggregate([
      { $match: { _id: new ObjectId(_id) } },
      {
        $lookup: {
          from: "users",
          localField: "friends",
          foreignField: "_id",
          as: "all_friends"
        }
      }
    ])
    res.send(u[0])
  } catch (ex){
  
  }
}


export const getFriends = async (req: RequestWithAuth, res: Response)=>{
  
  let _id = req.userId
  let client;
  
  try{
   
   let u = await User.aggregate([
 
     {
       $lookup: {
         from: "status",
         localField: "_id",
         foreignField: "user_id",
         as: "user_status"
       }
     },
     { $unwind: { path: "$user_status", preserveNullAndEmptyArrays: true } },
      {$match: {  friends: { $in: [ new ObjectId(_id) ]} }  },
     
     // {
     //   $lookup: {
     //     from: "users",
     //     localField: "friends",
     //     foreignField: "_id",
     //     as: "allFriends"
     //   }
     // },
     // {
     //   $project: {
     //     allFriends: {
     //       s: 1,
     //       _id: 1,
     //       avatar: 1,
     //       first_name: 1,
     //       last_name: 1,
     //       username: 1,
     //       isOnline: 1
     //     }
     //   }
     // }
    ])

   res.json({allFriends: u})
   
  } catch (ex){
    errorConsole(ex)
  } finally {
    client?.close()
  }
}

export const getTimelinePost = async (req: RequestWithAuth, res: Response)=>{
  
  let _id = req.userId
  let client;
  
  try{
   
   let u = await User.aggregate([
      {$match: { _id: new ObjectId(_id)} },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author_id",
          as: "allPosts"
        }
      },
     {
       $project: {
         allPosts: {
           title: 1
         }
       }
     }
    ])
    
    res.status(200).json({allPosts: u[0].allPosts })
    
  } catch (ex){
    errorConsole(ex)
  } finally {
    client?.close()
  }
}
