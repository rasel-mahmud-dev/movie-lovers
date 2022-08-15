const mongoose =  require("mongoose");

const schema = {
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  movieName: {type: String, index: true},
  email: {type: String, index: true},
  message: String,
}

module.exports = mongoose.model("RequestMovie", new mongoose.Schema(schema, { timestamps: true }))