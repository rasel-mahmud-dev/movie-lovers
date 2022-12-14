const mongoose =  require("mongoose");

const schema = {
  firstName: String,
  lastName: String,
  email: {type: String},
  gender: String,
  avatar: String,
  role: {
    type: String,
    required: true,
    enum: ["customer"]
  }
}

module.exports = mongoose.model("TrashUser", new mongoose.Schema(schema, { timestamps: true }))