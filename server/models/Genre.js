const mongoose =  require("mongoose");


const schema = {
  name: String
}

module.exports = mongoose.model(
  "Genre",
  new mongoose.Schema(schema, { timestamps: true })
)
