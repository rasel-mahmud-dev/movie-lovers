const mongoose =  require("mongoose");

const schema = {
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre", index: true }],
  runtime: Number,
  isPublic: Boolean,
  cover: String,
  casts: String,
  language: { type: mongoose.Schema.Types.ObjectId, ref: "Language", index: true },
  videoUrl: Array,
  tags: [String],
  quality: { type: mongoose.Schema.Types.ObjectId, ref: "Quality", index: true},
  rating: Number,
  price: Number,
  releaseYear: Date,
  director: String,
  summary: String
}


module.exports = mongoose.model("Movie", new mongoose.Schema(schema, { timestamps: true }))

