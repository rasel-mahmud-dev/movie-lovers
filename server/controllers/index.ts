import * as postController from "./postController"
import * as userController from "./userController"
import * as likeController from "./likeController"
import * as commentController from "./commentController"
import * as messageController from "./messageController"
import * as StatusController from "./StatusController"
import * as friendRequestController from "./friendRequestController"


export default {
  postController,
  userController,
  likeController,
  commentController,
  messageController,
  friendRequestController,
  statusController: StatusController
}