const mongoose =  require("mongoose");


const schema = {
  name: String
}

module.exports = mongoose.model(
  "Language",
  new mongoose.Schema(schema, { timestamps: true })
)
