//
// import dbConnect from "../database/dbConnect"
// import response from "../response"
import Comment from "../models/Comment";

import errorConsole from "../logger/errorConsole";
import response from "../response";
import User from "../models/User";
import {ObjectId} from "mongodb";

// import errorConsole from "../logger/errorConsole";
// import SQL_Date from "../utilities/SQL_Date";
// import User from "../models/User";
//
//
// export const countComment = async (req,res, next)=>{
//
//   let { current_page=1, page_size=10, post_id, parent_id  } = req.query
//
//   try {
//
//     let sql;
//
//     if(parent_id){
//       sql = `
//        select c.*, u.avatar, u.username
//           from comments c
//             join users u on u.id = c.user_id
//           where c.post_id = '${post_id}' and c.parent_id IS NULL
//       `
//     } else {
//         sql = `
//           select COUNT(*) total_comments
//           from comments c
//           where c.post_id = '${post_id}' and c.parent_id IS NULL
//         `
//     }
//
//     let comments = await Comment.find(sql)
//
//     response(res, 200, {
//       comments
//     })
//
//   } catch (ex){
//     errorConsole(ex)
//   } finally {
//     // db.end && db.end()
//   }
//
// }
export const getComments = async (req,res, next)=>{
  let { current_page=1, page_size=10, post_id, parent_id  } = req.query
  let pipe = []
  try {
    if(parent_id){
    
    } else {
       pipe = [
         {
            $match: { post_id: new  ObjectId(post_id) }
         },
         {
           $lookup: {
             from: "users",
             localField: "user_id",
             foreignField: "_id",
             as: "author"
           }
         },
         { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
         { $project: {
             created_at: 1,
             parent_id: 1,
             post_id: 1,
             text: 1,
             user_id: 1,
             _id: 1,
           author: {
             avatar: 1,
             username: 1,
           }
           } }
       ]
    }

    let comments = await Comment.aggregate(pipe)
    response(res, 200, {
      comments
    })

  } catch (ex){
    errorConsole(ex)
  } finally {
    // db.end && db.end()
  }

}



export const addComment = async (req, res)=>{
  try {

    let {post_id, user_id, text, parent_id=""} = req.body

     let comment: any = new Comment({
       user_id: new  ObjectId(user_id),
       post_id: new  ObjectId(post_id),
       text,
       parent_id: parent_id ? new  ObjectId(parent_id) : null
     })

    comment = await comment.save()
    let user: any = await User.findOne({_id: comment.user_id})
    response(res, 201, {...comment, ...user, created_at: new Date()})

  } catch (ex){
    errorConsole(ex)
    response(res, 500, ex.message)
  }
}

// export const removeComment = async (req, res)=>{
//   try {
//     let deleted = await Comment.removeOne({id: req.params.comment_id})
//     if(deleted){
//         response(res, 201, {comment_id: req.params.comment_id})
//     } else {
//       response(res, 200, "not deleted...")
//     }
//   } catch (ex){
//     errorConsole(ex)
//     response(res, 500, ex.message)
//   }
// }
