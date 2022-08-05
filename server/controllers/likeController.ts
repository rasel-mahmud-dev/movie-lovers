
// // export const getNestedComments = async (req, res)=>{
// //
// // }
//
//
import response from "../response";
import dbConnect from "../database";
import Like from "../models/Like";
import {ObjectId} from "mongodb";
import User from "../models/User";


export const toggleLike = async (req, res)=>{
	
	if(!req.user_id) return response(res, 409, "Not permit")
	
  let user_id = req.user_id
	
	try {
    let { post_id, reaction, _id } = req.body
		
		let socket = req.app.get("socket")
		// socket.to("member").emit("likeEvent", "hi")
		
		let like: any = await Like.findOne({post_id: new ObjectId(post_id), user_id: new ObjectId(user_id)})
		if (!like) {

			let newLike: any = new Like({
				post_id: new ObjectId(post_id),
				reaction,
				user_id: new ObjectId(user_id)
			})
			newLike = await newLike.save()
			let user: any = await User.findOne({_id: user_id}).select("-password -friends")
			response(res, 201,  { like: {...newLike._doc, ...user._doc}})
			
		} else {
			
			// if (like.reaction === reaction) {
				// remove like
				let removeLike = await Like.remove({
					post_id: new ObjectId(post_id),
					user_id: new ObjectId(user_id)
				})
				
				response(res, 201, { removeLike: true })
				
			// } else {
			// 	// update reaction........
			// 	let isUpdatedLike = await Like.updateOne({
			// 			post_id: new ObjectId(post_id),
			// 			user_id: new ObjectId(user_id)
			// 		}, {
			// 			$set: {
			// 				reaction: reaction
			// 			}
			// 		}
			// 	)
			// 	if (isUpdatedLike) {
			// 		response(res, 201, {
			// 			updateLike: {
			// 				...like,
			// 				reaction: reaction,
			// 			}
			// 		})
			// 	}
			// }
		}
  } catch (ex){
    response(res, 500, ex.message)
  }
}


export const removeLike = async (req, res)=>{
	let user_id = req.user_id

	try {
		let { post_id } = req.body
		// let like = await Like.findOne({post_id: new ObjectId(post_id), user_id: new ObjectId(user_id)})
    // if(like){
		// 	let removeLike = await Like.removeOne({post_id: new ObjectId(post_id), user_id: new ObjectId(user_id)})
		// 	if(removeLike){
		// 		response(res, 201, "post liked removed")
		// 	} else {
		// 		response(res, 400, "post liked not removed")
		// 	}
		// } else {
		// 	response(res, 403, "post not liked")
		// }
		console.log("remove like")
  } catch (ex){
    console.log(ex)
    response(res, 500, ex.message)
  }
}

