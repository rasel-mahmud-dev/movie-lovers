const mongoose =  require("mongoose");


const schema = {
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", index: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
}

module.exports = mongoose.model(
  "Favorite",
  new mongoose.Schema(schema, { timestamps: true })
)
