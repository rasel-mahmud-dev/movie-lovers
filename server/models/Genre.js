const mongoose =  require("mongoose");


const schema = {
  name: {type: String, index: true, unique: true}
}

module.exports = mongoose.model(
  "Genre",
  new mongoose.Schema(schema, { timestamps: true })
)
