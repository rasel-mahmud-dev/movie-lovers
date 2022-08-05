import User from "../models/User";
import {ObjectId} from "mongodb";
import errorConsole from "../logger/errorConsole";
// import FriendRequest from "../models/FriendRequest";
import {RequestWithAuth} from "../types";


export const addFriendRequest = async (req: RequestWithAuth, res: Response)=>{
  let _id = req.userId
  let { to, from }: any = req.body
  
  try {
    let users: any;
    let auth: any = await User.findOne({_id: new ObjectId(_id)})
    let skip = []
  
    console.log(to, from)
    
    // if(auth.friends) {
    //   skip.push(...auth.friends)
    // }
    // skip.push(auth._id)
    //
    //
    // if(type === "add_friend_able") {
    //   users = await User.aggregate([
    //     {
    //       $match: {
    //         _id:{ $nin: [...skip] }
    //       }
    //     },
    //   ])
    // } else {
    //   users = await User.find({_id: {$not: {$eq: new ObjectId(_id)}}})
    // }
    //
    // res.send(users)
    
  } catch (ex){
    errorConsole(ex)
  }
  
}


export const removeFriendRequest = async (req: RequestWithAuth, res: Response)=>{
  let _id = req.userId
  
  let {request_id} = req.params
  
  // try {
  //   FriendRequest.removeOne({_id: new ObjectId(request_id)}).then(doc=>{
  //     console.log(doc)
  //   })
  //     .catch(ex=>{
  //
  //   })
  //
  //
  // } catch (ex){
  //   errorConsole(ex)
  // }
}

export const sendFriendRequest = async (req: Request, res: Response)=> {
  // /api/user/send-friend-request"
}

export const getComingRequestedFriends = async (req: RequestWithAuth, res: Response)=>{
  let _id = req.userId
  
  try {

    // let a = await FriendRequest.aggregate([
    //   { $match: { to: new ObjectId(_id) }},
    //   { $lookup: {
    //     from: "users",
    //     localField: "from",
    //     foreignField: "_id",
    //     as: "from"
    //   }},
    //   { $unwind: { path: "$from", preserveNullAndEmptyArrays: true } },
    // ])
    //
    // // @ts-ignore
    // res.send(a)
  
  } catch (ex){
    errorConsole(ex)
  }
}