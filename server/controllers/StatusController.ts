import User from "../models/User";
import {ObjectId} from "mongodb";
import Status from "../models/Status";


export const addOnline = async (req: Request, res: Response)=>{
  let { user_id }: any = req.body
  let client;
  try {
    let status = await Status.update({user_id: new ObjectId(user_id)}, {
      $set: {
        is_online: true,
        last_online: new Date()
      }
    })
    console.log(status)
 
  } catch (ex){
  
    console.log(ex)
    
  }
}

export const leaveOnline = async (req: Request, res: Response)=>{
  let { user_id }: any = req.body
  let client;
  try {
    let status = await Status.update({user_id: new ObjectId(user_id)}, {
      $set: {
        is_online: false,
        last_online: new Date()
      }
    })
    console.log(status)
    
  } catch (ex){
    
    console.log(ex)
    
  }
}