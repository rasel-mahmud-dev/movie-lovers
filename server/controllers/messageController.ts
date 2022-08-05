
import Message from "../models/Message";
// import {createToken, parseToken} from "../jwt";
// const bcryptjs = require("bcryptjs")
import response from "../response";
import errorConsole from "../logger/errorConsole";
import {use} from "express/lib/router";
import {ObjectId} from "mongodb";
import dbConnect from "../database";


export const getMessage = async (req, res)=>{
  
  let _id = req.user_id
  let { room } = req.query
  
  try {
    let messages = await Message.aggregate([
      { $match: {room: room} },
      {
        $lookup: {
          from: "users",
          localField: "to",
          foreignField: "_id",
          as: 'to'
        }
      },
      { $unwind: { path: "$to" } },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "_id",
          as: 'from'
        }
      },
      { $unwind: { path: "$from" } },
      {
        $project: {
          to: { password: 0, created_at: 0, updated_at: 0, friends: 0, email: 0 },
          from: { password: 0, created_at: 0, updated_at: 0, friends: 0, email: 0 }
        }
      }
    ])
    
    response(res, 200, {messages})
    
  } catch (ex){
    errorConsole(ex)
  }
}


export const getOneMessage = async (req, res)=>{
  
  let _id = req.user_id
  let { privateRooms } = req.body
  let client;
  try {
    let {c: Collection, client: cc} = await dbConnect("messages")
    client = cc
    
    let lastMsg: any = {};
    privateRooms.map((room, i)=>{
      
      (async function (){
        let d = Collection.find({
          room: room,
          from: {$not: {$eq: new ObjectId(_id)}}
        }).sort({created_at: 1}).project(["text", "created_at"])
        let m = {}
        await d.forEach(dd=>{
          m = dd
        })
        
        lastMsg[room] = m
     
        
        if((i + 1) === privateRooms.length){
          
          res.json({messages: lastMsg})
          
          client?.close()
        }
        
      }())
    })
    
    
  } catch (ex){
    console.log(ex)
  } finally {

  }
  
  // try {
  //   let messages = await Message.aggregate([
  //     { $match: {room: room} },
  //     {
  //       $lookup: {
  //         from: "users",
  //         localField: "to",
  //         foreignField: "_id",
  //         as: 'to'
  //       }
  //     },
  //     { $unwind: { path: "$to" } },
  //     {
  //       $lookup: {
  //         from: "users",
  //         localField: "from",
  //         foreignField: "_id",
  //         as: 'from'
  //       }
  //     },
  //     { $unwind: { path: "$from" } },
  //     {
  //       $project: {
  //         to: { password: 0, created_at: 0, updated_at: 0, friends: 0, email: 0 },
  //         from: { password: 0, created_at: 0, updated_at: 0, friends: 0, email: 0 }
  //       }
  //     }
  //   ])
  //
  //   response(res, 200, {messages})
  //
  // } catch (ex){
  //   errorConsole(ex)
  // }
}


export const deleteMessage = async (req, res)=>{
  
  let _id = req.user_id
  let { message_id } = req.params
  
  try {
    let doc = await Message.deleteOne({_id: new ObjectId(message_id)})
    if(doc) {
      response(res, 201, {_id:message_id})
    } else {
      response(res, 404, "message not found")
    }
  } catch (ex){
    errorConsole(ex)
  }
}


//
// export const createNewUser = async (req, res, next)=>{
//   try {
//     let date = new Date()
//     let {first_name, last_name, email, password } = req.body
//     let user = await User.findOne({email})
//
//     if(user) return res.send("user already registered")
//
//     let salt = await bcryptjs.genSalt(10);
//     let hashedPass = await bcryptjs.hash(password, salt)
//     user = new User({
//       first_name,
//       last_name,
//       email,
//       password: hashedPass,
//       avatar: "",
//       username: first_name + " " + last_name,
//       created_at: date,
//       updated_at: date
//     })
//     user = await user.save()
//     if(user){
//       let token = await createToken(user.id, user.email)
//       res.json({
//         token: token,
//         ...user
//       })
//     }
//
//   } catch (ex){
//     errorConsole(ex)
//     if(ex.type === "VALIDATION_ERROR"){
//       response(res, 422, ex.errors)
//     } else if(ex.type === "ER_DUP_ENTRY"){
//       response(res, 409, "user already exists")
//     } else {
//       next(ex)
//     }
//   }
// }
//
// export const loginUser = async (req, res)=>{
//   try {
//     const { email, password } = req.body
//     let user = await User.findOne({email})
//     if(user){
//       let match = await bcryptjs.compare(password, user.password)
//       if(!match)  return res.json({message: "Password not match"})
//
//       let token = await createToken({_id: user._id, email: user.email})
//       let {password : s, ...other} = user
//       res.json({token: token, ...other})
//     }
//
//   } catch (ex){
//     errorConsole(ex)
//   }
// }
//
//
// export const loginViaToken = async (req, res)=>{
//   try {
//     let token = req.headers["authorization"]
//     if(!token) return response(res, "", "token not found")
//     let { _id, email } =  await parseToken(token)
//     let user  = await User.findOne({_id: ObjectId(_id)})
//     if(user) {
//       let {password, ...other} = user
//       response(res, 201, other)
//     }
//   } catch (ex){
//     errorConsole(ex)
//     return response(res, 500, ex.message)
//   }
// }
//
// export const fetchProfile = async (req, res)=>{
//   let {username} = req.params
//   try{
//     let user = await User.findOne({username})
//     if(user){
//       let {password, ...other} = user
//       res.json({profile: other})
//     }
//
//   } catch (ex){
//     errorConsole(ex)
//   }
// }
//
//
// export const addFriend = async (req, res)=>{
//   let {  friend_id } = req.body
//   let _id = req.user_id
//   let client;
//   try{
//     let user = await User.findOne({_id: ObjectId(_id)})
//     let { Collection, client: cc } = await User.getCollection()
//     client = cc
//     let d = await Collection.updateOne(
//       {_id: ObjectId(user._id) },
//       {
//         $addToSet: {
//           friends: ObjectId(friend_id)
//         }
//       }
//     )
//     if(d.modifiedCount){
//       let u = await User.aggregate([
//         {$match: { _id: ObjectId(friend_id)} },
//         {
//           $lookup: {
//             from: "users",
//             localField: "friends",
//             foreignField: "_id",
//             as: "f"
//           }
//         }
//       ])
//       res.status(201).json({newFriend: u })
//     } else {
//       response(res, 304, "Add Friend Fail")
//     }
//
//   } catch (ex){
//     errorConsole(ex)
//   } finally {
//     client?.close()
//   }
// }
//
//
//
//
// export const getFriend = async (req, res)=>{
//
//   let _id = req.user_id
//   let client;
//   let { friend_username } = req.query
//
//   try{
//
//     let u = await User.aggregate([
//       {$match: { _id: ObjectId(_id)} },
//
//       {
//         $lookup: {
//           from: "users",
//           localField: "friends",
//           foreignField: "_id",
//           as: "allFriends"
//         }
//       }
//     ])
//
//
//     if(u && u.length > 0) {
//       if(u[0].allFriends) {
//         let f = u[0].allFriends.find(usr => usr.username === friend_username)
//         res.status(200).json({friend: f})
//       } else {
//         res.status(304).json({friend: {}})
//       }
//     } else {
//       res.status(304).json({friend: []})
//     }
//   } catch (ex){
//     errorConsole(ex)
//   } finally {
//     // client?.close()
//   }
// }
//
//
// export const getFriends = async (req, res)=>{
//
//   let _id = req.user_id
//   let client;
//
//   try{
//
//    let u = await User.aggregate([
//       {$match: { _id: ObjectId(_id)} },
//       {
//         $lookup: {
//           from: "users",
//           localField: "friends",
//           foreignField: "_id",
//           as: "allFriends"
//         }
//       },
//      {
//        $project: {
//          allFriends: {
//            _id: 1,
//            avatar: 1,
//            first_name: 1,
//            last_name: 1,
//            username: 1,
//          }
//        }
//      }
//     ])
//     if(u && u.length > 0) {
//       res.status(200).json({allFriends: u[0].allFriends})
//     } else {
//       res.status(200).json({allFriends: []})
//     }
//   } catch (ex){
//     errorConsole(ex)
//   } finally {
//     client?.close()
//   }
// }
//
// export const getTimelinePost = async (req, res)=>{
//
//   let _id = req.user_id
//   let client;
//
//   try{
//
//    let u = await User.aggregate([
//       {$match: { _id: ObjectId(_id)} },
//       {
//         $lookup: {
//           from: "posts",
//           localField: "_id",
//           foreignField: "author_id",
//           as: "allPosts"
//         }
//       },
//      {
//        $project: {
//          allPosts: {
//            title: 1
//          }
//        }
//      }
//     ])
//
//     res.status(200).json({allPosts: u[0].allPosts })
//
//   } catch (ex){
//     errorConsole(ex)
//   } finally {
//     client?.close()
//   }
// }
