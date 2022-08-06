const mongoose =  require("mongoose");

const schema = {
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  genres: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", index: true },
  runtime: Number,
  isPublic: Boolean,
  cover: String,
  quality: { type: mongoose.Schema.Types.ObjectId, ref: "Quality"},
  trailerUrl: String,
  videoUrl: String,
  tags: [String],
  rating: Number,
  price: Number,
  releaseYear: Date,
  director: String,
  summary: String,
  language: { type: mongoose.Schema.Types.ObjectId, ref: "Language", index: true }
}


module.exports = mongoose.model("Movie", new mongoose.Schema(schema, { timestamps: true }))

